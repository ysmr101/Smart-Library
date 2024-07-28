from fastapi import HTTPException
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_ollama import ChatOllama
from langchain_core.messages import HumanMessage
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.chat_history import (
    BaseChatMessageHistory,
    InMemoryChatMessageHistory,
)
from langchain.pydantic_v1 import BaseModel, Field
from langchain.tools import BaseTool, StructuredTool, tool
from app.Books import books_crud
import random
from langchain.agents import create_tool_calling_agent
from langchain.agents import AgentExecutor
import chromadb

client = chromadb.PersistentClient(
    path="/Users/maltuaijri001/Desktop/Smart-Library/chromadb"
)
books_collection = client.get_or_create_collection(name="improved_books2.0")

llm = ChatOllama(model="llama3.1", temperature=0)


store = {}
text = []


def get_session_history(session_id: str) -> BaseChatMessageHistory:
    if session_id not in store:
        store[session_id] = InMemoryChatMessageHistory()
    return store[session_id]


detail = {
    "Author": "Author doesnt exist",
    "Books": "No books found",
    "Book": "Book not found",
    "preference": "No preferences found for user",
}


def check_pass():
    print("Check passed")
    pass


def check_fail(detail_msg):
    print("Check failed")
    raise HTTPException(status_code=404, detail=detail_msg)


def check_author(author):
    check = {author: check_pass, None: lambda: check_fail(detail["Author"])}
    check[author]()
    pass


def check_books(list_of_books):
    check = {list_of_books: check_pass, "[]": lambda: check_fail(detail["Books"])}
    check[list_of_books]()
    pass


def check_single_book(single_book):
    check = {single_book: check_pass, None: lambda: check_fail(detail["Book"])}
    check[single_book]()
    pass


def check_preference(preference):
    check = {preference: check_pass, None: lambda: check_fail(detail["preference"])}
    check[preference]()
    pass


# Old, Don't use
def get_recommendation(query):

    result = books_collection.query(query_texts=[query], n_results=5)
    books = result.get("documents")
    template = [
        (
            "system",
            "Your name is Goerge, You are a librarian woriking in the smart library."
            "When asked about books your only source of knowledge about books is the books that will be shown to you below, ansewr the user's query only with what you get from the database"
            "The user may chat with you in simple conversations like telling you their name and you may respond normally (e.g: user: hi my name is yasser. librarian: Welcome Yasser to the smart library)"
            "If the user asks about anything not related to books you should remind them that you're only a librarian for the smart library and can only provide iformation about the books in the smart library"
            "You don't know about any other books other than the ones in the database"
            f"User query: {query}"
            f"database results: {books}",
        ),
        MessagesPlaceholder(variable_name="messages"),
    ]

    # Print debug statements
    print("Database Results:", books)

    prompt = ChatPromptTemplate.from_messages(template)
    chain = prompt | llm

    with_message_history = RunnableWithMessageHistory(chain, get_session_history)

    for chunk in with_message_history.stream(
        {"messages": [HumanMessage(content=query)]},
        config={"configurable": {"session_id": "abc2"}},
    ):
        yield chunk.content


# without intents, has streaming and chat history
def get_recommendation2(query):

    template = [
        (
            "system"
            "You are a smart librarian in the smart library"
            "Your job is to provide good books for the user in a subtle way"
            "The user will enter a query and expect you to understand what they want"
            "Based on the user's query i want you to convert their prompt into  a few kewords that will passed in chromadb as a query"
            "The way chromadb searches is similarity search where it will fetch the most semantically similar documents"
            "The columns for the database are: title, author, description, average rating, pages and year. Focus on description and title where it will contain most of the important words"
            "Do not respond in any way other than providing good similarity search keywords for the chromadb vector database"
            "Only provide the keywords, no other responses or sentences"
            f"User query: {query}"
        ),
        MessagesPlaceholder(variable_name="messages"),
    ]

    # Print debug statements
    # print("Database Results:", books)

    prompt = ChatPromptTemplate.from_messages(template)

    chain = prompt | llm
    with_message_history = RunnableWithMessageHistory(chain, get_session_history)

    response = with_message_history.invoke(
        {"messages": [HumanMessage(content="messages")]},
        config={"configurable": {"session_id": "abc2"}},
    )
    print(response.content)
    result = books_collection.query(query_texts=[response.content], n_results=3)
    books = result.get("documents")
    template2 = [
        (
            "system"
            "You are a smart librarian in the smart library"
            "Your job is retrieve the results of the database and present them to the user in a good manner"
            "the query that you will get is the result of the database and you need to sort it based on ratings without explicitly stating that"
            "The columns for the database are: title, author, description, average rating, pages and year."
            "Do not respond in any way other than providing the results"
            "Don't chat with the user, only provide the books"
            "list the books in an ordered manner (numbered or similar)"
            f"Query: {books}"
        ),
        MessagesPlaceholder(variable_name="messages"),
    ]
    prompt2 = ChatPromptTemplate.from_messages(template2)
    chain2 = prompt2 | llm
    with_message_history = RunnableWithMessageHistory(chain2, get_session_history)

    for chunk in with_message_history.stream(
        {"messages": [HumanMessage(content="messages")]},
        config={"configurable": {"session_id": "abc2"}},
    ):
        yield chunk.content


# For intents, no streaming or history and also incomplete
def get_recommendation3(query):

    tools = [recommend_book, add_book]

    template = [
        (
            "system",
            "You are a smart librarian in the smart library. "
            "You may be asked one of two things: either the user wants a book recommendation, or wants to add a book to the database. "
            "Don't do both actions; only do one of the two! "
            "\n\n1. **Book Recommendation**: "
            "If the user wants a recommendation, use the `recommend_book` function. "
            "The user will enter a query, and you need to understand their intent and convert their prompt into a few relevant keywords. "
            "These keywords will be used as a query to the ChromaDB database for a similarity search. "
            "The database columns are: title, author, description, average rating, pages, and year. "
            "Focus on the description and title columns to find the most semantically similar documents. "
            "Only provide the keywords, no other responses or sentences."
            "\n\n2. **Add a Book**: "
            "If the user wants to add a book to the database, ask them for the title, genre, author, and description of the book. "
            "Use the `add_book` function to add the book to the database and return a success message."
            "\n\n**Additional Notes**: "
            "Do not respond in any way other than providing the results. ",
        ),
        ("placeholder", "{chat_history}"),
        ("human", "{input}"),
        ("placeholder", "{agent_scratchpad}"),
    ]

    # Print debug statements
    # print("Database Results:", books)

    prompt = ChatPromptTemplate.from_messages(template)
    agent = create_tool_calling_agent(llm, tools, prompt)
    agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

    # chain = prompt | llm
    # with_message_history = RunnableWithMessageHistory(agent_executor, get_session_history)

    response = agent_executor.invoke(
        {"input": query},
        config={"configurable": {"session_id": "abc2"}},
    )
    return response.get("output")


@tool(return_direct=False)
def add_book(
    title: str = "", genre: str = "", author: str = "", description: str = ""
) -> str:
    """Add a book to the database."""
    doc = f"book title: {title}. genre: {genre}. author: {author}. description: {description}."
    books_collection.upsert(documents=doc, ids=[f"{random.uniform(100,500)}"])
    return "Success"


@tool(return_direct=False)
def recommend_book(words: str) -> str:
    """Recommend a book to the user"""
    result = books_collection.query(query_texts=[words], n_results=3)
    books = result.get("documents")
    template2 = [
        (
            "system"
            "You are a smart librarian in the smart library"
            "Your job is retrieve the results of the database and present them to the user in a good manner"
            "the query that you will get is the result of the database and you need to sort it based on ratings without explicitly stating that"
            "The columns for the database are: title, author, description, average rating, pages and year."
            "Do not respond in any way other than providing the results"
            "Don't chat with the user, only provide the books"
            "list the books in an ordered manner (numbered or similar)"
            f"Query: {books}"
        ),
        MessagesPlaceholder(variable_name="messages"),
    ]
    prompt2 = ChatPromptTemplate.from_messages(template2)
    chain2 = prompt2 | llm
    with_message_history = RunnableWithMessageHistory(chain2, get_session_history)

    response = with_message_history.invoke(
        {"messages": [HumanMessage(content="messages")]},
        config={"configurable": {"session_id": "abc2"}},
    )
    return response.content

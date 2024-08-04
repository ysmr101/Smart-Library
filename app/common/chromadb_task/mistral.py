from langchain_ollama import ChatOllama

import chromadb
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.messages import HumanMessage
from langchain_community.chat_message_histories import SQLChatMessageHistory


def getsqlite_session_history(session_id):
    return SQLChatMessageHistory(session_id, "sqlite:///memory.db")


client = chromadb.PersistentClient(
    path="/Users/yalruwaiti001/PycharmProjects/Smart Library/app/common/chromadb_task",
)
collection = client.get_or_create_collection(name="books")


def querydb(text):
    results = collection.query(
        query_texts=[text],
        n_results=10,
    )
    return results.get("documents")


chatmodel = ChatOllama(model="llama3.1")

config = {"configurable": {"session_id": "y2"}}


def query(query: str):

    template1 = [
        (
            "system,"
            "You are a librarian chatbot, only answer with to whats related about books and books suggestions"
            "I want you to take the users query and process it so that it will be feasible to input in a vector db,"
            "Extract any meaningful words, such as a title or an author or a date or a category or a description to look for."
        ),
        MessagesPlaceholder(variable_name="messages"),
    ]
    prompt = ChatPromptTemplate.from_messages(template1)
    chain = prompt | chatmodel
    with_message_history = RunnableWithMessageHistory(chain, getsqlite_session_history)

    response = with_message_history.invoke(
        {"messages": [HumanMessage(content=query)]},
        config=config,
    )

    print(response.content)
    response2 = querydb(response.content)

    template2 = [
        (
            "system,"
            "You are a librarian chatbot, only answer with to whats related about books and books suggestions"
            "Display the given books in order"
            f"Given books: {response2}"
        ),
        MessagesPlaceholder(variable_name="messages"),
    ]
    prompt2 = ChatPromptTemplate.from_messages(template2)
    print(response2)
    chain2 = prompt2 | chatmodel
    with_message_history = RunnableWithMessageHistory(chain2, getsqlite_session_history)
    for r in with_message_history.stream(
        {"messages": [HumanMessage(content=str(response2))]},
        config=config,
    ):
        yield r.content

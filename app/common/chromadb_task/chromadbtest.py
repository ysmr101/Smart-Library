from nltk.tokenize import word_tokenize
import ssl
from langchain_core.output_parsers import StrOutputParser
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import pandas as pd
import re
import nltk

# ssl._create_default_https_context = ssl._create_unverified_context
# nltk.download('punkt')
# nltk.download('stopwords')
# nltk.download('wordnet')
import chromadb

client = chromadb.PersistentClient(
    path="/Users/yalruwaiti001/PycharmProjects/Smart Library/app/common/chromadb_task",
)


stop_words = set(stopwords.words("english"))
lemmatizer = WordNetLemmatizer()
# Load the data
df = pd.read_csv("books.csv")
# Initialize the Ollama Embeddings model


def clean_string(s):
    if isinstance(s, str):
        s = s.lower()
        s = re.sub(r"[^a-z\s]", "", s)
    return s


df.dropna(subset=["title", "categories", "description", "authors"], inplace=True)
# df.dropna(subset=['title','categories','description', 'authors','isbn10','ratings_count','num_pages','average_rating','published_year'], inplace=True)

columns_to_clean = ["title", "categories", "description"]


def tokenize_string(s):
    if isinstance(s, str):
        return " ".join(word_tokenize(s))
    return s


def remove_stopwords(s):
    if isinstance(s, str):
        tokens = word_tokenize(s)
        filtered_tokens = [word for word in tokens if word not in stop_words]
        return " ".join(filtered_tokens)
    return s


def lemmatize_tokens(s):
    if isinstance(s, str):
        tokens = word_tokenize(s)
        lemmatized_tokens = [lemmatizer.lemmatize(word) for word in tokens]
        return " ".join(lemmatized_tokens)
    return s


for col in columns_to_clean:
    if col in df.columns:
        df[col] = df[col].apply(clean_string)
        df[col] = df[col].apply(tokenize_string)
        df[col] = df[col].apply(remove_stopwords)
        df[col] = df[col].apply(lemmatize_tokens)


def embed_book_and_create_metadata(row):
    text = (
        f"isbn10: {row['isbn10']}, title: {row['title']}, description: {row['description']}, "
        f"authors: {row['authors']}, categories: {row['categories']}, published_year: {row['published_year']}, "
        f"average_rating: {row['average_rating']}, num_pages: {row['num_pages']}, ratings_count: {row['ratings_count']}"
    )
    embedding = text

    metadata = {
        "isbn10": row["isbn10"],
        "title": row["title"],
        "description": row["description"],
        "authors": row["authors"],
        "categories": row["categories"],
        "published_year": row["published_year"],
        "average_rating": row["average_rating"],
        "num_pages": row["num_pages"],
        "ratings_count": row["ratings_count"],
    }
    return embedding, metadata


doc = []
metadatas_list = []
ids_list = []

for index, row in df.loc[6000:6446].iterrows():
    embedding, metadata = embed_book_and_create_metadata(row)
    doc.append(embedding)
    metadatas_list.append(metadata)
    ids_list.append(f"id_{index}")

collection = client.get_or_create_collection(name="books")


collection.upsert(documents=doc, metadatas=metadatas_list, ids=ids_list)

print("Inserted all book entries into ChromaDB successfully.")

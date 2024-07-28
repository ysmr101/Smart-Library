import pandas as pd
import chromadb
import time

# df = pd.read_csv('/Users/maltuaijri001/Desktop/cleaned_books.csv')
# # print(df)
# df = df.loc[4001:6000]
# print(df)

client = chromadb.PersistentClient(path="/Users/maltuaijri001/Desktop/chromadb")
books_collection = client.get_or_create_collection(name="improved_books2.0")
# start = time.time()

# texts = []
# def process_and_store_book(row):
#     text = f"book title: {row['title']}. genre: {row['categories']}. author: {row['authors']}. description: {row['description']}. average rating: {row['average_rating']}. pages: {row['num_pages']}. year: {row['published_year']}"
#     texts.append(text)

# # # Process each row in the dataframe
# # # point0 = time.time()-start

# df.apply(process_and_store_book, axis=1)
# # # point1 = time.time()-point0
# # # print(point1)
# ids = df['isbn10'].to_list()
# books_collection.upsert(
#         documents=texts,
#         ids=ids
#     )

# print("Data has been successfully embedded and stored in ChromaDB.")
# print(time.time()-start)
# # # result = books_collection.query(
# # #     query_texts=["spider"],
# # #     n_results=5
# # # )
# # # print(result.get('documents'))

import streamlit as st
import requests

st.title("Smart Library Query System")


if "result" not in st.session_state:
    st.session_state.result = ""

query = st.text_input("Enter your query about books:")

if st.button("Search"):
    st.session_state.result = ""
    with st.spinner("Querying the smart library..."):
        response = requests.post(
            "http://127.0.0.1:8000/books/mistral", params={"query": query}, stream=True
        )

        if response.status_code == 200:
            text_area = st.empty()
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    decoded_chunk = chunk.decode("utf-8")
                    st.session_state.result += decoded_chunk
                    text_area.text_area(
                        "Response from the library:",
                        st.session_state.result,
                        height=400,
                    )
            st.success("Query successful!")
        else:
            st.error(
                f"Failed to query the smart library: {response.status_code} - {response.reason}"
            )
            st.error(response.text)

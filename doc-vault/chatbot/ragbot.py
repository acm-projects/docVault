import os
from langchain_huggingface import HuggingFaceEmbeddings
import openai
from dotenv import load_dotenv
from flask import Flask, jsonify, request, Response
from flask_cors import CORS
from pinecone import Pinecone
from PyPDF2 import PdfReader
from langchain.text_splitter import CharacterTextSplitter
from langchain_pinecone import PineconeVectorStore
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
import numpy as np


'''env variables'''
openai.api_key = os.environ["OPENAI_API_KEY"] = ''
os.environ["PINECONE_API_KEY"] = ''
   


'''pinecone and openai setup'''
embeddings = HuggingFaceEmbeddings(model_name='sentence-transformers/all-MiniLM-L6-v2')
index_name = 'docvault'
vector_store = PineconeVectorStore.from_existing_index(index_name=index_name, embedding=embeddings)


retriever = vector_store.as_retriever(search_kwargs={'k':1})
llm = ChatOpenAI(model="gpt-4o-mini", openai_api_key=openai.api_key, temperature=0.7)
prompt_template = PromptTemplate(
    template="""
    Use the following context to answer the question as accurately as possible using only the context provided. If you are not sure or don't know, say 'I'm sorry, I don't know':
    Context: {context}
    Question: {question}
    Answer:""",
    input_variables=["context", "question"]
)
llm_chain = prompt_template | llm | StrOutputParser()


'''flask setup'''
app = Flask(__name__)
CORS(app)
@app.route('/chat', methods=['GET', 'POST'])
def response():
    if request.method == 'GET':
        str = "hello"
        response = jsonify({
            "GET": str
        })
        response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '0'
        return response
    elif request.method == 'POST':
        data = request.get_json()
        str = data['query']
        print(str)
        response = jsonify({
            "POST": str
        })
        response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '0'
        return response
    else:
        return jsonify({
            "ERROR": "err"
        })


if __name__ == "__main__":
    app.run(debug=True, port=8080)


def query(q):
    docs = vector_store.similarity_search(query=q, k=1)
    '''retriever.invoke(query)
    for doc in docs:
        print(doc.page_content)'''
    context = "\n\n".join([doc.page_content for doc in docs])
    answer = llm_chain.invoke({"context": context, "question": query})
    return answer

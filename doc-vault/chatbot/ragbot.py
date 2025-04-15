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

load_dotenv()

'''env variables'''
openai.api_key = os.environ["OPENAI_API_KEY"] = os.getenv('GPT_API_KEY')
os.environ["PINECONE_API_KEY"] =  os.getenv('PINECONE_KEY')


'''pinecone and openai setup'''
embeddings = HuggingFaceEmbeddings(model_name='sentence-transformers/all-MiniLM-L6-v2')
index_name = 'docvault'
vector_store = PineconeVectorStore.from_existing_index(index_name=index_name, embedding=embeddings)


retriever = vector_store.as_retriever(search_kwargs={'k':1})
llm = ChatOpenAI(model="gpt-4o-mini", openai_api_key=openai.api_key, temperature=0.7)
prompt_template = PromptTemplate(
    template="""
    Use the following context to answer the question as accurately as possible in approximately 75 words or less using only the context provided. If you are not sure or don't know, say 'Sorry I don't quite understand, please try again.':
    Context: {context}
    Question: {question}
    Answer:""",
    input_variables=["context", "question"]
)
llm_chain = prompt_template | llm | StrOutputParser()

def query(q):
    docs = vector_store.similarity_search(query=q, k=1)
    '''retriever.invoke(query)'''
    for doc in docs:
        print(doc.page_content)
    context = "\n\n".join([doc.page_content for doc in docs])
    answer = llm_chain.invoke({"context": context, "question": q})
    return answer

'''flask setup'''
app = Flask(__name__)
CORS(app) 
@app.route('/chat', methods=['POST'])
def post_response():
    data = request.get_json()
    str = query(data['query'])
    return jsonify({
        "POST": str
    })    


if __name__ == "__main__":
    app.run(debug=True, port=8080)
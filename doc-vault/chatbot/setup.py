from langchain_huggingface import HuggingFaceEmbeddings
from openai import OpenAI
from dotenv import load_dotenv
from pinecone import Pinecone
from PyPDF2 import PdfReader
from langchain.text_splitter import CharacterTextSplitter
import numpy as np
import os
load_dotenv()
pc = Pinecone(os.getenv('PINECONE_KEY'))
index_name = 'docvault'
index = pc.Index(index_name)

embeddings = HuggingFaceEmbeddings(model_name='sentence-transformers/all-MiniLM-L6-v2')

'''Add the path to your pdf file'''
pdf_path = "c:/Users/nichr/Downloads/4341Hw3.pdf"
reader = PdfReader(pdf_path)

raw_text = ''
for i, page in enumerate(reader.pages):
    text = page.extract_text()
    if text:
        raw_text += text

text_splitter = CharacterTextSplitter(        
    separator = "\n",
    chunk_size = 1000,
    chunk_overlap  = 200,
    length_function = len,
)
texts = text_splitter.split_text(raw_text)

query_embedding = embeddings.embed_query(raw_text)
query_embedding = np.array(query_embedding, dtype=np.float32)
query_embedding = query_embedding.tolist()
list = []
metadata = {"text": raw_text}
list.append(("vector 6", query_embedding, metadata))
index.upsert(list)


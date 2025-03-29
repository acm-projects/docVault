import os
import pickle
from langchain_community.chat_models import ChatOpenAI  # Correct import for ChatOpenAI
from langchain.schema import AIMessage, HumanMessage, SystemMessage
import gradio as gr
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings
from langchain_openai import ChatOpenAI



os.environ["OPENAI_API_KEY"] = ''
chat = ChatOpenAI(temperature=0)



# Load the FAISS index
docsearch = FAISS.load_local("faiss_index", OpenAIEmbeddings(), allow_dangerous_deserialization=True)

message_history = []  # Global variable to store the message history

def predict(input):
    global message_history  # Use the global message history

    # Retrieve the best matched chunks for the input query
    docs = docsearch.similarity_search(input, k=6)

    # Form the content to be used for the response generation
    main_content = input + "\n\n"
    for doc in docs:
        main_content += doc.page_content + "\n\n"

    # Append the user message to the message history
    message_history.append({"role": "user", "content": f"{input}"})

    # Add the context to the messages (use role: 'system', 'user', or 'assistant')
    messages = [
        {"role": "system", "content": "You are a Q&A bot and you will answer all the questions that the user has. If you don't know the answer, output 'Sorry, I don't know'."},
    ]

    # Add user query and context
    messages.append({"role": "user", "content": main_content})

    # Get AI response (assumed `chat` function exists and returns the assistant's reply)
    ai_response = chat(messages).content

    # Append the assistant's response to the messages
    messages.append({"role": "assistant", "content": ai_response})

    # Append the assistant response to the message history
    message_history.append({"role": "assistant", "content": f"{ai_response}"}) 

    # Get pairs of msg["content"] from message history, skipping the pre-prompt
    response = [(message_history[i]["content"], message_history[i+1]["content"]) for i in range(0, len(message_history)-1, 2)]  
    return response

# Create a Gradio Blocks app
with gr.Blocks() as demo:

    # Create the chatbot component
    chatbot = gr.Chatbot()

    # Define the query input box
    with gr.Row():
        query = gr.Textbox(show_label=False, placeholder="Enter text and press enter")

    # Set up the submit action for the query textbox
    query.submit(predict, query, chatbot)

    # To clear the query input after submission, use the `clear()` method
    query.submit(lambda: query.clear(), None, query)

# Launch the Gradio app
demo.launch()
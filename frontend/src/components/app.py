import os
import json
import requests
import gradio as gr
from dotenv import load_dotenv
from google import genai
from google.genai import types
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# ---------------------------
# ENV
# ---------------------------
load_dotenv(override=True)
API_KEY = os.getenv("GOOGLE_API_KEY")

if not API_KEY:
    # Fallback for simple testing if key is missing
    print("⚠️ GOOGLE_API_KEY not found. AI will not reply.")
    client = None
else:
    client = genai.Client(api_key=API_KEY)

# ---------------------------
# AI AGENT CLASS (Keep your existing logic)
# ---------------------------
class Me:
    def __init__(self):
        self.name = "B N Yashwanth"
        try:
            with open("me/summary.txt", "r", encoding="utf-8") as f:
                self.summary = f.read()
        except:
            self.summary = "Summary unavailable."
        self.model_name = "gemini-2.5-flash"

    def system_prompt(self):
        return f"You are {self.name}. Answer concisely based on: {self.summary}"

    def chat(self, message, history):
        if not client: return "Error: API Key missing."
        
        contents = []
        for h in history:
            # Handle different history formats (Gradio 3 vs 4/5)
            if isinstance(h, (list, tuple)):
                u, b = h
                if u: contents.append(types.Content(role="user", parts=[types.Part(text=str(u))]))
                if b: contents.append(types.Content(role="model", parts=[types.Part(text=str(b))]))
        
        contents.append(types.Content(role="user", parts=[types.Part(text=str(message))]))

        config = types.GenerateContentConfig(
            system_instruction=self.system_prompt(),
            temperature=0.7,
        )

        try:
            response = client.models.generate_content(
                model=self.model_name,
                contents=contents,
                config=config,
            )
            return response.text
        except Exception as e:
            return f"Error: {str(e)}"

# ---------------------------
# FASTAPI SETUP (The Fix)
# ---------------------------
# 1. Create the FastAPI App explicitly
app = FastAPI()

# 2. Add CORS Middleware manually (This fixes the 'unexpected keyword' error)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (localhost + vercel)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Create Gradio Interface
me = Me()
demo = gr.ChatInterface(
    fn=me.chat,
    title="Yashwanth's AI Assistant"
)

# 4. Mount Gradio on top of FastAPI
# The path must be empty string to mount at root
gr.mount_gradio_app(app, demo, path="/")

# 5. Run it
if __name__ == "__main__":
    # Print version to debug
    print(f"Running with Gradio Version: {gr.__version__}")
    
    # Use uvicorn directly
    uvicorn.run(app, host="0.0.0.0", port=7860)
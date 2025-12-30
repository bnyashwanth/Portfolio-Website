import os
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai
from google.genai import types
import gradio as gr

# ---------------------------
# CONFIGURATION
# ---------------------------
load_dotenv(override=True)
API_KEY = os.getenv("GOOGLE_API_KEY")

if not API_KEY:
    print("⚠️ GOOGLE_API_KEY not found. AI will not reply.")
    client = None
else:
    client = genai.Client(api_key=API_KEY)

# ---------------------------
# DATA MODELS
# ---------------------------
class ChatRequest(BaseModel):
    message: str
    history: list = []

# ---------------------------
# AI LOGIC
# ---------------------------
class Me:
    def __init__(self):
        self.name = "B N Yashwanth"
        try:
            with open("me/summary.txt", "r", encoding="utf-8") as f:
                self.summary = f.read()
        except:
            self.summary = "Summary unavailable."
        
        self.model_name = "gemini-1.5-flash"

    def system_prompt(self):
        return f"You are {self.name}. Answer concisely based on: {self.summary}"

    def chat_logic(self, message, history):
        if not client: return "Error: API Key missing."
        
        contents = []
        # Convert history
        for msg in history:
            # Handle different history formats (list of lists or list of dicts)
            if isinstance(msg, (list, tuple)) and len(msg) == 2:
                u, b = msg
                if u: contents.append(types.Content(role="user", parts=[types.Part(text=str(u))]))
                if b: contents.append(types.Content(role="model", parts=[types.Part(text=str(b))]))
        
        # Add current message
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

me = Me()

# ---------------------------
# FASTAPI APP
# ---------------------------
app = FastAPI()

# CORS - Allow your React apps
origins = [
    "https://portfolio-website-zeta-flax-98.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ 1. THE PURE API ROUTE (For React)
# This bypasses Gradio entirely for the frontend connection.
# React sends JSON -> Python returns JSON. Simple and unbreakable.
@app.post("/chat")
async def chat_endpoint(req: ChatRequest):
    try:
        response_text = me.chat_logic(req.message, req.history)
        return {"response": response_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ✅ 2. THE VISUAL UI (For Admin/Testing)
# We still keep Gradio mounted so you can visit the URL and test it yourself.
def gradio_chat(message, history):
    return me.chat_logic(message, history)

ui = gr.ChatInterface(fn=gradio_chat, title="Yashwanth's AI Backend")
gr.mount_gradio_app(app, ui, path="/")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=7860)
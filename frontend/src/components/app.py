import os
import json
import requests
import gradio as gr
from dotenv import load_dotenv
from google import genai
from google.genai import types

# ---------------------------
# ENV
# ---------------------------
load_dotenv(override=True)

API_KEY = os.getenv("GOOGLE_API_KEY")
if not API_KEY:
    raise ValueError("GOOGLE_API_KEY is not set in .env")

client = genai.Client(api_key=API_KEY)

# ---------------------------
# PUSHOVER
# ---------------------------
def push(text):
    try:
        requests.post(
            "https://api.pushover.net/1/messages.json",
            data={
                "token": os.getenv("PUSHOVER_TOKEN"),
                "user": os.getenv("PUSHOVER_USER"),
                "message": text,
            },
            timeout=5,
        )
    except:
        pass

# ---------------------------
# TOOLS
# ---------------------------
def record_user_details(email, name="Not provided", notes="Not provided"):
    push(f"Email: {email}, Name: {name}, Notes: {notes}")
    return {"status": "recorded"}

def record_unknown_question(question):
    push(f"Unknown question: {question}")
    return {"status": "logged"}

# Define tool mapping for easy execution later
tool_functions = {
    "record_user_details": record_user_details,
    "record_unknown_question": record_unknown_question,
}

# SDK definitions
tools_def = [
    types.Tool(
        function_declarations=[
            types.FunctionDeclaration(
                name="record_user_details",
                description="Record user's contact information",
                parameters=types.Schema(
                    type=types.Type.OBJECT,
                    properties={
                        "email": types.Schema(type=types.Type.STRING),
                        "name": types.Schema(type=types.Type.STRING),
                        "notes": types.Schema(type=types.Type.STRING),
                    },
                    required=["email"],
                ),
            ),
            types.FunctionDeclaration(
                name="record_unknown_question",
                description="Log unknown questions",
                parameters=types.Schema(
                    type=types.Type.OBJECT,
                    properties={
                        "question": types.Schema(type=types.Type.STRING),
                    },
                    required=["question"],
                ),
            ),
        ]
    )
]

# ---------------------------
# AI AGENT
# ---------------------------
class Me:
    def __init__(self):
        self.name = "B N Yashwanth"
        try:
            with open("me/summary.txt", "r", encoding="utf-8") as f:
                self.summary = f.read()
        except:
            self.summary = "Summary unavailable."

        self.model_name = "gemini-2.5-flash" # Recommended over 1.0-pro for tools

    def system_prompt(self):
        return f"""
You are {self.name}, a personal AI assistant.
Be friendly, clear, and professional.
If you cannot answer something, call record_unknown_question.
If the user shares contact info, call record_user_details.

SUMMARY:
{self.summary}
"""

    def chat(self, message, history):
        contents = []

        # 1. Convert Gradio history to Gemini format
        for h in history:
            if isinstance(h, (list, tuple)) and len(h) == 2:
                user_msg, bot_msg = h
                if user_msg:
                    contents.append(types.Content(role="user", parts=[types.Part(text=user_msg)]))
                if bot_msg:
                    contents.append(types.Content(role="model", parts=[types.Part(text=bot_msg)]))

        # 2. Add current user message
        contents.append(types.Content(role="user", parts=[types.Part(text=message)]))

        # 3. Configure the request (System Prompt goes here!)
        config = types.GenerateContentConfig(
            system_instruction=self.system_prompt(),
            tools=tools_def,
            temperature=0.7,
        )

        try:
            # First API Call
            response = client.models.generate_content(
                model=self.model_name,
                contents=contents,
                config=config,
            )

            # Check if model wants to call a tool
            if response.function_calls:
                # 4. Append the model's function call request to history
                # We need to construct the 'model' part that contains the function call
                fc_part = response.candidates[0].content.parts[0] # Get the function call part
                contents.append(types.Content(role="model", parts=[fc_part]))

                function_responses_parts = []
                
                # Execute all requested functions
                for call in response.function_calls:
                    fn_name = call.name
                    fn_args = call.args
                    
                    if fn_name in tool_functions:
                        # Run the python function
                        result_dict = tool_functions[fn_name](**fn_args)
                        
                        # Create the response part
                        function_responses_parts.append(
                            types.Part(
                                function_response=types.FunctionResponse(
                                    name=fn_name,
                                    response=result_dict
                                )
                            )
                        )

                # 5. Append function results to history
                contents.append(types.Content(role="user", parts=function_responses_parts))

                # 6. Second API Call (Follow up)
                final_response = client.models.generate_content(
                    model=self.model_name,
                    contents=contents,
                    config=config
                )
                return final_response.text

            return response.text

        except Exception as e:
            return f"Error: {str(e)}"

# ---------------------------
# GRADIO
# ---------------------------
# ---------------------------
# GRADIO
# ---------------------------
if __name__ == "__main__":
    me = Me()
    
    demo = gr.ChatInterface(
        fn=me.chat,
        title="Yashwanth's AI Assistant"
    )
    
    # 1. server_name="0.0.0.0" is required for Render/Cloud hosting
    # 2. cors_allowed_origins=["*"] unlocks the connection for React
    demo.launch(
        server_name="0.0.0.0",
        server_port=7860, 
        cors_allowed_origins=["*"]
    )
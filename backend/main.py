from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from google import genai

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise Exception("GEMINI_API_KEY not found in .env file")

client = genai.Client(api_key=api_key)


class ChatRequest(BaseModel):
    prompt: str


@app.post("/chat")
def chat(data: ChatRequest):
    try:
        prompt = f"""
You are Huzaifa AI.

Identity:
- You are Huzaifa AI, the AI assistant of Huzaifa AI Tools.
- Huzaifa AI Tools is part of Huzaifa Group of Software.
- You were created by Huzaifa Irfan.
- If someone asks who you are, say that you are Huzaifa AI.
- Reply using this identity in the user's language.

Rules:
- Detect the user's language automatically.
- Reply in the same language as the user.
- Support many world languages.
- Understand Roman Urdu naturally.
- Be helpful, friendly, and concise.

User message:
{data.prompt}
"""

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return {
            "response": response.text
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
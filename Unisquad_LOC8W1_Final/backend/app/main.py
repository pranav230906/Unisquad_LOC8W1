import os
import httpx
from fastapi import FastAPI, APIRouter, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

from app.core.config import get_settings
from app.api.api_v1.endpoints.navigation import router as navigation_router

settings = get_settings()

app = FastAPI(
    title=settings.APP_NAME,
    debug=settings.DEBUG,
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ── CORS — allow the Vite dev frontend ───────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Since we might have CORS setup variations, "*" prevents issues
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_router = APIRouter(prefix="/api/v1")

async def translate_with_sarvam(file_bytes: bytes) -> str:
    """
    Calls Sarvam AI Speech-to-Text-Translate API to translate regional audio to English.
    """
    # TODO (Database/Auth Integration): Ensure this key is stored in your secure .env 
    SARVAM_API_KEY = os.getenv("SARVAM_API_KEY", "your_sarvam_api_key_placeholder")
    
    # -------------------------------------------------------------
    # PLACEHOLDER MOCK FOR LOCAL DEV
    # -------------------------------------------------------------
    if SARVAM_API_KEY == "your_sarvam_api_key_placeholder":
         print("WARNING: Using Sarvam AI API Key placeholder. Audio translation will be mocked. Ensure you set SARVAM_API_KEY in .env!")
         # For development, we just assume the worker said "toggle available" 
         # until you supply the actual Sarvam API key.
         return "toggle available"

    url = "https://api.sarvam.ai/speech-to-text-translate"
    headers = {
        "api-subscription-key": SARVAM_API_KEY
    }
    
    files = {
        'file': ('audio.webm', file_bytes, 'audio/webm')
    }
    data = {
        "prompt": "",
        # Placeholder for saaras model, refer to Sarvam Documentation for actual model ID
        "model": "saaras:v2.5" 
    }
    
    try:
        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.post(url, headers=headers, data=data, files=files)
            response.raise_for_status()
            result = response.json()
            # Depending on Sarvam's exact JSON shape, adjust to get the english translation.
            return result.get("transcript", "")
    except Exception as e:
        print(f"[Sarvam AI Error]: Failed to translate audio. {e}")
        return ""

def deduce_intent_from_text(text: str):
    """
    NLP Intent matching from the translated English text.
    In the future, this could use an LLM instead of regex/keyword matching.
    """
    text = text.lower()
    intent = None
    payload = None

    if "available" in text or "toggle available" in text or "offline" in text:
        intent = "TOGGLE_AVAILABLE"
    elif "navigation" in text or "navigate" in text or "start trip" in text:
        intent = "START_NAVIGATION"
    elif "completed" in text or "done" in text or "finish" in text:
        intent = "COMPLETE_JOB"
    elif "accept" in text and "job" in text:
        intent = "ACCEPT_JOB"
        job_query = text.replace("accept", "").replace("job", "").strip()
        payload = {"jobQuery": job_query}
    elif "open" in text:
        if "settings" in text:
            intent = "OPEN_TAB"
            payload = {"tab": "settings"}
        elif "jobs" in text:
            intent = "OPEN_TAB"
            payload = {"tab": "jobs"}
        elif "schedule" in text:
            intent = "OPEN_TAB"
            payload = {"tab": "schedule"}
        elif "earnings" in text:
            intent = "OPEN_TAB"
            payload = {"tab": "earnings"}
        elif "reviews" in text:
            intent = "OPEN_TAB"
            payload = {"tab": "reviews"}
        elif "profile" in text:
            intent = "OPEN_TAB"
            payload = {"tab": "profile"}

    return intent, payload

@api_router.post("/voice/process", tags=["Voice Assistant"])
async def process_voice_command(file: UploadFile = File(...)):
    """
    Endpoint that accepts regional language voice audio from the frontend
    and translates it using Sarvam AI, returning the action to be performed.
    """
    file_bytes = await file.read()
    
    # 1. Translate Audio using Sarvam AI to English
    translated_english_text = await translate_with_sarvam(file_bytes)
    print(f"[Voice processed] Translated Text: '{translated_english_text}'")
    
    # 2. Parse Intent
    intent, payload = deduce_intent_from_text(translated_english_text)
    print(f"[Voice processed] Intent: {intent}, Payload: {payload}")

    return {
        "status": "success",
        "translated_text": translated_english_text,
        "intent": intent,
        "payload": payload
    }


# ── Register routers under /api/v1 ──────────────────────────────────
app.include_router(navigation_router, prefix="/api/v1")
app.include_router(api_router)

@app.get("/", tags=["Health"])
async def root():
    return {"status": "ok", "app": settings.APP_NAME}

@app.get("/health", tags=["Health"])
async def health():
    return {"status": "healthy"}

import logging
import os
import httpx
from fastapi import FastAPI, APIRouter, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

try:
    from app.routes import auth, client, jobs, twilio
except ImportError:
    pass

from app.core.config import settings
try:
    from app.db.init_db import create_indexes
except ImportError:
    pass

try:
    from app.api.api_v1.endpoints.navigation import router as navigation_router
except ImportError:
    navigation_router = None

logging.basicConfig(
    level=logging.DEBUG if settings.DEBUG else logging.INFO,
    format="%(levelname)s | %(name)s | %(message)s",
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title=settings.APP_NAME,
    description="A job marketplace backend",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173", "http://127.0.0.1:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

try:
    app.include_router(auth.router)
    app.include_router(client.router)
    app.include_router(jobs.router)
    app.include_router(twilio.router)
except NameError:
    pass

@app.on_event("startup")
async def on_startup():
    logger.info("🚀 Starting %s …", settings.APP_NAME)
    try:
        if 'create_indexes' in globals():
            await create_indexes()
            logger.info("✅ Database indexes ready.")
    except Exception as e:
        logger.error(f"Failed to create indexes: {e}")

@app.on_event("shutdown")
async def on_shutdown():
    try:
        from app.db.session import client
        client.close()
        logger.info("🛑 MongoDB client closed.")
    except Exception:
        pass

@app.get("/")
async def root():
    return {"message": "Job Marketplace API is running"}

@app.get("/health", tags=["meta"])
async def health():
    return {"status": "ok", "app": settings.APP_NAME}

try:
    from app.api.api_v1.endpoints.auth import router as auth_router
    from app.api.api_v1.endpoints.users import router as users_router
    from app.api.api_v1.endpoints.jobs import router as jobs_router
    app.include_router(auth_router, prefix="/api/v1")
    app.include_router(users_router, prefix="/api/v1")
    app.include_router(jobs_router, prefix="/api/v1/jobs", tags=["jobs"])
except ImportError as e:
    print(e)

if navigation_router:
    app.include_router(navigation_router, prefix="/api/v1")

# Sarvam AI Voice Integration
api_router = APIRouter(prefix="/api/v1")

async def translate_with_sarvam(file_bytes: bytes) -> str:
    SARVAM_API_KEY = os.getenv("SARVAM_API_KEY", "your_sarvam_api_key_placeholder")
    
    if SARVAM_API_KEY == "your_sarvam_api_key_placeholder":
         print("WARNING: Using Sarvam AI API Key placeholder. Audio translation will be mocked. Ensure you set SARVAM_API_KEY in .env!")
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
        "model": "saaras:v2.5" 
    }
    
    try:
        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.post(url, headers=headers, data=data, files=files)
            response.raise_for_status()
            result = response.json()
            return result.get("transcript", "")
    except Exception as e:
        print(f"[Sarvam AI Error]: Failed to translate audio. {e}")
        return ""

def deduce_intent_from_text(text: str):
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
    file_bytes = await file.read()
    
    translated_english_text = await translate_with_sarvam(file_bytes)
    print(f"[Voice processed] Translated Text: '{translated_english_text}'")
    
    intent, payload = deduce_intent_from_text(translated_english_text)
    print(f"[Voice processed] Intent: {intent}, Payload: {payload}")

    return {
        "status": "success",
        "translated_text": translated_english_text,
        "intent": intent,
        "payload": payload
    }

app.include_router(api_router)

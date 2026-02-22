from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, client, jobs, twilio

app = FastAPI(
    title="Job Marketplace API",
    description="A job marketplace backend for clients and workers",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(client.router)
app.include_router(jobs.router)
app.include_router(twilio.router)


@app.get("/")
async def root():
    return {"message": "Job Marketplace API is running"}

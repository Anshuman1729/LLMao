import os
from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import auth, creator, products, voice, onboarding

app = FastAPI(title="Style Bazaar API", version="1.0.0")

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(creator.router)
app.include_router(products.router)
app.include_router(voice.router)
app.include_router(onboarding.router)


@app.get("/health")
async def health():
    return {"status": "ok", "service": "style-bazaar-api"}

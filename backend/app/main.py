import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routes.sessions import router as sessions_router

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Evalio API", version="0.2.1")

cors_kwargs: dict = {
    "allow_origins": settings.cors_origin_list,
    "allow_credentials": True,
    "allow_methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    "allow_headers": ["Authorization", "Content-Type", "Accept", "Origin"],
    "expose_headers": ["*"],
}

if settings.cors_origin_regex:
    cors_kwargs["allow_origin_regex"] = settings.cors_origin_regex

app.add_middleware(CORSMiddleware, **cors_kwargs)

app.include_router(sessions_router)

logger.info("CORS allowed origins: %s", settings.cors_origin_list)
if settings.cors_origin_regex:
    logger.info("CORS origin regex: %s", settings.cors_origin_regex)


@app.get("/health")
def health():
    return {
        "status": "ok",
        "cors_origins_count": len(settings.cors_origin_list),
    }

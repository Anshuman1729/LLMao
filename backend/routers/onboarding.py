import os
from fastapi import APIRouter, Cookie, Response
from typing import Optional

from services.session import get_session, update_session

router = APIRouter()

COOKIE_SAMESITE = os.getenv("COOKIE_SAMESITE", "lax")


@router.get("/api/onboarding/status")
async def get_onboarding_status(session_id: Optional[str] = Cookie(default=None)):
    if not session_id:
        return {"complete": False}
    creator = get_session(session_id)
    if not creator:
        return {"complete": False}
    return {"complete": creator.get("onboarding_complete", False)}


@router.post("/api/onboarding/complete")
async def complete_onboarding(response: Response, session_id: Optional[str] = Cookie(default=None)):
    if session_id:
        new_token = update_session(session_id, {"onboarding_complete": True})
        response.set_cookie(
            "session_id",
            new_token,
            httponly=True,
            samesite=COOKIE_SAMESITE,  # type: ignore[arg-type]
            max_age=86400,
        )
    return {"ok": True}

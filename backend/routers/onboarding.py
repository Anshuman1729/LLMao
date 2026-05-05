from fastapi import APIRouter, Cookie
from typing import Optional

from services.session import get_session, update_session

router = APIRouter()


@router.get("/api/onboarding/status")
async def get_onboarding_status(session_id: Optional[str] = Cookie(default=None)):
    if not session_id:
        return {"complete": False}
    creator = get_session(session_id)
    if not creator:
        return {"complete": False}
    return {"complete": creator.get("onboarding_complete", False)}


@router.post("/api/onboarding/complete")
async def complete_onboarding(session_id: Optional[str] = Cookie(default=None)):
    if session_id:
        update_session(session_id, {"onboarding_complete": True})
    return {"ok": True}

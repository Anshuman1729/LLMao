import os
from fastapi import APIRouter, Cookie, Response
from pydantic import BaseModel
from typing import Optional

from services.session import get_session, update_session, create_session

router = APIRouter()

COOKIE_SAMESITE = os.getenv("COOKIE_SAMESITE", "lax")

CATEGORY_TO_NICHE = {
    'fashion': 'fashion',
    'home-decor': 'home',
    'makeup': 'beauty',
    'electronics': 'lifestyle',
    'stationary': 'lifestyle',
    'others': 'lifestyle',
}


@router.get("/api/onboarding/status")
async def get_onboarding_status(session_id: Optional[str] = Cookie(default=None)):
    if not session_id:
        return {"complete": False}
    creator = get_session(session_id)
    if not creator:
        return {"complete": False}
    return {"complete": creator.get("onboarding_complete", False)}


class ProfileUpdate(BaseModel):
    name: str
    username: str
    follower_count: int
    category: str
    creator_type_id: str


@router.post("/api/onboarding/profile")
async def save_profile(
    body: ProfileUpdate,
    response: Response,
    session_id: Optional[str] = Cookie(default=None),
):
    niche = CATEGORY_TO_NICHE.get(body.category, 'lifestyle')
    updates = {
        "name": body.name,
        "username": body.username.lstrip('@'),
        "follower_count": body.follower_count,
        "niche": niche,
        "category": body.category,
        "creator_type_id": body.creator_type_id,
        "onboarding_complete": True,
    }
    # Build on existing session or start fresh for new users
    existing = get_session(session_id or "") or {}
    existing.update(updates)
    # Ensure required fields have fallbacks
    existing.setdefault("id", f"user_{body.username}")
    existing.setdefault("profile_pic", f"https://api.dicebear.com/7.x/avataaars/svg?seed={body.username}")
    existing.setdefault("bio", "")
    new_token = create_session(existing)
    response.set_cookie(
        "session_id",
        new_token,
        httponly=True,
        samesite=COOKIE_SAMESITE,  # type: ignore[arg-type]
        max_age=86400,
    )
    return {"ok": True}


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

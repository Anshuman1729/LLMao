import os
from uuid import uuid4

from fastapi import APIRouter, Response, Request
from fastapi.responses import RedirectResponse

from services.session import create_session, MOCK_CREATOR
from services.instagram import get_authorize_url, exchange_code, fetch_profile, build_creator_from_profile

router = APIRouter()

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")
MOCK_AUTH = os.getenv("MOCK_AUTH", "false").lower() == "true"
COOKIE_SAMESITE = os.getenv("COOKIE_SAMESITE", "lax")


@router.get("/auth/instagram")
async def instagram_login(response: Response, mock: bool = False):
    if MOCK_AUTH or mock:
        session_id = create_session(MOCK_CREATOR.copy())
        redirect = RedirectResponse(url=f"{FRONTEND_URL}/onboarding")
        redirect.set_cookie(
            "session_id",
            session_id,
            httponly=True,
            samesite=COOKIE_SAMESITE,  # type: ignore[arg-type]
            max_age=86400,
        )
        return redirect

    state = str(uuid4())
    url = get_authorize_url(state)
    return RedirectResponse(url=url)


@router.get("/auth/instagram/callback")
async def instagram_callback(code: str, state: str = ""):
    try:
        token_data = await exchange_code(code)
        profile = await fetch_profile(token_data["access_token"], token_data["user_id"])
        creator = build_creator_from_profile(profile)
    except Exception:
        # Fall back to mock creator if Instagram API fails
        creator = MOCK_CREATOR.copy()

    session_id = create_session(creator)
    redirect = RedirectResponse(url=f"{FRONTEND_URL}/onboarding")
    redirect.set_cookie(
        "session_id",
        session_id,
        httponly=True,
        samesite=COOKIE_SAMESITE,  # type: ignore[arg-type]
        max_age=86400,
    )
    return redirect

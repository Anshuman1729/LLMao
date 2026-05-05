from fastapi import APIRouter, Cookie, HTTPException
from typing import Optional

from services.session import get_session, MOCK_CREATOR
from data.mock_audience import MOCK_AUDIENCE

router = APIRouter()


def _get_creator(session_id: Optional[str]) -> dict:
    if session_id:
        creator = get_session(session_id)
        if creator:
            return creator
    # Return mock creator as fallback (for dev without cookies)
    return MOCK_CREATOR


@router.get("/api/creator/me")
async def get_creator(session_id: Optional[str] = Cookie(default=None)):
    return _get_creator(session_id)


@router.get("/api/creator/audience")
async def get_audience(session_id: Optional[str] = Cookie(default=None)):
    creator = _get_creator(session_id)
    niche = creator.get("niche", "lifestyle")
    return MOCK_AUDIENCE.get(niche, MOCK_AUDIENCE["lifestyle"])

import os
from typing import Dict, Optional, Any

import jwt

JWT_SECRET = os.getenv("JWT_SECRET", "style-bazaar-dev-secret-change-in-prod")
JWT_ALGORITHM = "HS256"
JWT_EXPIRY_SECONDS = 86400  # 24 hours

MOCK_CREATOR = {
    "id": "mock_001",
    "name": "Priya Sharma",
    "username": "priya.styles",
    "profile_pic": "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
    "follower_count": 48200,
    "bio": "Fashion & lifestyle creator | OOTD everyday ✨",
    "niche": "fashion",
    "onboarding_complete": False,
}


def create_session(creator: Dict[str, Any]) -> str:
    """Encode creator data into a signed JWT token."""
    import time
    payload = {**creator, "exp": int(time.time()) + JWT_EXPIRY_SECONDS}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def get_session(token: str) -> Optional[Dict[str, Any]]:
    """Decode and verify a JWT token, returning creator data or None."""
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        payload.pop("exp", None)
        return payload
    except jwt.PyJWTError:
        return None


def update_session(token: str, data: Dict[str, Any]) -> str:
    """Decode token, merge new data, and return a fresh JWT."""
    creator = get_session(token) or {}
    creator.update(data)
    return create_session(creator)

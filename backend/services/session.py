from typing import Dict, Optional, Any
from uuid import uuid4

# In-memory session store: session_id → creator dict
_store: Dict[str, Dict[str, Any]] = {}

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
    session_id = str(uuid4())
    _store[session_id] = creator
    return session_id


def get_session(session_id: str) -> Optional[Dict[str, Any]]:
    return _store.get(session_id)


def update_session(session_id: str, data: Dict[str, Any]) -> None:
    if session_id in _store:
        _store[session_id].update(data)


def delete_session(session_id: str) -> None:
    _store.pop(session_id, None)

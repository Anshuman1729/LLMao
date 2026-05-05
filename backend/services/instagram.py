import os
from urllib.parse import urlencode
from typing import Dict, Any

import httpx

INSTAGRAM_APP_ID = os.getenv("INSTAGRAM_APP_ID", "")
INSTAGRAM_APP_SECRET = os.getenv("INSTAGRAM_APP_SECRET", "")
INSTAGRAM_REDIRECT_URI = os.getenv("INSTAGRAM_REDIRECT_URI", "http://localhost:8000/auth/instagram/callback")

AUTHORIZE_URL = "https://api.instagram.com/oauth/authorize"
TOKEN_URL = "https://api.instagram.com/oauth/access_token"
PROFILE_URL = "https://graph.instagram.com/me"

NICHE_KEYWORDS: Dict[str, list] = {
    "fashion": ["fashion", "style", "outfit", "ootd", "clothing", "wardrobe", "wear"],
    "beauty": ["beauty", "makeup", "skincare", "cosmetics", "glow", "glam"],
    "lifestyle": ["lifestyle", "life", "wellness", "motivation", "daily", "vlog"],
    "food": ["food", "recipe", "cooking", "chef", "foodie", "baking", "restaurant"],
    "home": ["home", "decor", "interior", "diy", "homedecor", "house"],
}


def get_authorize_url(state: str) -> str:
    params = {
        "client_id": INSTAGRAM_APP_ID,
        "redirect_uri": INSTAGRAM_REDIRECT_URI,
        "scope": "user_profile,user_media",
        "response_type": "code",
        "state": state,
    }
    return f"{AUTHORIZE_URL}?{urlencode(params)}"


async def exchange_code(code: str) -> Dict[str, Any]:
    async with httpx.AsyncClient() as client:
        r = await client.post(
            TOKEN_URL,
            data={
                "client_id": INSTAGRAM_APP_ID,
                "client_secret": INSTAGRAM_APP_SECRET,
                "grant_type": "authorization_code",
                "redirect_uri": INSTAGRAM_REDIRECT_URI,
                "code": code,
            },
        )
        r.raise_for_status()
        return r.json()


async def fetch_profile(access_token: str, user_id: str) -> Dict[str, Any]:
    async with httpx.AsyncClient() as client:
        r = await client.get(
            PROFILE_URL,
            params={
                "fields": "id,username,name,biography,followers_count,profile_picture_url",
                "access_token": access_token,
            },
        )
        r.raise_for_status()
        return r.json()


def infer_niche(bio: str) -> str:
    bio_lower = bio.lower()
    scores = {
        niche: sum(1 for kw in kws if kw in bio_lower)
        for niche, kws in NICHE_KEYWORDS.items()
    }
    best = max(scores, key=lambda k: scores[k])
    return best if scores[best] > 0 else "lifestyle"


def build_creator_from_profile(profile: Dict[str, Any]) -> Dict[str, Any]:
    bio = profile.get("biography", "")
    return {
        "id": profile.get("id", ""),
        "name": profile.get("name", profile.get("username", "Creator")),
        "username": profile.get("username", ""),
        "profile_pic": profile.get("profile_picture_url", "https://api.dicebear.com/7.x/avataaars/svg?seed=creator"),
        "follower_count": profile.get("followers_count", 0),
        "bio": bio,
        "niche": infer_niche(bio),
        "onboarding_complete": False,
    }

from fastapi import APIRouter, Cookie, Query
from typing import Optional

from services.session import get_session, MOCK_CREATOR
from data.mock_products import filter_products

router = APIRouter()


@router.get("/api/products/recommended")
async def get_recommended_products(
    niche: str = Query(default="fashion"),
    price_range: str = Query(default="mid"),
    age_group: str = Query(default="18-24"),
    session_id: Optional[str] = Cookie(default=None),
):
    # If niche not provided via query, infer from session
    if session_id and niche == "fashion":
        creator = get_session(session_id)
        if creator:
            niche = creator.get("niche", "fashion")

    products = filter_products(niche=niche, price_range=price_range, age_group=age_group)
    return products

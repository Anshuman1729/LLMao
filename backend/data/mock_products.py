from typing import List, Dict, Any

MOCK_PRODUCTS: List[Dict[str, Any]] = [
    # Fashion
    {"id": "p001", "name": "Floral Anarkali Kurta Set", "category": "Women's Ethnic", "price_min": 399, "price_max": 799, "price_range": "₹399–₹799", "commission_pct": 15, "niche_tags": ["fashion", "lifestyle"], "image_url": "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=400&fit=crop", "match_score": 96, "description": "Trending ethnic wear loved by fashion creators"},
    {"id": "p002", "name": "Printed Co-ord Set", "category": "Women's Western", "price_min": 499, "price_max": 999, "price_range": "₹499–₹999", "commission_pct": 18, "niche_tags": ["fashion"], "image_url": "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop", "match_score": 93, "description": "Instagram-ready co-ord sets for modern creators"},
    {"id": "p003", "name": "Embroidered Dupatta", "category": "Accessories", "price_min": 199, "price_max": 499, "price_range": "₹199–₹499", "commission_pct": 20, "niche_tags": ["fashion", "beauty"], "image_url": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop", "match_score": 91, "description": "High-margin accessory with wide audience appeal"},
    {"id": "p004", "name": "Casual Palazzo Set", "category": "Women's Fusion", "price_min": 349, "price_max": 699, "price_range": "₹349–₹699", "commission_pct": 16, "niche_tags": ["fashion", "lifestyle"], "image_url": "https://images.unsplash.com/photo-1551489186-cf8726f514f8?w=400&h=400&fit=crop", "match_score": 89, "description": "Comfort-first fashion that sells year-round"},
    {"id": "p005", "name": "Festive Lehenga Choli", "category": "Women's Ethnic", "price_min": 799, "price_max": 1499, "price_range": "₹799–₹1,499", "commission_pct": 14, "niche_tags": ["fashion"], "image_url": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop", "match_score": 87, "description": "High-value festive wear with great commissions"},
    {"id": "p006", "name": "Rayon Printed Saree", "category": "Women's Ethnic", "price_min": 299, "price_max": 599, "price_range": "₹299–₹599", "commission_pct": 17, "niche_tags": ["fashion"], "image_url": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop", "match_score": 85, "description": "Everyday saree trending with young audiences"},
    # Beauty
    {"id": "p007", "name": "Vitamin C Serum", "category": "Skincare", "price_min": 249, "price_max": 499, "price_range": "₹249–₹499", "commission_pct": 22, "niche_tags": ["beauty", "lifestyle"], "image_url": "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop", "match_score": 94, "description": "Top-selling skincare with high repeat purchase rate"},
    {"id": "p008", "name": "Makeup Brush Set (12pcs)", "category": "Beauty Tools", "price_min": 199, "price_max": 399, "price_range": "₹199–₹399", "commission_pct": 25, "niche_tags": ["beauty"], "image_url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop", "match_score": 91, "description": "Essential beauty kit — great gifting product"},
    {"id": "p009", "name": "Hyaluronic Acid Moisturizer", "category": "Skincare", "price_min": 299, "price_max": 599, "price_range": "₹299–₹599", "commission_pct": 20, "niche_tags": ["beauty"], "image_url": "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop", "match_score": 88, "description": "Viral moisturizer perfect for skincare content"},
    {"id": "p010", "name": "Lip Gloss Set (6 shades)", "category": "Makeup", "price_min": 149, "price_max": 299, "price_range": "₹149–₹299", "commission_pct": 23, "niche_tags": ["beauty", "fashion"], "image_url": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop", "match_score": 86, "description": "Budget-friendly lip gloss that photos beautifully"},
    # Lifestyle
    {"id": "p011", "name": "Scented Soy Candle Set", "category": "Home Decor", "price_min": 299, "price_max": 599, "price_range": "₹299–₹599", "commission_pct": 18, "niche_tags": ["home", "lifestyle"], "image_url": "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?w=400&h=400&fit=crop", "match_score": 83, "description": "Aesthetic home products trending on Reels"},
    {"id": "p012", "name": "Yoga Mat with Carry Bag", "category": "Fitness", "price_min": 399, "price_max": 799, "price_range": "₹399–₹799", "commission_pct": 15, "niche_tags": ["lifestyle"], "image_url": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop", "match_score": 80, "description": "Wellness products loved by lifestyle creators"},
    {"id": "p013", "name": "Stainless Steel Water Bottle", "category": "Kitchen", "price_min": 249, "price_max": 449, "price_range": "₹249–₹449", "commission_pct": 16, "niche_tags": ["lifestyle"], "image_url": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop", "match_score": 78, "description": "High-utility daily product with wide appeal"},
    # Home
    {"id": "p014", "name": "Macrame Wall Hanging", "category": "Wall Decor", "price_min": 299, "price_max": 699, "price_range": "₹299–₹699", "commission_pct": 20, "niche_tags": ["home"], "image_url": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop", "match_score": 90, "description": "Boho-chic decor that looks stunning on camera"},
    {"id": "p015", "name": "Ceramic Planter Set (3pcs)", "category": "Home Decor", "price_min": 349, "price_max": 599, "price_range": "₹349–₹599", "commission_pct": 18, "niche_tags": ["home", "lifestyle"], "image_url": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop", "match_score": 87, "description": "Indoor plants & planters are a top Reels trend"},
    # Food
    {"id": "p016", "name": "Cast Iron Kadai", "category": "Cookware", "price_min": 599, "price_max": 1199, "price_range": "₹599–₹1,199", "commission_pct": 14, "niche_tags": ["food"], "image_url": "https://images.unsplash.com/photo-1584990347449-35d6c92cead0?w=400&h=400&fit=crop", "match_score": 89, "description": "Authentic cookware loved by food creators"},
    {"id": "p017", "name": "Herb Garden Starter Kit", "category": "Gardening", "price_min": 299, "price_max": 499, "price_range": "₹299–₹499", "commission_pct": 19, "niche_tags": ["food", "lifestyle"], "image_url": "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&h=400&fit=crop", "match_score": 85, "description": "Grow-your-own herb kit trending with foodies"},
    # Premium
    {"id": "p018", "name": "Designer Silk Dupatta", "category": "Accessories", "price_min": 799, "price_max": 1599, "price_range": "₹799–₹1,599", "commission_pct": 16, "niche_tags": ["fashion"], "image_url": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop", "match_score": 82, "description": "Premium accessory for fashion influencers"},
    {"id": "p019", "name": "Jade Roller & Gua Sha Set", "category": "Skincare Tools", "price_min": 599, "price_max": 1099, "price_range": "₹599–₹1,099", "commission_pct": 22, "niche_tags": ["beauty"], "image_url": "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop", "match_score": 88, "description": "Premium skincare tool with viral demo potential"},
    {"id": "p020", "name": "Handloom Cotton Kurti", "category": "Women's Ethnic", "price_min": 449, "price_max": 899, "price_range": "₹449–₹899", "commission_pct": 15, "niche_tags": ["fashion", "lifestyle"], "image_url": "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=400&fit=crop", "match_score": 84, "description": "Sustainable fashion that resonates with conscious buyers"},
]


PRICE_RANGE_MAP = {
    "budget": (0, 500),
    "mid": (500, 1500),
    "premium": (1500, float("inf")),
}


def filter_products(niche: str, price_range: str, age_group: str = "18-24") -> List[Dict[str, Any]]:
    min_price, max_price = PRICE_RANGE_MAP.get(price_range, (0, float("inf")))

    filtered = [
        p for p in MOCK_PRODUCTS
        if niche in p["niche_tags"] and min_price <= p["price_min"] <= max_price
    ]

    if not filtered:
        filtered = [p for p in MOCK_PRODUCTS if niche in p["niche_tags"]]

    return sorted(filtered, key=lambda p: p["match_score"], reverse=True)

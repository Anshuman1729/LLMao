from typing import Dict, Any

MOCK_AUDIENCE: Dict[str, Any] = {
    "fashion": {
        "age_distribution": {"13-17": 8, "18-24": 45, "25-34": 32, "35-44": 11, "45+": 4},
        "gender": {"female": 74, "male": 23, "other": 3},
        "top_locations": ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Pune"],
        "income_bracket": "lower-middle",
        "interests": ["fashion", "beauty", "lifestyle"],
    },
    "beauty": {
        "age_distribution": {"13-17": 12, "18-24": 50, "25-34": 28, "35-44": 8, "45+": 2},
        "gender": {"female": 82, "male": 15, "other": 3},
        "top_locations": ["Delhi", "Mumbai", "Chennai", "Kolkata", "Jaipur"],
        "income_bracket": "lower-middle",
        "interests": ["beauty", "skincare", "wellness"],
    },
    "lifestyle": {
        "age_distribution": {"13-17": 5, "18-24": 38, "25-34": 40, "35-44": 14, "45+": 3},
        "gender": {"female": 65, "male": 32, "other": 3},
        "top_locations": ["Bangalore", "Mumbai", "Hyderabad", "Pune", "Delhi"],
        "income_bracket": "middle",
        "interests": ["lifestyle", "wellness", "travel"],
    },
    "food": {
        "age_distribution": {"13-17": 6, "18-24": 30, "25-34": 38, "35-44": 20, "45+": 6},
        "gender": {"female": 55, "male": 43, "other": 2},
        "top_locations": ["Mumbai", "Delhi", "Kolkata", "Chennai", "Ahmedabad"],
        "income_bracket": "middle",
        "interests": ["food", "cooking", "lifestyle"],
    },
    "home": {
        "age_distribution": {"13-17": 2, "18-24": 20, "25-34": 42, "35-44": 28, "45+": 8},
        "gender": {"female": 70, "male": 28, "other": 2},
        "top_locations": ["Bangalore", "Pune", "Hyderabad", "Mumbai", "Chennai"],
        "income_bracket": "middle",
        "interests": ["home decor", "lifestyle", "diy"],
    },
}

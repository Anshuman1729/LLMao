import sys
import os

# Make the backend root importable (parent of this api/ directory)
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from main import app  # noqa: E402
from mangum import Mangum  # noqa: E402

# Vercel invokes this handler for every request
handler = Mangum(app, lifespan="off")

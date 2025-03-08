import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "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")
UPLOAD_FOLDER = "backend/uploads"
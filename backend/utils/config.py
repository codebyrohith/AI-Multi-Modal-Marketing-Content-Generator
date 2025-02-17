import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "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")
UPLOAD_FOLDER = "backend/uploads"
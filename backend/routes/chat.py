from flask import Blueprint, request, jsonify
import os
import uuid
from backend.services.image_processing import get_marketing_content
from backend.services.chat_service import generate_response
from backend.utils.config import UPLOAD_FOLDER

# Create Flask Blueprint
chat_bp = Blueprint("chat", __name__)

@chat_bp.route("/upload_image", methods=["POST"])
def upload_image():
    """Handles image upload and generates initial marketing content."""
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image = request.files["image"]
    user_id = str(uuid.uuid4())  # Generate unique session ID
    image_path = os.path.join(UPLOAD_FOLDER, f"{user_id}.jpg")
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    image.save(image_path)

    content = get_marketing_content(image_path, user_id)

    return jsonify({"user_id": user_id, "marketing_content": content})

@chat_bp.route("/chat", methods=["POST"])
def chat():
    """Handles user chat prompts based on previously uploaded image details."""
    data = request.json
    user_id = data.get("user_id")
    user_prompt = data.get("prompt")

    if not user_id or not user_prompt:
        return jsonify({"error": "Missing user_id or prompt"}), 400

    response = generate_response(user_id, user_prompt)

    return jsonify({"response": response})

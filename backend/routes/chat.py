import uuid
import base64
from flask import Blueprint, request, jsonify
from backend.utils.config import chat_collection
from backend.services.chat_service import get_marketing_content, generate_response

chat_bp = Blueprint("chat", __name__)

def encode_image(image):
    """Convert image file to Base64 string."""
    return base64.b64encode(image.read()).decode("utf-8")

@chat_bp.route("/upload_image", methods=["POST"])
def upload_image():
    """Handles image upload and stores Base64-encoded data in MongoDB."""
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image = request.files["image"]
    user_id = str(uuid.uuid4())  # Generate unique session ID
    base64_image = encode_image(image)  # Convert image to Base64

    # Generate marketing content using Base64 image
    content = get_marketing_content(base64_image, user_id)

    # Store session details in MongoDB
    chat_collection.update_one(
        {"user_id": user_id},
        {"$set": {"user_id": user_id, "image_base64": base64_image, "image_details": content, "chat": [{"role": "system", "content": content}]}},
        upsert=True
    )

    return jsonify({"user_id": user_id, "message": "Image uploaded successfully", "marketing_content": content})

@chat_bp.route("/chat", methods=["POST"])
def chat():
    """Handles user chat prompts based on stored session data."""
    data = request.json
    user_id = data.get("user_id")
    user_prompt = data.get("prompt")

    if not user_id or not user_prompt:
        return jsonify({"error": "Missing user_id or prompt"}), 400

    response = generate_response(user_id, user_prompt)

    return jsonify({"response": response})


@chat_bp.route("/get_chat/<user_id>", methods=["GET"])
def get_chat(user_id):
    """Retrieve chat history for a specific user."""
    user_chat = chat_collection.find_one({"user_id": user_id}, {"_id": 0, "chat": 1, "image_base64": 1})

    if not user_chat or "chat" not in user_chat:
        return jsonify({"error": "No chat history found for this user"}), 404

    return jsonify({"user_id": user_id, "chat": user_chat["chat"], "image_base64": user_chat.get("image_base64")})


@chat_bp.route("/get_all_chats", methods=["GET"])
def get_all_chats():
    """Retrieve all user chat histories."""
    all_chats = list(chat_collection.find({}, {"_id": 0, "user_id": 1, "chat": 1, "image_base64": 1}))

    if not all_chats:
        return jsonify({"error": "No chats found"}), 404

    return jsonify({"chats": all_chats})


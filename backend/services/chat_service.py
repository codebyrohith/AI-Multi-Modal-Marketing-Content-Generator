from groq import Groq
from backend.utils.config import GROQ_API_KEY
from backend.services.image_processing import chat_history

# Initialize Groq Client
client = Groq(api_key=GROQ_API_KEY)

def generate_response(user_id, user_prompt):
    """Generate responses based on user's prompt & previous image details."""
    if user_id not in chat_history:
        return "Error: No image uploaded. Please upload an image first."

    # Retrieve previous context (image details)
    previous_content = chat_history[user_id]["image_details"]

    # Add user prompt to chat history
    chat_history[user_id]["chat"].append({"user": user_prompt})

    completion = client.chat.completions.create(
        model="llama-3.2-11b-vision-preview",
        messages=[
            {"role": "system", "content": "You are an AI marketing assistant that generates compelling product descriptions and marketing content."},
            {"role": "user", "content": f"Previous Image Details: {previous_content}"},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.9,
        max_completion_tokens=512,
        top_p=0.95,
        stream=False
    )

    if completion and completion.choices:
        response = completion.choices[0].message.content
        chat_history[user_id]["chat"].append({"assistant": response})
        return response

    return "Error: Unable to generate a response."

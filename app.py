from flask import Flask
from backend.routes.generate_text import text_generation_bp

app = Flask(__name__)

# Register Blueprints
app.register_blueprint(text_generation_bp, url_prefix="/api")

if __name__ == "__main__":
    app.run(debug=True)

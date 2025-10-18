from flask import Flask
from flask_cors import CORS
from routes.auth_routes import auth_bp
from routes.issue_routes import issue_bp
from utils.db_config import db

app = Flask(__name__)
CORS(app)

# Configurations
app.config['SECRET_KEY'] = 'hackathon_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['UPLOAD_FOLDER'] = 'static/uploads'

# Initialize Database
db.init_app(app)

# Register Routes
app.register_blueprint(auth_bp, url_prefix="/api")
app.register_blueprint(issue_bp, url_prefix="/api")

# Create tables
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)

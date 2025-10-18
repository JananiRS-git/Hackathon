# backend/routes/issue_routes.py
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
import os
from utils.db_config import db
from models.models import Issue

issue_bp = Blueprint("issue_bp", __name__)

@issue_bp.route("/report", methods=["POST"])
def report_issue():
    user_id = request.form.get("user_id")
    title = request.form.get("title")
    description = request.form.get("description")
    latitude = request.form.get("latitude")
    longitude = request.form.get("longitude")
    image = request.files.get("image")

    image_filename = None
    if image:
        filename = secure_filename(image.filename)
        image_path = os.path.join(current_app.config["UPLOAD_FOLDER"], filename)
        image.save(image_path)
        image_filename = filename

    new_issue = Issue(
        user_id=user_id,
        title=title,
        description=description,
        latitude=latitude,
        longitude=longitude,
        image=image_filename
    )
    db.session.add(new_issue)
    db.session.commit()

    return jsonify({"message": "Issue reported successfully"}), 201


@issue_bp.route("/issues", methods=["GET"])
def get_issues():
    issues = Issue.query.all()
    output = []
    for issue in issues:
        output.append({
            "id": issue.id,
            "title": issue.title,
            "description": issue.description,
            "image": issue.image,
            "latitude": issue.latitude,
            "longitude": issue.longitude,
            "status": issue.status,
            "date_reported": issue.date_reported,
            "user": issue.user.name
        })
    return jsonify(output)


@issue_bp.route("/issues/<int:id>", methods=["PUT"])
def update_issue(id):
    issue = Issue.query.get_or_404(id)
    data = request.get_json()
    issue.status = data.get("status", issue.status)
    db.session.commit()
    return jsonify({"message": "Status updated successfully"})

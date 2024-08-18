from flask import request, jsonify, abort
from app import app, db
from models import Issue

@app.route('/')
def index():
    return 'Welcome to the Flask App!'

@app.route('/issues', methods=['POST'])
def create_issue():
    data = request.json
    if not data or not data.get('title') or not data.get('body'):
        abort(400, description="Missing title or body")
    issue = Issue(
        title=data['title'],
        body=data['body'],
        owner=data['owner'],
        repo=data['repo']
    )
    db.session.add(issue)
    db.session.commit()
    return jsonify({'status': 'Issue created', 'issue': issue.to_dict()}), 201

@app.route('/issues', methods=['GET'])
def get_issues():
    owner = request.args.get('owner')
    repo = request.args.get('repo')
    issues = Issue.query.filter_by(owner=owner, repo=repo).all()
    return jsonify([issue.to_dict() for issue in issues])

@app.route('/issues/<int:id>', methods=['PUT'])
def update_issue(id):
    data = request.json
    issue = Issue.query.get_or_404(id)
    if 'title' in data:
        issue.title = data['title']
    if 'body' in data:
        issue.body = data['body']
    db.session.commit()
    return jsonify({'status': 'Issue updated', 'issue': issue.to_dict()})

@app.route('/issues/<int:id>', methods=['DELETE'])
def delete_issue(id):
    issue = Issue.query.get_or_404(id)
    db.session.delete(issue)
    db.session.commit()
    return jsonify({'status': 'Issue deleted'})

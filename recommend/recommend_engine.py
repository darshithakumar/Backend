# recommend/recommend_engine.py

from flask import Flask, request, jsonify
import pandas as pd
from collections import Counter
from sklearn.feature_extraction.text import TfidfVectorizer

app = Flask(__name__)

# --- Sample In-memory Courses ---
# In real use, query this from your DB at startup, or on demand
courses = [
    {
        'id': 1,
        'title': 'Intro to Python',
        'description': 'Python basics, programming, syntax, data structures',
        'tags': 'python,programming,basics',
        'url': 'https://python.org'
    },
    {
        'id': 2,
        'title': 'OOP with Java',
        'description': 'Java fundamentals, OOP concepts, inheritance, polymorphism',
        'tags': 'java,oop,inheritance,polymorphism',
        'url': 'https://geeksforgeeks.com'
    },
    {
        'id': 3,
        'title': 'Web Development Bootcamp',
        'description': 'HTML, CSS, JavaScript, frontend, web basics',
        'tags': 'web,html,css,javascript',
        'url': 'https://w3schools.com'
    }
    # (add more as you like)
]

# Helper: concatenate all text fields of a course into one string
def course_to_text(course):
    return f"{course['title']} {course['description']} {course['tags']}"

@app.route("/recommend", methods=["POST"])
def recommend():
    """
    Expects JSON:
    {
      "browsing_history": [
         {"keyword": "python", "count": 10},
         {"keyword": "oop", "count": 5},
         {"keyword": "web", "count": 3}
      ]
    }
    Returns: Top-N recommended courses by score (frequency match)
    """
    data = request.get_json()
    browsing_history = data["browsing_history"]
    # Build user profile: keyword -> score
    freq = Counter()
    for entry in browsing_history:
        freq[entry["keyword"].lower()] += entry["count"]
    # Score each course based on # of keyword hits, weighted by frequency
    scored_courses = []
    for c in courses:
        score = 0
        text = course_to_text(c).lower()
        for kw, weight in freq.items():
            if kw in text:
                # Count #occurrences of kw in text * its browsing weight
                occurrences = text.count(kw)
                score += occurrences * weight
        scored_courses.append( (score, c) )
    # Sort courses by score descending
    results = sorted(scored_courses, reverse=True, key=lambda x: x[0])
    return jsonify({
        "recommendations": [c for s, c in results if s > 0][:5]
    })

if __name__ == "__main__":
    app.run(port=5002, debug=True)

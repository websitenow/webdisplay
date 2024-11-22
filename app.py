from flask import Flask, render_template, jsonify
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
CORS(app)

@app.route('/')
def home():
    return render_template('index.html')
    
if __name__ == '__main__':
    app.run(host="0.0.0.0")

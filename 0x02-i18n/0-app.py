#!/usr/bin/env python3
'''basic flask app'''


from flask import Flask, render_template
from flask.typing import ResponseReturnValue

app: Flask = Flask(__name__)


@app.route('/')
def home() -> ResponseReturnValue:
    '''return an index page'''
    return render_template('templates/0-index.html')


if __name__ == "__main__":
    app.run(debug=True)

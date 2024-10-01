#!/usr/bin/env python3
'''basic flask app'''


from flask import Flask, render_template
from flask_babel import Babel

app: Flask = Flask(__name__)
app.config['BABEL_DEFAULT_LOCALE'] = 'en'
app.config['BABEL_DEFAULT_TIMEZONE'] = 'UTC'
babel = Babel(app)


class Config:
    '''class to configure languages and timezone'''
    LANGUAGES = ["en", "fr"]


#  app.config.from_object(Config)


@app.route('/')
def home():
    '''return an index page'''
    return render_template('/1-index.html')


if __name__ == "__main__":
    app.run(debug=True)

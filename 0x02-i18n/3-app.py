#!/usr/bin/env python3
'''basic flask app'''


from flask import Flask, render_template, g, request
from flask_babel import Babel, gettext as _

app = Flask(__name__)


class Config:
    '''class to configure languages and timezone'''
    LANGUAGES = ["en", "fr"]

    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app.config.from_object(Config)
babel = Babel(app)


@babel.localeselector
def get_locale():
    '''get_locale function to determine best match with supported languages'''
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def home():
    '''return an index page'''
    home_title = _('home_title')
    home_header = _('home_header')
    return render_template('3-index.html',
                           home_title=home_title, home_header=home_header)


if __name__ == "__main__":
    app.run(debug=True)

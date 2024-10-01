#!/usr/bin/env python3
'''basic flask app'''


from flask import Flask, render_template, g, request
from flask_babel import Babel

app = Flask(__name__)
#  app.config['BABEL_DEFAULT_LOCALE'] = 'en'
#  app.config['BABEL_DEFAULT_TIMEZONE'] = 'UTC'
#  babel = Babel(app)


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
    #user = getattr(g, 'user', None)
    #if user is Not None:
    #    return user.locale
    return request.accept_languages.best_match(['en', 'fr'])


@app.route('/')
def home():
    '''return an index page'''
    return render_template('1-index.html')


if __name__ == "__main__":
    app.run(debug=True)

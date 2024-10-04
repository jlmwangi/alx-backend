#!/usr/bin/env python3
'''basic flask app'''


from flask import Flask, render_template, g, request
from flask_babel import Babel, gettext as _
from pytz import timezone as tz, UnknownTimeZoneError

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
    locale = request.args.get('locale')  # check if locale in query parameters
    if locale and locale in app.config['LANGUAGES']:  # validate locale
        return locale

    best_match_locale = request.accept_languages.\
        best_match(app.config['LANGUAGES'])
    if best_match_locale:
        return best_match_locale

    return DEFAULT_LOCALE


DEFAULT_TIMEZONE = 'UTC'
@babel.timezoneselector
def get_timezone():
    '''get the users timezone'''
    timezone_name = request.args.get('timezone')
    if timezone_name:
        try:
            tzone = tz(timezone_name)
            return tzone
        except UnknownTimeZoneError:
            return DEFAULT_TIMEZONE

    return DEFAULT_TIMEZONE


@app.route('/')
def home():
    '''return an index page'''
    home_title = _('home_title')
    home_header = _('home_header')
    user = get_user()
    logged_in_as = _('You are logged in as %(username)s.')\
        % {'username': user.get('name')}
    not_logged_in = _('not_logged_in')
    return render_template('5-index.html',
                           home_title=home_title, home_header=home_header,
                           logged_in_as=logged_in_as,
                           not_logged_in=not_logged_in, user=user)


users = {
        1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
        2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
        3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
        4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user() -> dict:
    '''returns user dict or none if id cant be found or login_as not passed'''
    login_as = request.args.get('login_as')

    '''check if login_as is provided and is a digit'''
    if login_as and login_as.isdigit():
        user_id = int(login_as)
        user = users.get(user_id)  # retrieve user based on id

        if user:
            return user

    return None


@app.before_request
def before_request():
    '''use getuser and set a user as global if any is found'''
    user = get_user()  # retriev user
    if user:
        g.user = user  # set user as global


if __name__ == "__main__":
    app.run(debug=True)

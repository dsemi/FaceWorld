#!/usr/bin/env python2

import os
from textblob import TextBlob
from flask import Flask, request, send_file

application = Flask(__name__)

@application.route('/')
def root():
    return application.send_static_file('index.html')

@application.route('/sentiment', methods=['GET', 'POST'])
def sent():
    text = request.args.get('message')
    blob = TextBlob(text)
    if blob.sentiment.polarity > 0.25:
        img = 'static/img/happy-face.jpg'
    elif blob.sentiment.polarity > -0.25:
        img = 'static/img/indifferent.jpg'
    else:
        img = 'static/img/sad.jpg'
    return send_file(img, mimetype='image/jpeg')
    
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    if port == 5000:
        application.debug = True
    application.run(host='0.0.0.0', port=port)

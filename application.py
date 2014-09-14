#!/usr/bin/env python2

import os
import requests
from textblob import TextBlob
from flask import Flask, request, send_file, jsonify

application = Flask(__name__)

API_URL = 'https://graph.facebook.com/v2.1'

@application.route('/')
def root():
    return application.send_static_file('index.html')

@application.route('/sentiment', methods=['GET', 'POST'])
def sent():
    if request.method == 'GET':
        text = request.args.get('message')
    else:
        text = request.form.get('message')
    blob = TextBlob(text)
    if blob.sentiment.polarity > 0.25:
        img = 'static/img/happy-face.jpg'
    elif blob.sentiment.polarity > -0.25:
        img = 'static/img/indifferent.jpg'
    else:
        img = 'static/img/sad.jpg'
    return send_file(img, mimetype='image/jpeg')

@application.route('/fb/friends', methods=['POST'])
def fbfriends():  
    access_token = request.form.get('token')

    if not access_token:
        return jsonify(message='Token required for Facebook authentication')

    user_id = request.form.get('userId')
    
    if not user_id:
        return jsonify(message='User ID is required for Facebook authentication')
        
    url = '{}/{}/friends?access_token={}'.format(API_URL, user_id, access_token)
    resp = requests.get(url).json()
    friends = resp['data']
    url = resp['paging'].get('next')
    while url:
        resp = requests.get(url).json()
        friends.extend(resp['data'])
        url = resp['paging'].get('next')

    return jsonify(friends=friends)
    
  
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    if port == 5000:
        application.debug = True
    application.run(host='0.0.0.0', port=port)

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
    data = request.get_json()
    access_token = data.get('token')

    if not access_token:
        return jsonify(message='Token required for Facebook authentication')

    user_id = data.get('userId')
    
    if not user_id:
        return jsonify(message='User ID is required for Facebook authentication')
        
    url = '{}/{}/friends?access_token={}'.format(API_URL, user_id, access_token)
    try:
        resp = requests.get(url).json()
    except:
        return jsonify(message="Error with request to Facebook")
    friends = resp['data']
    page = resp.get('paging')
    1url = page.get('next') if page else None
    while url:
        try:
            resp = requests.get(url).json()
        except:
            return jsonify(message="Error with request to Facebook")
        friends.extend(resp['data'])
        page = resp.get('paging')
        url = page.get('next') if page else None

    return jsonify(friends=friends)
    
  
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    if port == 5000:
        application.debug = True
    application.run(host='0.0.0.0', port=port)

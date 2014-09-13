#!/usr/bin/env python2

import os
from flask import Flask

application = Flask(__name__)

@application.route('/')
def root():
    return application.send_static_file('index.html')

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    if port == 5000:
        application.debug = True
    application.run(host='0.0.0.0', port=port)

#!/usr/bin/env python2

import os
from flask import Flask

app = Flask(__name__)

@app.route('/')
def root():
    return app.send_static_file('index.html')

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    if port == 5000:
        app.debug = True
    app.run(host='0.0.0.0', port=port)

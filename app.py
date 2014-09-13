#!/usr/bin/env python3

'''

Usage: app.py [--debug] [-p <port>] [-H <host>]

Options:
  -p, --port=<port>   The port number on which to run Flask [default: 5000]
  -H, --host=<host>   The host to listen to [default: 127.0.0.1]
  --debug             Flag to determine debug mode [default: False]

'''

from flask import Flask
from docopt import docopt
from schema import Use, Schema

app = Flask(__name__)

@app.route('/')
def root():
    return 'Hello World'

if __name__ == '__main__':
    args = Schema({'--host': Use(str), '--port': Use(int), '--debug': Use(bool)}).validate(docopt(__doc__))
    app.run(host=args['--host'], port=args['--port'], debug=args['--debug'])

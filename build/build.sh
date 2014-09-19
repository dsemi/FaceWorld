#!/bin/bash

OUT="../bin"

# Compile all less into CSS
# mkdir -p $OUT/static/styles
# ./lessc/bin/lessc -x ../static/styles/main.less $OUT/static/styles/main.css

node frontEndBuild.js $OUT
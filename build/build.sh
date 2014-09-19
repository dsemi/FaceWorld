#!/bin/bash

OUT="../bin"

echo Compiling LESS and JS
node frontEndBuild.js $OUT
echo Copying HTML
cp ../static/index.html $OUT/static
echo Copying resources
cp -r ../static/res $OUT/static
echo Copying thirdparty libraries
cp -r ../static/thirdparty $OUT/static

echo Build complete!

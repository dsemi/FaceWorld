#!/bin/bash

OUT="../bin"

echo Installing dependencies
npm install

echo Compiling LESS and JS
node frontEndBuild.js $OUT || nodejs frontEndBuild.js $OUT
echo Copying HTML
cp ../static/index.html $OUT/static
echo Copying resources
cp -r ../static/res $OUT/static
echo Copying thirdparty libraries
cp -r ../static/thirdparty $OUT/static

echo Build complete!

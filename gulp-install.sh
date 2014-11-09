#!/bin/bash

#echo -n "Installing gulp"

sudo npm install -g gulp
sudo npm install --save-dev gulp
npm install karma --save-dev
npm install -g karma-cli

echo -n "Installing packages"

sudo npm install gulp-jshint gulp-concat gulp-uglify gulp-header gulp-wrapper gulp-karma karma karma-jasmine karma-chrome-launcher karma-phantomjs-launcher --save-dev

echo -n "Installation finished"

if [ $? -ne 0 ]; then
	exit 1
fi
	echo "OK"
 

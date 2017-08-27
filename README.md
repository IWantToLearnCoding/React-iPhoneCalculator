# React-iPhoneCalculator
iPhone calculator in reactJS.

# Browserify
browserify.transform.babelify - This is required when we use browserify for requiring in modules in app.js

browserify.transform.browserify-css - This is for import(css file) in the code. Otherwise CSS will fail. OR we can include that in the index.html

Very nice write-up on browserify
https://scotch.io/tutorials/getting-started-with-browserify


# Babel
Awesome write-up on babel.config
https://kleopetrov.me/2016/03/18/everything-about-babel/

# Command to build
npm install
browserify ./src/app.js -o ./src/app.bundle.js

with watchify
watchify ./src/app.js -o ./src/app.bundle.js -v


# Notes
Refer notes about this repo in file notes.txt.

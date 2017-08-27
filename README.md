# React-iPhoneCalculator
iPhone calculator in reactJS.

#browserify
browserify.transform.babelify - This is required when we use browserify for requiring in modules in app.js

browserify.transform.browserify-css - This is for import(css file) in the code. Otherwise CSS will fail. OR we can include that in the index.html

# Command to build
npm install
browserify ./src/app.js -o ./src/app.bundle.js 

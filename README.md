# PROJECT TITLE
GitHub UserLockup

## GETTING STARTED
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## PREREQUISITES
* Create an asset pipeline using Gulp
* Manage build dependencies with npm
* Manage front-end dependencies with Bower
* Make requests to a back-end server using AJAX
* Use SASS for improved styling of your pages
* Parse JSON responses to AJAX requests

## DEPLOYMENT  
Development Servers
To this end, we're going to start using a local server for development, and we want our build pipeline to update the correct files on the server and reload the browser if necessary when the files have been changed during development.

BrowserSync
We're going to use a package called BrowserSync to implement our development server with live reloading. First, let's download it with NPM as always:

$ npm install browser-sync --save-dev
Next, let's remember to require it in our gulpfile.

gulpfile.js
var browserSync = require('browser-sync').create();
Gulp Tasks
We have created a variable, browserSync, and set it equal to the create function, which is the part of the browser-sync package we will use to create our server. Now, make a task to start that server.

gulpfile.js
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });
});
We are calling browserSync.init() and passing in some options telling browserSync to launch the local server from the directory that we are currently in (baseDir: "./",) and we are telling it that the entry point, the place where we want to start our app, is our index.html file. Now we can run gulp serve from the top level of our project directory to launch our server and run the app.

Live Reloading with BrowserSync and Gulp
Now we're going to learn how to automatically replace the files on the server and reload the browser when our JavaScript changes. To do this, we will use a new gulp method called watch. When we call gulp.watch() we pass in 2 arguments. The first is an array of file names that we want gulp to keep an eye on. The second argument is an array of tasks to run whenever any of the aforementioned files change. We'll add a call to gulp.watch inside of our serve task so that the files are being watched automatically as soon as we start the server.

gulpfile.js
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });

  gulp.watch(['js/*.js'], ['jsBuild']);
});
This says to watch all of the files inside of our development js folder and whenever one of the files changes, run the task jsBuild. Let's make that task next:

gulpfile.js
gulp.task('jsBuild', ['jsBrowserify', 'jshint'], function(){
  browserSync.reload();
});
This task lists an array of dependency tasks that need to be run whenever any of the js files change. We want to run the linter and we want to run jsBrowserify and its dependencies. The linter can be run at the same time as we concatenate and browserify our files since they are independent from each other. Then once those are complete, we use the task function to call browserSync.reload() and reload the browser.

Incidentally, we could have called minifyScripts here instead of jsBrowserify, but since we are working on a tasks for the local development server here, we can assume a development environment and ignore the production build tasks.

Let's add a watcher for our Bower dependencies next. This line will also go at the bottom of our serve task.

gulpfile.js
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });

  gulp.watch(['js/*.js'], ['jsBuild']);
  gulp.watch(['bower.json'], ['bowerBuild']);

});
Now, we are watching the Bower manifest file for changes so that whenever we install or uninstall a frontend dependency our vendor files will be rebuilt and the browser reloaded with the bowerBuild task. Let's write that task next.

gulpfile.js
gulp.task('bowerBuild', ['bower'], function(){
  browserSync.reload();
});

## BUILT WITH  
* BOOTSRAP
* JQUERY
* HTML  
* CSS
* JAVASCRIPT

## AUTHORS
Neville Oronni

## CONTACT
[nevooronni@gmail.com](nevooronni@gmail.com)

## LICENCE
Licenced under a *Mit* licence

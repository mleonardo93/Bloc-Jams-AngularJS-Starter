# Bloc Jams AngularJS

AngularJS-based music player site. 

## User stories  
* As a developer, I want to bootstrap Angular to my application.  
I added my `ng-app` in `index.html` to bootstrap AngularJS to my web app.

* As a developer, I want to configure routing and states for my application.
I used templates for different views in an AngularJS application and used UI-Router to serve templates. I also used `$locationProvider` and `$stateProvider` to configure paths and states in `app.js`.

* As a developer, I want to implement controllers for my application's views.  
I have controllers for the landing page (`LandingCtrl.js`), album view (`AlbumCtrl.js`), and collection view (`CollectionCtrl.js`), as well as for the player bar (`PlayerBarCtrl.js`). 

* As a developer, I want to create a service that handles song playback. 
The `SongPlayer` service handles song playback through Buzz.

* As a developer, I want to write a directive that controls song and volume sliders.  
The `SeekBar.js` directive manages this with a little bit of jQuery help.

* As a developer, I want to add a time code filter to display time properly. 
The `timecode` filter takes a raw number of seconds and converts it to a format of MM:SS using Buzz's `toTimer()` method. Commented out is the previous implementation of the same functionality. 

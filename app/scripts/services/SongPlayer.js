(function() {
     function SongPlayer($rootScope, Fixtures) {
          /**
          * @desc SongPlayer object (instance of Buzz-powered SongPlayer)
          * @type {Object}
          */

          var SongPlayer = {};

          /**
          * @desc Current object (song) handled by Buzz
          * @type {Object}
          */

          var currentBuzzObject = null;

          /**
          * @desc Current album, from Fixtures.js
          * @type {Object}
          */

          var currentAlbum = Fixtures.getAlbum();

          /**
          * @function getSongIndex
          * @desc Finds index of selected song in songs array of currentAlbum
          * @param {Object} song
          */

          var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
          };

          /**
          * @function setSong
          * @desc Stops currently playing song and loads new audio file as currentBuzzObject
          * @param {Object} song
          */

          var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong(song);
            }

            /**
           * @desc Buzz object audio file
           * @type {Object}
           */

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentBuzzObject.bind("timeupdate", function() {
              $rootScope.$apply(function() {
                SongPlayer.currentTime = Math.floor(currentBuzzObject.getTime());
              })
            })

            SongPlayer.currentSong = song;
            song.playing = true;
          };

          /**
          * @function playSong
          * @desc Plays currentBuzzObject
          * @param {Object} song
          */

          var playSong = function(song) {
            currentBuzzObject.play();
          };

          /**
          * @function stopSong
          * @desc Stops current Buzz object, sets song playing attribute to 'null'
          * @param {Object} song
          */

          var stopSong = function(song) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = false;
          }

          /**
          * @function play
          * @desc Selects and plays user-chosen song, setting song playing attribute to 'true'
          * @param {Object} song
          */

          SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
              if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
                SongPlayer.currentSong.playing = true;
              } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                  playSong(song);
                  SongPlayer.currentSong.playing = true;
                }
              }
          };

          /**
          * @function pause
          * @desc Method to pause currently playing song and set playing attribute to 'false'
          * @param {Object} song
          */

          SongPlayer.pause = function(song) {
              song = song || SongPlayer.currentSong;
              currentBuzzObject.pause();
              SongPlayer.currentSong.playing = false;
          };

          /**
          * @function previous
          * @desc Method to change to previous song in album
          * @param {Object} song
          */

          SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            console.log("previous clicked!")

            if (currentSongIndex < 0) {
              stopSong();
            } else {
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
            }
          };

          /**
          * @function next
          * @desc Method to change to next song in album
          * @param {Object} song
          */

          SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            console.log("next clicked!")

            if (currentSongIndex == currentAlbum.songs.length) {
              stopSong();
            } else {
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
            }
          };

          /**
          * @function setCurrentTime
          * @desc Set current time (in seconds) of currently playing song
          * @param {Number} time
          */
          SongPlayer.setCurrentTime = function(time) {
            if(currentBuzzObject) {
              currentBuzzObject.setTime(time);
            }
          };

          /**
          * @function setVolume
          * @desc Set volume of currently playing song
          * @param {Number} volume
          */

          SongPlayer.setVolume = function(value) {
            if(currentBuzzObject) {
              currentBuzzObject.setVolume(value);
              SongPlayer.volume = value
            }
          }

          /**
          * @desc Current volume
          * @type {number}
          */

          SongPlayer.volume = 50;

          /**
          * @desc Active song object (from list of songs)
          * @type {Object}
          */

          SongPlayer.currentSong = null;

          /**
          * @desc Current playback time (in seconds) of currently playing song
          * @type {number}
          */

          SongPlayer.currentTime = null;



          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', ["$rootScope", "Fixtures", SongPlayer]);
 })();

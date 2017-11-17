(function() {
     function SongPlayer() {
          var SongPlayer = {};

          var currentSong = null;
          var currentBuzzObject = null;

          /**
          * @function setSong
          * @desc Stops currently playing song and loads new audio file as currentBuzzObject
          * @param {Object} song
          */

          var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }

            /**
           * @desc Buzz object audio file
           * @type {Object}
           */
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
          };

          /**
          * @function playSong
          * @desc Calls setSong and plays currrentBuzzObject
          * @param {Object} song
          */

          var playSong = function(song) {
            setSong(song);
            currentBuzzObject.play();
            song.playing = true;
          };

          /**
          * @function play
          * @desc Public access for private functions
          * @param {Object} song
          */

          SongPlayer.play = function(song) {
            playSong(song);
          }

            SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
          };

          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();

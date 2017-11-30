(function() {
  /**
  * @function seekBar
  * @desc Generates seek bar and position, with listener for click event
  * @param none
  */
    function seekBar($document) {
      /**
      * @function calculatePercent
      * @desc Calculates percentage from offset divided by width
      * @param {directive}, event
      */
      var calculatePercent = function(seekBar, event) {
         var offsetX = event.pageX - seekBar.offset().left;
         var seekBarWidth = seekBar.width();
         var offsetXPercent = offsetX / seekBarWidth;
         offsetXPercent = Math.max(0, offsetXPercent);
         offsetXPercent = Math.min(1, offsetXPercent);
         return offsetXPercent;
      };

      return {
          templateUrl: '/templates/directives/seek_bar.html',
          replace: true,
          restrict: 'E',
          scope: {
            onChange: "&"
          },
          link: function(scope, element, attributes) {
            scope.value = 0;
            scope.max = 100;

            var seekBar = $(element);

            attributes.$observe("value", function(newValue) {
              scope.value = newValue;
            });

            attributes.$observe("max", function(newValue) {
              scope.max = newValue;
            });

            /**
            * @function percentString
            * @desc Returns percent (value divided by maximum, times 100) as string
            * @param none
            */
            var percentString = function () {
                var value = scope.value;
                var max = scope.max;
                var percent = value / max * 100;
                return percent + "%";
            };
            /**
            * @function fillStyle
            * @desc returns object attribute 'width' with the value of percentString
            * @param percentString function
            */
            scope.fillStyle = function() {
                return {"width": percentString()};
            };
            /**
            * @function onClickSeekBar
            * @desc Calls calculatePercent and sets scope.value to percent times scope.max
            * @param DOM event
            */
            scope.onClickSeekBar = function(event) {
                var percent = calculatePercent(seekBar, event);
                scope.value = percent * scope.max;
                notifyOnChange(scope.value);
            };
            /**
            * @function trackThumb
            * @desc moves seek bar thumb
            * @param none
            */
            scope.trackThumb = function() {
               $document.bind('mousemove.thumb', function(event) {
                   var percent = calculatePercent(seekBar, event);
                   scope.$apply(function() {
                       scope.value = percent * scope.max;
                       notifyOnChange(scope.value);
                   });
               });

               $document.bind('mouseup.thumb', function() {
                   $document.unbind('mousemove.thumb');
                   $document.unbind('mouseup.thumb');
               });
            };

            /**
            * @function notifyOnChange
            * @desc If a fn is passed, inserts newValue var as arg to SongPlayer.setCurrentTime() fn
            * @param {Function} newValue
            */

            var notifyOnChange = function(newValue) {
              if (typeof scope.onChange === "function") {
                scope.onChange({value: newValue});
              }
            };

            /**
            * @function thumbStyle
            * @desc Sets thumb position in CSS to percent of song completed
            * @param none
            */

            scope.thumbStyle = function() {
                return {"left": percentString()};

            };
          }
      };
    }

    angular
        .module('blocJams')
        .directive('seekBar', ["$document", seekBar]);
})();

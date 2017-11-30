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
          scope: { },
          link: function(scope, element, attributes) {
            scope.value = 0;
            scope.max = 100;

            var seekBar = $(element);

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
                   });
               });

               $document.bind('mouseup.thumb', function() {
                   $document.unbind('mousemove.thumb');
                   $document.unbind('mouseup.thumb');
               });
            };

            scope.thumbStyle = function() {
              var value = scope.value;
              var max = scope.max;
              var percent = (value / max) * 100;
              scope.$watch("percentString()", function(oldVal, newVal){
                if(oldVal !== newVal){
                  return {"left": percent};
                } else {
                  return;
                }
              });
            };
          }
      };
    }

    angular
        .module('blocJams')
        .directive('seekBar', ["$document", seekBar]);
})();

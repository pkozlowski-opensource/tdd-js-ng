angular.module('ngApp', [])

  .directive('stopwatch', function ($interval) {
    return function (scope, element, attrs) {

      var totalSecs = parseInt(attrs.stopwatch || 30) * 60;
      var intervalPromise;

      function pad(num) {
        var s = "000000000" + num;
        return s.substr(s.length - 2);
      }

      function formatRemainingTime(seconds) {
        //TODO: turn red 5 minutes before
        //TODO: turn red and blink 5 minutes before
        element.text("00:" + pad(Math.floor(seconds / 60)) + ":" + pad(seconds % 60));
        if (seconds < 5*60) {
          element.css({
            color: 'rgb(255, 0, 0)'
          });
        }
      }

      function countDown(secs) {
        return $interval(function () {
          formatRemainingTime(--secs);
        }, 1000, secs);
      }

      formatRemainingTime(totalSecs);

      element.on('click', function () {
        intervalPromise ? $interval.cancel(intervalPromise) : angular.noop();
        intervalPromise = countDown(totalSecs);
      });
    }
  });

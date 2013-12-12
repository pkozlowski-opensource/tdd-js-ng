angular.module('timeoutNotify', [])

  .controller('TimeBoundController', function ($scope, $timeout) {

    $timeout(function () {
      return 'Your time is up!';
    }, 20*60*1000).then(function (msg) {
        $scope.msg = msg;
      });

    // other methods here
  });
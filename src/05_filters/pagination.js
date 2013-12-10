angular.module('pagination', [])
  .filter('pagination', function () {
    return function (inputArray, selectedPage, pageSize) {
      //ex:start
      // filtering code goes here
      var start = selectedPage * pageSize;
      return inputArray.slice(start, start + pageSize);
      //ex:end
    };
  });

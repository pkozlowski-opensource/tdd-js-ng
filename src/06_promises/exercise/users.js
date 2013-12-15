angular.module('usersAsync', [])

  .controller('UsersCtrl', function ($scope, UserStorage) {

    $scope.cleanUser = {};

    function refreshUsersList() {
      UserStorage.getAll().then(function (users) {
        $scope.users = users;
      });
    }

    $scope.save = function () {
    };

    $scope.remove = function (userId) {
    };

    $scope.edit = function (user) {
      $scope.cleanUser = angular.copy(user);
      $scope.clear();
    };

    $scope.hasEdits = function () {
      return !angular.equals($scope.user, $scope.cleanUser);
    };

    $scope.clear = function () {
      $scope.user = angular.copy($scope.cleanUser);
    };

    $scope.clear();
    refreshUsersList();

  });

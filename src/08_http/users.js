angular.module('usersHttp', [])

  .controller('UsersCtrl', function ($scope, UserStorage) {

    $scope.cleanUser = {};

    function refreshUsersList() {
      UserStorage.getAll().then(function (users) {
        $scope.users = users;
      });
    }

    $scope.save = function () {
      UserStorage.save($scope.user).then(function () {
        $scope.cleanUser = {};
        $scope.clear();
        refreshUsersList();
      });
    };

    $scope.remove = function (userId) {
      UserStorage.remove(userId).then(function() {
        refreshUsersList();
      });
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

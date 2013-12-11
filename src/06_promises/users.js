angular.module('usersAsync', [])

  .controller('UsersCtrl', function ($scope, UserStorage) {

    $scope.cleanUser = {};

    function refreshUsersList() {
      UserStorage.getAll().then(function (users) {
        $scope.users = users;
      });
    }

    $scope.save = function () {
      //ex:start
      UserStorage.save($scope.user).then(function () {
        $scope.cleanUser = {};
        $scope.clear();
        refreshUsersList();
      });
      //ex:end
    };

    $scope.remove = function (userId) {
      //ex:start
      UserStorage.remove(userId).then(function() {
        refreshUsersList();
      });
      //ex:end
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

var UsersCtrl = function ($scope) {

  var userStorage = new UserStorage();

  $scope.cleanUser = {};
  $scope.users = userStorage.getAll();

  $scope.save = function () {
    userStorage.save($scope.user);
    $scope.cleanUser = {};
    $scope.clear();
    $scope.users = userStorage.getAll();
  };

  $scope.remove = function (userId) {
    userStorage.remove(userId);
    $scope.users = userStorage.getAll();
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
};
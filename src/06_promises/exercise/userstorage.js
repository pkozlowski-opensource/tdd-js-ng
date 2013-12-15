angular.module('userstorageAsync', [])

  .factory('UserStorage', function ($q) {

    var users = {};

    // Sequence can now be encapsulated (was exposed on a constructor function before)
    var sequence = 1;

    // AngularJS services are singletons
    var UserStorage = {};

    UserStorage.save = function (user) {
    };

    UserStorage.remove = function (userId) {
    };

    UserStorage.getById = function (userId) {
      //$q when wraps a value into a promise that will resolve to the passed-in value
      return $q.when(users[userId] || null);
    };

    UserStorage.getAll = function () {
    };

    return UserStorage;
  });
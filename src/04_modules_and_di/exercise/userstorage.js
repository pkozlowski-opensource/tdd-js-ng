angular.module('userstorage', [])

  .factory('UserStorage', function () {

    var users = {};

    // Sequence can now be encapsulated (was exposed on a constructor function before)
    var sequence = 1;

    // AngularJS services are singletons
    var UserStorage = {};

    return UserStorage;
  });
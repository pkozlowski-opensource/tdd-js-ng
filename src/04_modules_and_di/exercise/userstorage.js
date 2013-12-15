angular.module('userstorage', [])

  .factory('UserStorage', function () {

    var users = {};

    // Sequence can now be encapsulated (was exposed on a constructor function before)
    var sequence = 1;

    // AngularJS services are singletons
    var UserStorage = {};

    UserStorage.save = function (user) {
      if (!user.id) {
        user.id = sequence++;
      }
      users[user.id] = user;

      return user;
    };

    UserStorage.remove = function (userId) {

      // I don't need to think what `this` means here
      var toBeDeleted = UserStorage.getById(userId);
      if (toBeDeleted) {
        delete users[userId];
      }

      return toBeDeleted;
    };

    UserStorage.getById = function (userId) {
      return users[userId] || null;
    };

    UserStorage.getAll = function () {
      var result = [];
      for (var userId in users) {
        result.push(users[userId]);
      }
      return result;
    };

    return UserStorage;
  });
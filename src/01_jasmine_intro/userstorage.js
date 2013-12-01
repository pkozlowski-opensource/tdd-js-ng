var UserStorage = function() {

  var users = {};

  this.save = function(user) {
    if (!user.id) {
      user.id = UserStorage.sequence++;
    }
    users[user.id] = user;

    return user;
  };

  this.remove = function(userId) {
    var toBeDeleted = this.getById(userId);
    if (toBeDeleted) {
      delete users[userId];
    }

    return toBeDeleted;
  };

  this.getById = function(userId) {
    return users[userId] || null;
  };

  this.getAll = function() {
    var result = [];
    for (var userId in users) {
      result.push(users[userId]);
    }
    return result;
  };

};

UserStorage.sequence = 1;
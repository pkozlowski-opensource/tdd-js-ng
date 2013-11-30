var UserStorage = function() {

  var users = {};

  this.save = function(user) {
    if (!user.id) {
      user.id = UserStorage.sequence++;
    }
    users[user.id] = user;

    return user;
  };

  this.getById = function(userId) {
    return users[userId] || null;
  };

  this.remove = function(userId) {
    var toBeDeleted = this.getById(userId);
    if (toBeDeleted) {
      delete users[userId];
    }

    return toBeDeleted;
  };
};

UserStorage.sequence = 0;
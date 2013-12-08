var UserStorage = function() {

  var users = {};

  this.save = function(user) {
    //ex:start
    if (!user.id) {
      user.id = UserStorage.sequence++;
    }
    users[user.id] = user;

    return user;
    //ex:end
  };

  this.remove = function(userId) {
    //ex:start
    var toBeDeleted = this.getById(userId);
    if (toBeDeleted) {
      delete users[userId];
    }

    return toBeDeleted;
    //ex:end
  };

  this.getById = function(userId) {
    //ex:start
    return users[userId] || null;
    //ex:end
  };

  this.getAll = function() {
    //ex:start
    var result = [];
    for (var userId in users) {
      result.push(users[userId]);
    }
    return result;
    //ex:end
  };

};

UserStorage.sequence = 1;
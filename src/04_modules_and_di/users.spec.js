describe('users controller', function () {

  var $scope, $controller;
  var userStorage;

  //slide:start:module;
  beforeEach(module('users'));
  // let's load real dependencies so those are called if not mocked
  beforeEach(module('userstorage'));
  beforeEach(inject(function (_$rootScope_, _$controller_, _UserStorage_) {
    $scope = _$rootScope_;
    // now it should be more obvious why we use underscores
    $controller = _$controller_;
    userStorage = _UserStorage_;
  }));
  //slide:end

  it('should initialize scope with an empty users collection', function () {
    // ex:start
    usersCtrl = $controller('UsersCtrl', {
      '$scope': $scope
    });
    expect($scope.user).toEqual({});
    expect($scope.users.length).toEqual(0);
    //ex:end
  });

  it('should save a current user and update users list', function () {
    // ex:start
    var savedUser;

    usersCtrl = $controller('UsersCtrl', {
      '$scope': $scope,
      // ad-hoc stubbing - I can override individual dependencies
      'UserStorage' : {
        save: function(user) {
          savedUser = user;
          return savedUser;
        },
        getAll: function() {
          return [savedUser];
        }
      }
    });

    $scope.user = {name : 'foo'};

    //here we were not really testing that a user was saved in a back-end
    $scope.save();

    expect($scope.users.length).toEqual(1);
    expect($scope.user).toEqual({});
    //ex:end
  });

  it('should dirty check and allow clearing user edits', function () {
    // ex:start
    usersCtrl = $controller('UsersCtrl', {
      '$scope': $scope
    });

    $scope.user.name = 'bar';
    expect($scope.hasEdits()).toBeTruthy();

    $scope.clear();
    expect($scope.hasEdits()).toBeFalsy();
    //ex:end
  });

  it('should remove a selected user', function () {
    // ex:start
    //mocking with Jasmine spies
    spyOn(userStorage, 'remove');
    spyOn(userStorage, 'getAll').andReturn([]);

    usersCtrl = $controller('UsersCtrl', {
      '$scope': $scope
    });
    $scope.users = [{id: 1, name: 'foo'}];

    $scope.remove($scope.users[0].id);

    expect(userStorage.remove).toHaveBeenCalledWith(1);
    expect($scope.users.length).toEqual(0);
    //ex:end
  });

  it('should support editing users', function () {
    // ex:start
    usersCtrl = $controller('UsersCtrl', {
      '$scope': $scope
    });
    $scope.users = [{id: 1, name: 'foo'}];

    $scope.edit($scope.users[0]);

    expect($scope.user.name).toEqual('foo');
    //ex:end
  });

});
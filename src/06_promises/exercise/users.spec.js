describe('users controller', function () {

  var $scope, $controller, $q;
  var userStorage;

  beforeEach(module('usersAsync'));
  beforeEach(module('userstorageAsync'));
  beforeEach(inject(function (_$rootScope_, _$controller_, _$q_, _UserStorage_) {
    $scope = _$rootScope_;
    // now it should be more obvious why we use underscores
    $controller = _$controller_;
    $q = _$q_;
    userStorage = _UserStorage_;
  }));

  it('should initialize scope with an empty users collection', function () {

    // here we are testing with a real dependency => not ideal!
    usersCtrl = $controller('UsersCtrl', {
      '$scope': $scope
    });

    // resolve promises
    $scope.$digest();

    expect($scope.user).toEqual({});
    expect($scope.users.length).toEqual(0);
  });

  it('should save a current user and update users list', function () {

    var savedUser;

    usersCtrl = $controller('UsersCtrl', {
      '$scope': $scope,
      // ad-hoc stubbing - I can override individual dependencies
      'UserStorage' : {
        save: function(user) {
          savedUser = user;
          return $q.when(savedUser);
        },
        getAll: function() {
          return $q.when([savedUser]);
        }
      }
    });

    $scope.user = {name : 'foo'};

    $scope.save();
    $scope.$digest();

    expect($scope.users.length).toEqual(1);
    expect($scope.user).toEqual({});
  });

  it('should remove a selected user', function () {

    // we can use angular.noop is one way of quickly creating spies
    var userStorageMock = {
      remove: angular.noop,
      getAll: angular.noop
    };

    //spying and mocking with Jasmine spies
    spyOn(userStorageMock, 'remove').andReturn($q.when({}));
    spyOn(userStorageMock, 'getAll').andReturn($q.when([]));

    usersCtrl = $controller('UsersCtrl', {
      '$scope': $scope,
      'UserStorage': userStorageMock
    });

    $scope.remove(1);

    //resolve promises
    $scope.$digest();

    expect(userStorageMock.remove).toHaveBeenCalledWith(1);

    expect(userStorageMock.getAll).toHaveBeenCalled();
    expect(userStorageMock.getAll.callCount).toEqual(2);
  });

});
describe('users controller', function () {

  var $scope;
  var usersCtrl;

  // slide:start:ctrl;
  beforeEach(inject(function (_$rootScope_, _$controller_) {
    // ex:start
    $scope = _$rootScope_;
    usersCtrl = _$controller_('UsersCtrl', {
      '$scope': $scope
    });
    // ex:end
  }));

  it('should initialize scope with an empty users collection', function () {
    // ex:start
    expect($scope.user).toEqual({});
    expect($scope.users.length).toEqual(0);
    // ex:end
  });
  // slide:end

  it('should save a current user and update users list', function () {
    // ex:start
    $scope.user = {name : 'foo'};

    $scope.save();

    expect($scope.users.length).toEqual(1);
    expect($scope.user).toEqual({});
    // ex:end
  });

  it('should dirty check and allow clearing user edits', function () {
    // ex:start
    $scope.user.name = 'bar';
    expect($scope.hasEdits()).toBeTruthy();

    $scope.clear();
    expect($scope.hasEdits()).toBeFalsy();
    // ex:end
  });

  it('should remove a selected user', function () {
    // ex:start
    $scope.users = [{id: 1, name: 'foo'}];

    $scope.remove($scope.users[0].id);
    expect($scope.users.length).toEqual(0);
    // ex:end
  });

  it('should support editing users', function () {
    // ex:start
    $scope.users = [{id: 1, name: 'foo'}];

    $scope.edit($scope.users[0]);

    expect($scope.user.name).toEqual('foo');
    // ex:end
  });

});
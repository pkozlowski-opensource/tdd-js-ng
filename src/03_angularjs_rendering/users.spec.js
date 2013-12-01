describe('users controller', function () {

  var $scope;
  var usersCtrl;

  beforeEach(inject(function (_$rootScope_, _$controller_) {
    $scope = _$rootScope_;
    usersCtrl = _$controller_('UsersCtrl', {
      '$scope': $scope
    });
  }));

  it('should initialize scope with an empty users collection', function () {
    expect($scope.user).toEqual({});
    expect($scope.users.length).toEqual(0);
  });

  it('should save a current user and update users list', function () {

    $scope.user = {name : 'foo'};

    $scope.save();

    expect($scope.users.length).toEqual(1);
    expect($scope.user).toEqual({});
  });

  it('should dirty check and allow clearing user edits', function () {

    $scope.user.name = 'bar';
    expect($scope.hasEdits()).toBeTruthy();

    $scope.clear();
    expect($scope.hasEdits()).toBeFalsy();
  });

  it('should remove a selected user', function () {

    $scope.users = [{id: 1, name: 'foo'}];

    $scope.remove($scope.users[0].id);
    expect($scope.users.length).toEqual(0);
  });

  it('should support editing users', function () {

    $scope.users = [{id: 1, name: 'foo'}];

    $scope.edit($scope.users[0]);

    expect($scope.user.name).toEqual('foo');
  });

});
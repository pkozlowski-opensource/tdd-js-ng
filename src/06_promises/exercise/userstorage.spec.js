describe('Async user storage', function () {

  var $scope;
  var userStorage;

  // load services defined in a given modules
  beforeEach(module('userstorageAsync'));
  beforeEach(inject(function (_$rootScope_, _UserStorage_) {
    $scope = _$rootScope_;
    userStorage = _UserStorage_;
  }));

  function promiseValue(promise) {
    var valueToReturn;

    promise.then(function(valueFromPromise) {
      valueToReturn = valueFromPromise;
    }, function(rejectionReason) {
      throw new Error(rejectionReason);
    });

    $scope.$digest();

    return valueToReturn;
  }

  // remaining tests are unchanged, we've only modified instantiation method
  describe('basic CRUD operations', function () {

    it('should allow adding and querying users by id', function () {

    });

    it('should allow querying all users', function () {

      userStorage.save({name: 'foo'});
      userStorage.save({name: 'bar'});
    });

    it('should support removing users by id', function () {
    });

  });

  describe('corner cases', function () {

    it('should return null for non existing users', function () {
    });

  });

});
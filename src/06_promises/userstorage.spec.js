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

      //ex:start
      var savedUser = promiseValue(userStorage.save({
        name: 'Pawel'
      }));

      var byIdUser = promiseValue(userStorage.getById(savedUser.id));
      expect(byIdUser.name).toEqual('Pawel');
      //ex:end
    });

    it('should allow querying all users', function () {

      userStorage.save({name: 'foo'});
      userStorage.save({name: 'bar'});
      //ex:start
      $scope.$digest();

      var allUsers = promiseValue(userStorage.getAll());
      expect(allUsers.length).toEqual(2);
      //ex:end
    });

    it('should support removing users by id', function () {
      //ex:start
      // setup
      userStorage.save({id: '1', value: 'foo'});
      userStorage.save({id: '2', value: 'bar'});
      $scope.$digest();

      // stimulus
      var removed = promiseValue(userStorage.remove('1'));

      // verify expectations
      expect(removed.value).toEqual('foo');
      expect(promiseValue(userStorage.getById('1'))).toBeFalsy();
      expect(promiseValue(userStorage.getById('2')).value).toEqual('bar');
      //ex:end
    });

  });

  describe('corner cases', function () {

    it('should return null for non existing users', function () {
      //ex:start
      expect(promiseValue(userStorage.getById('foo'))).toBeNull();
      //ex:end
    });

  });

});
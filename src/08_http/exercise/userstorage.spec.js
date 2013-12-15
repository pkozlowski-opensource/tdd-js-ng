describe('Async user storage', function () {

  var BASE_URL, API_KEY;

  var $scope, $httpBackend;
  var userStorage;

  // load services defined in a given modules
  beforeEach(module('userstorageHttp'));
  beforeEach(inject(function (_$rootScope_, _$httpBackend_, _UserStorage_, _BASE_URL_, _API_KEY_) {
    $scope = _$rootScope_;
    userStorage = _UserStorage_;
    $httpBackend = _$httpBackend_;
    BASE_URL = _BASE_URL_;
    API_KEY = _API_KEY_;
  }));

  // we want to have strict control over back-end interactions here
  // slide:start:strict;
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
  // slide:end;


  function withUrl(urlSuffix) {
    return BASE_URL + urlSuffix + '?apiKey=' + API_KEY;
  }

  function onFail(reason) {
    throw reason;
  }

  var testUser = {
    _id: { $oid: '123' },
    name: 'Pawel'
  };

  describe('basic CRUD operations', function () {

    it('should support adding new users', function () {

    });

    it('should update an existing user when save called on a user with a defined id', function () {

    });

    // slide:start:test;
    it('should support querying users by id', function () {

      $httpBackend.expectGET(withUrl('/123')).respond(testUser);

      userStorage.getById('123').then(function(userById) {
          expect(userById._id.$oid).toEqual('123');
        }, onFail);

      $httpBackend.flush();
    });
    // slide:end;

    it('should allow querying all users', function () {

    });

    it('should support removing users by id', function () {
    });

  });
});
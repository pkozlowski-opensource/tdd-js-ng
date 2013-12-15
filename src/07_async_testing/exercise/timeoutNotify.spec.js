describe('timeout testing', function () {

  var $scope, $controller, $timeout;

  beforeEach(module('timeoutNotify'));
  beforeEach(inject(function (_$rootScope_, _$controller_, _$timeout_) {
    $scope = _$rootScope_;
    $controller = _$controller_;
    $timeout = _$timeout_;
  }));

  // slide:start:time;
  it('should send notification after 20 minutes', function () {
  });
  // slide:end;

});
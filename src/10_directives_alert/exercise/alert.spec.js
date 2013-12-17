describe("alert", function () {

  var $scope, $compile;

  beforeEach(module('bs.alert'));
  beforeEach(module('templates'));

  beforeEach(inject(function ($rootScope, _$compile_) {
    $scope = $rootScope;
    $compile = _$compile_;
  }));

  function compileElement(elementString, scope) {
    var element = $compile(elementString)(scope);
    scope.$digest();
    return element;
  }

  function findCloseButton(element) {
    return element.find('button.close');
  }

  it('should set "warning" CSS class by default', function () {
    var element = compileElement('<bs-alert>Default</bs-alert>', $scope);
    expect(element.find('div.alert')).toHaveClass('alert-warning');
  });

  it('should set appropriate CSS class based on the alert type', function () {
  });
  
  it('should not show close buttons if no close callback specified', function () {
  });

  it('should fire callback when closed', function () {
  });

});
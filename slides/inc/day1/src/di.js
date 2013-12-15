//slide:start:value;
angular.module('app', []).value('userstorage', new UserStorage());
//slide:end

//slide:start:service;
angular.module('app', []).service('userstorage', UserStorage);
//slide:end

//slide:start:factory;
angular.module('app', []).service('factory', function(){
    return new UserStorage();
    // or simply define it here
  });
//slide:end

//slide:start:constant;
angular.module('userstorage', [])
  .constant('SEQUENCE_START', 1)
  .factory('UserStorage', function(SEQUENCE_START) {

    // I can configure my service based on the constant
    var sequence = 1;

    // AngularJS services are singletons
    var UserStorage = {};

    ...

    return UserStorage;
  });

// I can re-define a constant closer to my application module

angular.module('app', ['userstorage']).constant('SEQUENCE_START', 10);
//slide:end

//slide:start:provider;
angular.module('userstorage', [])
  .provider('UserStorage', function() {

    var settings = {
      seqStart: 1
    };

    return {

      setSequenceStart: function(seqStart) {
        settings.seqStart = seqStart;
      },

      $get: function() {
        var UserStorage = {};
        ...
        return UserStorage;
      }
    }
  });

// I can configure a provider before it gets instantiated

angular.module('app', ['userstorage'], function(userstorageProvider) {
  userstorageProvider.setSequenceStart(10);
});
//slide:end

//slide:start:clash;
angular.module('app', ['foo', 'bar']);

angular.module('foo', []).service('myService', FooService);
angular.module('bar', []).service('myService', BarService);
//slide:end

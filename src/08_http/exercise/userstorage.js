angular.module('userstorageHttp', [])

  .constant('BASE_URL', 'https://api.mongolab.com/api/1/databases/allegro/collections/users')

  .constant('API_KEY', '4fb51e55e4b02e56a67b0b66')

  .factory('UserStorage', function ($http, BASE_URL, API_KEY) {

    function getResponseData(response) {
      return response.data;
    }

    // AngularJS services are singletons
    var UserStorage = {};

    UserStorage.save = function (user) {
    };

    UserStorage.remove = function (userId) {
    };

    // slide:start:api;
    UserStorage.getById = function (userId) {
      return $http.get(BASE_URL + '/' + userId, {params: {
        apiKey: API_KEY
      }}).then(function(response) {
          return response.data;
        });
    };
    // slide:end

    UserStorage.getAll = function () {
    };

    return UserStorage;
  });
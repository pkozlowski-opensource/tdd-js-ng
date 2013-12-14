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
      //ex:start
      if (user._id) {
        return $http.put(BASE_URL +  '/' + user._id.$oid, angular.extend({}, user, {_id:undefined}), {params: {
          apiKey: API_KEY
        }}).then(getResponseData);
      } else {
        return $http.post(BASE_URL, user, {params: {
          apiKey: API_KEY
        }}).then(getResponseData);
      }
      //ex:end
    };

    UserStorage.remove = function (userId) {
      //ex:start
      return $http.delete(BASE_URL + '/' + userId, {params: {
        apiKey: API_KEY
      }}).then(getResponseData);
      //ex:end
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
      //ex:start
      return $http.get(BASE_URL, {params: {
        apiKey: API_KEY
      }}).then(getResponseData);
      //ex:end
    };

    return UserStorage;
  });
'use strict';

/**
 * @ngdoc service
 * @name webApp.leaderboards
 * @description
 * # leaderboards
 * Factory in the webApp.
 */
angular.module('webApp')
  .factory('leaderboards', function (
    $resource,
    server
  ) {
    return $resource('http://' + server.address + '/leaderboards')
  });

'use strict';

/**
 * @ngdoc service
 * @name webApp.data
 * @description
 * # data
 * Factory in the webApp.
 */
angular.module('webApp')
  .factory('data', function () {
    return {
      username: "",
      points: {
        interval: 0,
        session: 0
      },
      pointsInterval: null,
      leaderboardsInterval: null
    }
      ;
  });

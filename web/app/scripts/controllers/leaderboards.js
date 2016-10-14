'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:LeaderboardsCtrl
 * @description
 * # LeaderboardsCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('LeaderboardsCtrl', function ($interval,
                                            $scope,
                                            data,
                                            leaderboards) {
    data.leaderboardsInterval = $interval(pollLeaderboards, 2000);

    $scope.leaderboards = {};

    function pollLeaderboards() {
      leaderboards.get(function (data) {
        $scope.leaderboards = data;
      });
    }
  });

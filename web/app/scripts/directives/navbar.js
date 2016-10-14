'use strict';

/**
 * @ngdoc directive
 * @name webApp.directive:navbar
 * @description
 * # navbar
 */
angular.module('webApp')
  .directive('navbar', function () {
    var navbarCtrl = function ($interval, $location, $scope, data) {
      var cleanIntervals = function () {
        if (data.leaderboardsInterval) {
          $interval.cancel(data.leaderboardsInterval);
          data.leaderboardsInterval = null;
        }
        if (data.pointsInterval) {
          $interval.cancel(data.pointsInterval);
          data.pointsInterval = null;
        }
      };

      $scope.onPlayClick = function () {
        cleanIntervals();
        if (data.username) {
          $location.path("game");
        } else {
          $location.path("login");
        }
      };

      $scope.onLeaderboardsClick = function () {
        cleanIntervals();
        $location.path("leaderboards");
      }
    };

    return {
      templateUrl: '../views/navbar.html',
      restrict: 'E',
      controller: navbarCtrl
    }
  });

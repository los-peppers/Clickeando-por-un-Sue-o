'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('GameCtrl', function (
    $interval,
    $location,
    $scope,
    data,
    socket
  ) {
    if (!data.username) {
      $location.path("login");
    }

    $scope.points = data.points;
    $scope.username = data.username;
    
    $scope.onPointsClick = function () {
      data.points.interval++;
    };

    socket.emit("set-username", data.username);

    function sendPoints() {
      socket.emit("send-points", data.points.interval);
      data.points.session += data.points.interval;
      data.points.interval = 0;
    }

    data.pointsInterval = $interval(sendPoints, 1000);

  });

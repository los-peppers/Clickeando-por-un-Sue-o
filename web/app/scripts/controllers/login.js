'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('LoginCtrl', function ($location,
                                     $scope,
                                     data) {
    $scope.username = "";

    $scope.onPlayClick = function () {
      data.username = $scope.username;
      $location.path('game')
    }
  });

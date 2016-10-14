'use strict';

/**
 * @ngdoc overview
 * @name webApp
 * @description
 * # webApp
 *
 * Main module of the application.
 */
angular
  .module('webApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngTouch',
    // Socket IO
    'btford.socket-io'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/game', {
        templateUrl: 'views/game.html',
        controller: 'GameCtrl',
        controllerAs: 'game'
      })
      .when('/leaderboards', {
        templateUrl: 'views/leaderboards.html',
        controller: 'LeaderboardsCtrl',
        controllerAs: 'leaderboards'
      })
      .otherwise({
        redirectTo: '/login'
      });
  });

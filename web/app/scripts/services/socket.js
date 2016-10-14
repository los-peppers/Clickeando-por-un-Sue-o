'use strict';

/**
 * @ngdoc service
 * @name webApp.socket
 * @description
 * # socket
 * Factory in the webApp.
 */
angular.module('webApp')
  .factory('socket', function (server,
                               socketFactory
  ) {
    return socketFactory({
      ioSocket: io.connect('http://' + server.address)
    });
  });

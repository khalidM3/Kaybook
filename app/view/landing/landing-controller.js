'use strict';

require('./_landing.scss');

module.exports = ['$log', '$location', '$rootScope', LandingController];

function LandingController($log, $location, $rootScope) {
  $log.debug('LandingController', this);
}

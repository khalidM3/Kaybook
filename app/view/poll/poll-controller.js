'use strict';

require('./_poll.scss');

module.exports = ['$log', '$rootScope', '$stateParams', 'profileService', PollController];

function PollController($log, $rootScope, $stateParams, profileService) {
  $log.debug('PollController');
  
}
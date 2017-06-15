'use strict';

require('./_forum.scss');

module.exports = ['$log', '$rootScope', '$stateParams', 'profileService', 'postService', ForumController];

function ForumController($log, $rootScope, $stateParams, profileService, postService) {
  $log.debug('ForumController');
  
}
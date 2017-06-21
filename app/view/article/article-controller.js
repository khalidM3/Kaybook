'use strict';

require('./_article.scss');

module.exports = ['$log', '$rootScope', '$stateParams', 'profileService', ArticleController];

function ArticleController($log, $rootScope, $stateParams, profileService) {
  $log.debug('ForumController');
  
}
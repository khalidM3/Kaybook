'use strict';

require('./_mypage.scss');

module.exports = ['$log', '$rootScope', '$stateParams', 'pageService', MypageController];

function MypageController($log, $rootScope, $stateParams, pageService) {
  $log.debug('MypageController');

  this.pageID = $stateParams.pageID;
}

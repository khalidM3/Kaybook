'use strict';

require('./_merch.scss');

module.exports = ['$log', '$rootScope', '$stateParams', '$window', 'profileService', 'pageService', MerchController];

function MerchController($log, $rootScope, $stateParams, $window, profileService, pageService) {
  $log.debug('MerchController');

  this.$onInit = function() {

    this.pageID = $stateParams.pageID;

    pageService.fetchPage(this.pageID)
    .then( page => {
      this.resolve = {};
      this.resolve.page = page;
    });
  };
}
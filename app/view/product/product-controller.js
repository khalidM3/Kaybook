'use strict';

require('./_product.scss');

module.exports = ['$log', '$rootScope', '$stateParams', '$window', 'profileService', 'pageService', ProductController];

function ProductController($log, $rootScope, $stateParams, $window, profileService, pageService) {
  $log.debug('ProductController');

  this.$onInit = function() {
    this.params = $stateParams.section;
    
  };
  
  
}

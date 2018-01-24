'use strict';

require('./_account-profile.scss');

// module.exports = ['$log', '$rootScope', '$stateParams', 'profileService', 'postService', 'commentService', AccountprofileController];

module.exports = {
  template: require('./account-profile.html'),
  controller: ['$log', '$rootScope', '$stateParams', '$window', 'profileService', 'postService', 'commentService', AccountProfileController],
  controllerAs: 'accountProfileCtrl',
  bindings: {
    profile: '<'
  }
};

function AccountProfileController($log, $rootScope, $stateParams, $window, profileService, postService, commentService) {
  $log.debug('AccountContentController');

  this.$onInit = () => {
    this.profile = JSON.parse($window.localStorage.profile);
  };

}
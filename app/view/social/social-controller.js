'use strict';

require('./_social.scss');

module.exports = ['$log', '$rootScope', '$stateParams', '$window', 'profileService', SocialController];

function SocialController($log, $rootScope, $stateParams, $window, profileService) {
  $log.debug('SocialController');
  
  this.$onInit = function(){
    $log.debug('socialCtrl.$onInit()');

    this.profile = JSON.parse($window.localStorage.profile);
    // profileService.fetchProfile()
    // .then( profile => {
    //   console.log('-----------------------');
    //   console.log(profile);
    //   return this.myProfile = profile;
    // });
  };
}
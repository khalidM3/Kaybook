'use strict';

require('./_myprofile.scss');

module.exports = ['$log', '$rootScope', '$stateParams', 'profileService', MyprofileController];

function MyprofileController($log, $rootScope, $stateParams, profileService) {
  $log.debug('MypageController');

  this.myUserID = $stateParams.userID;
  this.loggedIn = true;
}

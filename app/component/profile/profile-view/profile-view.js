'use strict';

require('./_profile-view.scss');

module.exports = {
  template: require('./profile-view.html'),
  controller: ['$log', '$rootScope', '$stateParams', 'profileService', ProfileViewController],
  controllerAs: 'profileViewCtrl',
  bindings: {
    something: '<',
  }
};

function ProfileViewController($log, $rootScope, $stateParams, profileService) {
  $log.debug('ProfileViewController');

  this.userID = $stateParams.userID;
  this.showEditView = false;

  this.deleteProfile = function(profile) {
    if (this.profile._id === profile._id) {
      this.profile = null;
    }
  };

  this.updateProfileView = function() {
    $log.debug('ProfileViewController.updateProfileView()');

    profileService.fetchProfile(this.userID)
    .then(profile => {
      this.profile = profile;
      this.showEditView = false;
    });
  };

  this.updateProfileView();
}

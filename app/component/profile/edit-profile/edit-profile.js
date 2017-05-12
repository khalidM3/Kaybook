'use strict';

require('./_edit-profile.scss');

module.exports = {
  template: require('./edit-profile.html'),
  controller: ['$log', '$window', 'profileService', 'picService', EditProfileController],
  controllerAs: 'editProfileCtrl',
  bindings: {
    profile: '<',
    onProfileUpdated: '&'
  }
};

function EditProfileController($log, $window, profileService, picService) {
  $log.debug('EditProfileController');

  // this.pic = {};
  // let userID = $window.localStorage.getItem('userID');
  // this.editProfile = function() {
  //   profileService.editProfile(userID, this.profile)
  //   .then( () => this.onProfileUpdated());
  // };

  this.pic = {};
  this.bannerPic = {};
  let location = $window.location;

  let userID = $window.localStorage.getItem('userID');
  this.editProfile = function() {
    
    profileService.editProfile(userID, this.profile)
    .then( profile => {
      if( !this.pic) return profile;
      return picService.uploadProfilePic(profile, this.pic);
    })
    .then( profile => {
      if( !this.bannerPic) return profile;
      return picService.uploadProfilePic(profile, this.bannerPic);
    })
    .catch( () => {
      this.pic = null;
      location.reload(true);
      this.onProfileUpdated();
    })
    .then( () => this.onProfileUpdated());
  };

  // this.uploadProfilePic = function() {
  //   let location = $window.location;

  //   $log.debug('THIS PIC', this.pic);
  //   picService.uploadProfilePic(this.profile, this.pic)
  //   .then( () => {
  //     this.pic = null;
  //     location.reload(true);
  //     this.onProfileUpdated();
  //   });
  // };

  // this.onProfileUpdated = function() {
    
  // };
}


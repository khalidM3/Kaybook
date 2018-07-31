'use strict';

require('./_edit-profile.scss');

module.exports = {
  template: require('./edit-profile.html'),
  controller: ['$log', '$window', 'profileService', 'picService', EditProfileController],
  controllerAs: 'editProfileCtrl',
  bindings: {
    profile: '<'
  }
};

function EditProfileController($log, $window, profileService, picService) {
  $log.debug('EditProfileController');

  this.$onInit = () => {
    return profileService.fetchMyProfile()
    .then( profile => {
      this.profile = profile;
    });
  };


  this.addLink = () => {

    let val_name = this.link_name.split('').length > 1;
    let val_link = this.link_link.split('').length > 5;
    if(!val_name || !val_link) return;
    this.profile.links.push({ name: this.link_name, link: this.link_link});
    this.link_name = null, this.link_link = null;
    return;
  };

  this.removeLink = (link) => {
    return this.profile.links = this.profile.links.filter( l => l.name !== link.name);
  };


  this.updateProfile = () => {
    profileService.updateProfile(this.profile)
    .then( profile => {
      this.profile = profile;
    });
  };

  
}
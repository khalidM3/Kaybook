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


  this.addLink = () => {
    console.log('adding a link');

    let val_name = this.link_name.split('').length > 1;
    let val_link = this.link_link.split('').length > 5;
    if(!val_name || !val_link) return;
    console.log('adding a link', this.profile.links);
    this.profile.links.push({ name: this.link_name, link: this.link_link});
    this.link_name = null, this.link_link = null;
    return;
  };

  this.removeLink = (link) => {
    return this.profile.links = this.profile.links.filter( l => l.name !== link.name);
  };


  this.updateProfile = () => {
    console.log('profile:::', this.profile);
    profileService.updateProfile(this.profile)
    .then( profile => {
      console.log('updated profile', profile);
      this.profile = profile;
    });
  };




  
}


  // this.pic = {};
  // this.bannerPic = {};
  // let location = $window.location;

  // let userID = $window.localStorage.getItem('userID');
  // this.editProfile = function() {
    
  //   profileService.editProfile(userID, this.profile)
  //   .then( profile => {
  //     if( !this.pic) return profile;
  //     return picService.uploadProfilePic(profile, this.pic);
  //   })
  //   .then( profile => {
  //     if( !this.bannerPic) return profile;
  //     return picService.uploadProfilePic(profile, this.bannerPic);
  //   })
  //   .catch( () => {
  //     this.pic = null;
  //     location.reload(true);
  //     this.onProfileUpdated();
  //   })
  //   .then( () => this.onProfileUpdated());
  // };

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


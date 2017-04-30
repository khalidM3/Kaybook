'use strict';

require('./_profile-view.scss');

module.exports = {
  template: require('./profile-view.html'),
  controller: ['$log', '$rootScope', '$stateParams', '$window', 'profileService', 'postService', ProfileViewController],
  controllerAs: 'profileViewCtrl',
  bindings: {
    profile: '<',
  }
};

function ProfileViewController($log, $rootScope, $stateParams, $window, profileService, postService) {
  $log.debug('ProfileViewController');

  this.userID = $stateParams.userID;
  this.showEditView = false;

  let userID = $window.localStorage.getItem('userID');
  
  this.showEditOption = userID === this.userID;

  this.deleteProfile = function(profile) {
    if (this.profile._id === profile._id) {
      this.profile = null;
    }
  };

  this.updateProfileView = function() {
    $log.debug('ProfileViewController.updateProfileView()');
    console.log('this.postArray:::',this.postsArray);

    this.postsArray = [];
    
    profileService.fetchProfile(this.userID)
    .then(profile => {
      this.profile = profile;
      this.showEditView = false;
      if(profile.posts.length !== 0){
        profile.posts.forEach( profileID => {
          postService.fetchPost(profileID)
          .then( postObj => this.postsArray.push(postObj));
        });
      }
    })
    .catch( err => $log.error(err.message));
  };

  this.join = function(){
    $log.debug('ProfileViewController.joinProfile()');

    profileService.joinProfile(this.userID);
    return this.updateProfileView();
  };

  this.updateProfileView();
}

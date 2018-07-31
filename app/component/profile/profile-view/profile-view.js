'use strict';

require('./_profile-view.scss');

module.exports = {
  template: require('./profile-view.html'),
  controller: ['$log', '$rootScope', '$stateParams', '$window', '$location', 'profileService', 'postService', ProfileViewController],
  controllerAs: 'profileViewCtrl',
  bindings: {
    profile: '<',
  }
};

function ProfileViewController($log, $rootScope, $stateParams, $window, $location, profileService, postService) {
  $log.debug('ProfileViewController');

  
  this.showEditView = false;

  this.$onInit = function(){
    $log.debug('profileViewCtrl.$oninit()');
   
    this.my_profile = JSON.parse($window.localStorage.profile);

    profileService.fetchProfile2($stateParams.profileID)
    .then( profile => {
      this.profile = profile;

      let me = this.my_profile._id;
      let profileID = profile._id;
      let isFriend = this.profile.friends.some(pID => pID.toString() === me);
      let sentThemReq = this.profile.friendReq.some(pID => pID.toString() === me);
      let sentMeReq = this.profile.sentReq.some(pID => pID.toString() === me);
      this.showEditOption = me === profileID;
      this.showAcceptBtn = sentMeReq;
      this.showUnFriendBtn = isFriend;
      this.showSendReqBtn = !isFriend && !sentMeReq && !sentThemReq;
      this.showUnSendReqBtn = sentThemReq;
      this.fetchPosts();
    });
  };

  this.fetchPosts = () => {
    $log.debug('ProfileViewController.fetchPosts()');
    this.showBio = false;
    this.showJoined = false;
    this.showPosts = true;
    this.postsArr = [];
    postService.fetchMyPagePosts(this.profile._id)
    .then( posts => {
      this.postsArr = posts;
    });
  };


  this.fetchJoined = () => {
    profileService.fetchJoinedPages(this.profile._id)
    .then( profile => {
      this.showJoined = true;
      this.showPosts = false;
      this.showBio = false;
      this.profile = profile;
      this.joined = profile.memberOf;
    });
  };


  this.about = () => {
    this.showBio = true;
    this.showJoined = false;
    this.showPosts = false;
    this.postsArr = [];
  };
  

  this.sendReq = function(){
    $log.debug('ProfileViewCtrl.sendReq()');

    this.showAcceptBtn = false;
    this.showUnFriendBtn = false;
    this.showSendReqBtn = false;
    this.showUnSendReqBtn = true;

    profileService.sendReq(this.profile._id)
    .then( res => console.log('SUCCESS sent friend req()', res))
    .catch( err => console.error('FAILED to send friend req()', err));
    return this.updateProfileView();
  };

  this.unSendReq = function(){
    $log.debug('ProfileViewCtrl.unSendReq()');

    this.showAcceptBtn = false;
    this.showUnFriendBtn = false;
    this.showSendReqBtn = true;
    this.showUnSendReqBtn = false;

    profileService.unSendReq(this.profile._id)
    .then( res => console.log('Success unSendReq() ', res))
    .catch( err => console.log('Failed unSendReq()', err));
  };

  this.acceptReq = function(){
    $log.debug('ProfileViewCtrl.acceptReq()');

    this.showAcceptBtn = false;
    this.showUnFriendBtn = true;
    this.showSendReqBtn = false;
    this.showUnSendReqBtn = false;

    profileService.acceptReq(this.profile._id)
    .then( res => console.log('SUCCESS accepted friend req()', res))
    .catch( err => console.error('FAILED accepted friend req()', err));
  };

  this.unFriend = function(){
    $log.debug('ProfileViewCtrl.unFriend()');

    this.showAcceptBtn = false;
    this.showUnFriendBtn = false;
    this.showSendReqBtn = true;
    this.showUnSendReqBtn = false;
    
    profileService.unFriend(this.profile._id)
    .then( res => console.log('Success unFriend() ', res))
    .catch( err => console.log('Failed unFriend()', err));
  };

  this.goToEditProfile = () => {
    $location.url('settings/profile');
  };

}
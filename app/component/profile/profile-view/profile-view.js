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

  // this.profileID =  $stateParams.profileID;
  // let profileID = $window.localStorage.getItem('profileID');

  // this.showEditOption = profileID === this.profileID;

  this.$onInit = function(){
    $log.debug('profileViewCtrl.$oninit()');
    // console.log('inside ',$stateParams.profileID);
    // this.profile_me = JSON.parse($window.localStorage.profile);
    this.my_profile = JSON.parse($window.localStorage.profile);
    // console.log('this profile ', this.profile);
    // let me = $window.localStorage.getItem('profileID');
    // let profileID = $stateParams.profileID;
    // let isFriend = this.profile.friends.some(pID => pID.toString() === me);
    // let sentThemReq = this.profile.friendReq.some(pID => pID.toString() === me);
    // let sentMeReq = this.profile.sentReq.some(pID => pID.toString() === myPID);
    // this.showEditOption = myPID === profileID;
    // this.showAcceptBtn = sentMeReq;
    // this.showUnFriendBtn = isFriend;
    // this.showSendReqBtn = !isFriend && !sentMeReq && !sentThemReq;
    // this.showUnSendReqBtn = sentThemReq;
    // this.fetchMyPagePosts();

    profileService.fetchProfile2($stateParams.profileID)
    .then( profile => {
      console.log(profile);
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

  // this.updateProfileView = function() {
  //   $log.debug('ProfileViewController.updateProfileView()');
  //   console.log('this.postArray:::',this.postsArray);

  //   this.postsArray = [];
    
  //   profileService.fetchProfile(this.userID)
  //   .then(profile => {
  //     this.profile = profile;
  //     this.showEditView = false;
  //     if(profile.posts.length !== 0){
  //       profile.posts.forEach( profileID => {
  //         postService.fetchPost(profileID)
  //         .then( postObj => this.postsArray.push(postObj));
  //       });
  //     }
  //   })
  //   .catch( err => $log.error(err.message));
  // };

  this.fetchPosts = () => {
    $log.debug('ProfileViewController.fetchPosts()');
    this.showBio = false;
    this.showJoined = false;
    this.showPosts = true;
    this.postsArr = [];
    postService.fetchMyPagePosts(this.profile._id)
    .then( posts => {
      console.log(posts);
      this.postsArr = posts;
    });
  };

  // this.fetchTime = () => {
  //   $log.debug('ProfileViewController.fetchTimePosts()');
  //   this.showBio = false;
  //   postService.fetchTimePosts(this.profile._id)
  //   .then( posts => this.postsArr = posts);
  // };

  this.fetchJoined = () => {
    profileService.fetchJoinedPages(this.profile._id)
    .then( profile => {
      this.showJoined = true;
      this.showPosts = false;
      this.showBio = false;
      this.profile = profile;
      this.joined = profile.memberOf;
      console.log('joined', this.joined);
    });
  };

  // this.fetchJoinedPages = () => {
  //   $log.debug('profileItemCtrl.fetchJoinedPages()');

  //   this.showCreatePage = true;

  //   profileService.fetchJoinedPages(this.profile._id)
  //   .then( profile =>  {
  //     // this.myProfile = profile;
  //     this.pages = profile.memberOf;
  //     console.log('this.pages', this.pages, profile.memberOf);
  //     return;
  //   })
  //   .catch(err => $log.error('FAILED fetchJoiedPages()', err));
  // };

  this.about = () => {
    this.showBio = true;
    this.showJoined = false;
    this.showPosts = false;
    this.postsArr = [];
    console.log(this.showBio, this.profile.bio)
  };
  

  this.sendReq = function(){
    $log.debug('ProfileViewCtrl.sendReq()');
    console.log('This.profile ::::', this.profile);

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
    // return this.updateProfileView();
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

  // this.open = function (size, selectedPost) {
  //   // var parentElem = parentSelector ? 
  //   //   angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
  //   var modalInstance = $uibModal.open({
  //     animation: this.animationsEnabled,
  //     // ariaLabelledBy: 'modal-title',
  //     // ariaDescribedBy: 'modal-body',
  //     templateUrl: 'create-post.html',
  //     // controller: 'CreatePostController',
  //     // controllerAs: 'this',
  //     size: size,
  //     // appendTo: parentElem,
  //     resolve: {
  //       items: function () {
  //         return selectedPost;
  //       }
  //     }
  //   });

  //   // modalInstance.result.then(function (selectedItem) {
  //   //   this.selected = selectedItem;
  //   // }, function () {
  //   //   $log.info('Modal dismissed at: ' + new Date());
  //   // });
  // };

  // this.openComponentModal = function ( profile) {

  //   var modalInstance = $uibModal.open({
  //     animation: this.animationsEnabled,
  //     component: 'createPost',
  //     resolve: {
  //       profile: function () {
  //         return profile;
  //       }
  //     }
  //   });
  // };


}

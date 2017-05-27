'use strict';

require('./_profile-view.scss');

module.exports = {
  template: require('./profile-view.html'),
  controller: ['$log', '$rootScope', '$stateParams', '$window', '$uibModal', 'profileService', 'postService', ProfileViewController],
  controllerAs: 'profileViewCtrl',
  bindings: {
    profile: '<',
  }
};

function ProfileViewController($log, $rootScope, $stateParams, $window, $uibModal, profileService, postService) {
  $log.debug('ProfileViewController');

  
  this.showEditView = false;

  // this.profileID =  $stateParams.profileID;
  // let profileID = $window.localStorage.getItem('profileID');

  // this.showEditOption = profileID === this.profileID;

  this.$onInit = function(){
    $log.debug('profileViewCtrl.$oninit()');

    profileService.fetchProfile2($stateParams.profileID)
    .then( profile => this.profile = profile)
    .then(() => {
      let myPID = $window.localStorage.getItem('profileID');
      let profileID = $stateParams.profileID;
      let isFriend = this.profile.friends.some(pID => pID.toString() === myPID);
      let sentThemReq = this.profile.friendReq.some(pID => pID.toString() === myPID);
      let sentMeReq = this.profile.sentReq.some(pID => pID.toString() === myPID);
      this.showEditOption = myPID === profileID;
      this.showAcceptBtn = sentMeReq;
      this.showUnFriendBtn = isFriend;
      this.showSendReqBtn = !isFriend && !sentMeReq;
      this.showUnSendReqBtn = sentThemReq;
      console.log(this.profile.name);
      console.log('is my friend', isFriend);
      console.log('sent them a request', sentThemReq);
      console.log('sent me a request', sentMeReq);
      console.log('+++++++++++++++++++++++++++++++++');
    });
  };

  // this.fetchProfile = function(){
  //   $log.debug('profileViewCtrl.fetchProfile()');

  //   profileService.fetchProfile2($stateParams.profileID)
  //   .then( profile => this.profile = profile);
  // };

  // this.check = function(){
  //   $log.debug('profileViewController.check()');

  //   // let userID = $window.localStorage.getItem('userID');
  //   // profileService.fetchProfile(userID)
  //   // .then( profile => {
  //   //   let arr = profile.friends;
  //   //   this.showLeaveBtn = arr.some( PID => PID.toString() === this.profile._id.toString());
  //   //   // console.log('profile.memberOf  }-------->',arr);
  //   //   // console.log('}------->', this.userID);
  //   // });

  //   console.log('PROFILE ::::::::', this.profile);
  // };
  // this.check();

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

  this.openComponentModal = function ( profile) {

    var modalInstance = $uibModal.open({
      animation: this.animationsEnabled,
      component: 'createPost',
      resolve: {
        profile: function () {
          return profile;
        }
      }
    });
  };


}

'use strict';

require('./_profile-item.scss');

module.exports = {
  template: require('./profile-item.html'),
  controller: ['$log', '$rootScope', '$stateParams', '$window', '$uibModal', 'profileService', 'pageService', 'postService', 'roomService', ProfileItemController],
  controllerAs: 'profileItemCtrl',
  bindings: {
    profile: '<',
  }
};

function ProfileItemController($log, $rootScope, $stateParams, $window, $uibModal, profileService, pageService, postService, roomService) {
  $log.debug('ProfileViewController');

  // this.userID = $stateParams.userID;
  // this.showEditView = false;


  // let userID = $window.localStorage.getItem('userID');
  
  // this.showEditOption = userID === this.userID;

  this.fetchMyProfile = function(){
    $log.debug('profileItemCtrl.fetchMyProfile()');

    profileService.fetchMyProfile()
    .then( profile => this.myProfile = profile)
    .catch(err => $log.error('FAILED fetchMyProfile()', err));
  };

  this.fetchFRP = function(){
    $log.debug('profileViewCtrl.fetchFRP()');

    this.showCreatePage = false;

    this.profileArr = [];

    profileService.fetchFriendReq(this.profile._id)
   .then( profiles => this.profileArr = profiles.friendReq);
  };


  this.fetchMyFriends = function(){
    $log.debug('profileItemCtrl.fetchMyFriends()');

    this.showCreatePage = false;
    this.showProfileTile = true;
    this.fiendsPosts = [];
    this.profileArr = [];
    this.pagesArr = [];

    profileService.fetchFriends(this.profile._id)
    .then( profiles => this.profileArr = profiles.friends)
    .catch( err => console.log('Failed fetchMyFriends ', err));
  };

  this.fetchPage = function(){
    $log.debug('profileItemCtrl.fetchPage()');

    this.showProfileTile = false;
    this.showCreatePage = true;

    this.pagesArr = [];
    this.profileArr = [];
    this.friendsPosts = [];

    pageService.fetchPagesByPID(this.profile._id)
    .then( pages => this.pagesArr = pages)
    .catch( err => console.log('Failed fetchMyPages()', err));

  };

  this.fetchFriendsPosts = function(){
    $log.debug('profileItemCtrl.fetchFriendsPosts()');

    this.pagesArr = [];
    this.profileArr = [];
    this.fiendsPosts = [];
    this.roomsArr = [];

    postService.fetchFriendsPosts()
    .then( posts => this.friendsPosts =  posts)
    .catch(err => console.log('Failed to fetch posts', err));
  };

  this.bark = function(){
    console.log(this.profile);
  };

  // this.acceptReq = function(){
  //   $log.debug('ProfileViewController.acceptReq()');

  //   profileService.acceptReq(this.profile._id)
  //   .then( res => console.log('SUCCESS accepted friend req()', res))
  //   .catch( err => console.error('FAILED accepted friend req()', err));
  //   return this.updateProfileView();
  // };

  this.createRoom = function(){
    $log.debug('profileItemCtrl.createRoom()');

    roomService.createRoom()
    .then( room => console.log('Successfully createRoom ', room));
  };

  this.fetchMyRooms = function(){
    $log.debug('profileItemCtrl.fetchMyRooms()');

    this.pagesArr = [];
    this.profileArr = [];
    this.friendsPosts = [];

    roomService.fetchMyRooms()
    .then( room => this.roomsArr = room);
  };

  // this.check = function(){
  //   $log.debug('profileViewController.check()');

  //   let userID = $window.localStorage.getItem('userID');
  //   profileService.fetchProfile(userID)
  //   .then( profile => {
  //     let arr = profile.memberOf;
  //     this.showLeaveBtn = arr.some( PID => PID.toString() === this.userID.toString());
  //     // console.log('profile.memberOf  }-------->',arr);
  //     // console.log('}------->', this.userID);
  //   });
  // };
  // this.check();


  
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

  // this.join = function(){
  //   $log.debug('ProfileViewController.join()');

  //   profileService.joinProfile(this.userID)
  //   .then( res => console.log('SUCCESS join()', res))
  //   .catch( err => console.error('FAILED join()', err));
  //   return this.updateProfileView();
  // };

  // this.leave = function(){
  //   $log.debug('ProfileViewController.leave()');

  //   profileService.leaveProfile(this.userID)
  //   .then( profile => console.log(profile))
  //   .catch( (err) => console.error('FAILED leave()', err));
  // };

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

  this.openCreatePostModal= function ( profile) {

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

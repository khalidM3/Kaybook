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


  this.fetchMyProfile = function(){
    $log.debug('profileItemCtrl.fetchMyProfile()');

    profileService.fetchMyProfile()
    .then( profile => this.myProfile = profile)
    .catch(err => $log.error('FAILED fetchMyProfile()', err));
  };



  this.fetchFRP = function(){
    $log.debug('profileViewCtrl.fetchFRP()');

    this.showRoomBtn = false;
    this.showPostBtn = false;
    // this.showProfileTile = true;
    this.showCreatePage = false;

    this.fiendsPosts = [];
    this.profileArr = [];
    this.pagesArr = [];
    this.roomsArr = [];

    profileService.fetchFriendReq(this.profile._id)
   .then( profiles => this.profileArr = profiles.friendReq);
  };


  this.fetchMyFriends = function(){
    $log.debug('profileItemCtrl.fetchMyFriends()');

    this.showRoomBtn = false;
    this.showPostBtn = false;
    // this.showProfileTile = true;
    this.showCreatePage = false;

    this.fiendsPosts = [];
    this.profileArr = [];
    this.pagesArr = [];
    this.roomsArr = [];

    profileService.fetchFriends(this.profile._id)
    .then( profiles => this.profileArr = profiles.friends)
    .catch( err => console.log('Failed fetchMyFriends ', err));
  };

  this.fetchPage = function(){
    $log.debug('profileItemCtrl.fetchPage()');

    this.showRoomBtn = false;
    this.showPostBtn = false;
    this.showProfileTile = false;
    this.showCreatePage = true;

    this.pagesArr = [];
    this.profileArr = [];
    this.friendsPosts = [];
    this.roomsArr = [];

    pageService.fetchPagesByPID(this.profile._id)
    .then( pages => this.pagesArr = pages)
    .catch( err => console.log('Failed fetchMyPages()', err));

  };

  this.fetchFriendsPosts = function(){
    $log.debug('profileItemCtrl.fetchFriendsPosts()');

    this.showRoomBtn = false;
    this.showPostBtn = false;
    this.showProfileTile = false;
    this.showCreatePage = false;


    this.pagesArr = [];
    this.profileArr = [];
    this.fiendsPosts = [];
    this.roomsArr = [];

    postService.fetchFriendsPosts()
    .then( posts => this.friendsPosts =  posts)
    .catch(err => console.log('Failed to fetch posts', err));
  };
  
  this.fetchTimeline = () => {
    $log.debug('profileItemCtrl.fetchTimeline()');

    this.showRoomBtn = false;
    this.showPostBtn = true;
    this.showProfileTile = false;
    this.showCreatePage = false;


    this.pagesArr = [];
    this.profileArr = [];
    this.fiendsPosts = [];
    this.roomsArr = [];

    postService.fetchTimeline()
    .then( posts => this.friendsPosts =  posts)
    .catch(err => console.log('Failed to fetch posts', err));
  };

  this.fetchJoinedPages = () => {
    $log.debug('profileItemCtrl.fetchJoinedPages()');

    this.showRoomBtn = false;
    this.showPostBtn = false;
    this.showProfileTile = false;
    this.showCreatePage = true;


    this.pagesArr = [];
    this.profileArr = [];
    this.fiendsPosts = [];
    this.roomsArr = [];
    
    profileService.fetchJoinedPages()
    .then( profile =>  {
      this.myProfile = profile;
      this.pagesArr = profile.memberOf;
      console.log('this.pagesArr', this.pagesArr, profile.memberOf);
      return;
    })
    .catch(err => $log.error('FAILED fetchJoiedPages()', err));
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

    this.showRoomBtn = true;
    this.showPostBtn = false;
    this.showProfileTile = false;
    this.showCreatePage = false;


    this.pagesArr = [];
    this.profileArr = [];
    this.friendsPosts = [];

    roomService.fetchMyRooms()
    .then( room => this.roomsArr = room);
  };


  this.openCreatePostModal= function () {
    let profile = this.profile;
    $uibModal.open({
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

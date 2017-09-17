'use strict';

require('./_profile-item.scss');

module.exports = {
  template: require('./profile-item.html'),
  controller: ['$log', '$rootScope', '$stateParams', '$location', '$window', '$uibModal', 'profileService', 'pageService', 'postService', 'roomService', ProfileItemController],
  controllerAs: 'profileItemCtrl',
  bindings: {
    profile: '<',
  }
};

function ProfileItemController($log, $rootScope, $stateParams, $location, $window, $uibModal, profileService, pageService, postService, roomService) {
  $log.debug('ProfileViewController');

  this.$onInit = () => {
    let section = $stateParams.section;

    switch(section) {
    case 'timeline':
      return this.fetchTimeline();
    case 'posts':
      return this.fetchFriendsPosts();
    case 'chat':
      return this.fetchMyRooms();
    case 'friends':
      return this.fetchFriends();
    case 'requests':
      return this.fetchFRP();
    case 'pages':
      return this.fetchPage();
    case 'joined':
      return this.fetchJoinedPages();
    default:
      return this.fetchTimeline();
    }
  };

  // this.clean = () => {
  //   this.showRoomBtn = false;
  //   this.showPostBtn = false;
  //   this.showProfileTile = false;
  //   this.showCreatePage = false;

  //   this.friendsPosts = [];
  //   this.profileArr = [];
  //   this.pagesArr = [];
  //   this.roomsArr = [];
  // };

  this.fetchMyProfile = function(){
    $log.debug('profileItemCtrl.fetchMyProfile()');

    profileService.fetchMyProfile()
    .then( profile => this.myProfile = profile)
    .catch(err => $log.error('FAILED fetchMyProfile()', err));
  };


  this.searchProfiles = () => {
    console.log('changing', this.searchName);
    profileService.searchProfile(this.searchName)
    .then( profiles => this.searchesArr = profiles);
  };


  this.fetchFRP = function(){
    $log.debug('profileViewCtrl.fetchFRP()');

    profileService.fetchFriendReq(this.profile._id)
   .then( profiles => this.profileArr = profiles.friendReq);
  };


  this.fetchMyFriends = function(){
    $log.debug('profileItemCtrl.fetchMyFriends()');

    profileService.fetchFriends(this.profile._id)
    .then( profiles => this.profileArr = profiles.friends)
    .catch( err => console.log('Failed fetchMyFriends ', err));
  };

  this.fetchPage = function(){
    $log.debug('profileItemCtrl.fetchPage()');
    console.log('what us going on mate', this.profile);
    this.showCreatePage = true;

    pageService.fetchPagesByPID($window.localStorage.profileID)
    .then( pages => this.pagesArr = pages)
    .catch( err => console.log('Failed fetchMyPages()', err));

  };

  this.fetchFriendsPosts = function(){
    $log.debug('profileItemCtrl.fetchFriendsPosts()');

    postService.fetchFriendsPosts()
    .then( posts => this.friendsPosts =  posts)
    .catch(err => console.log('Failed to fetch posts', err));
  };
  
  this.fetchTimeline = () => {
    $log.debug('profileItemCtrl.fetchTimeline()');

    this.showPostBtn = true;

    postService.fetchTimeline()
    .then( posts => this.friendsPosts =  posts)
    .catch(err => console.log('Failed to fetch posts', err));
  };

  this.fetchJoinedPages = () => {
    $log.debug('profileItemCtrl.fetchJoinedPages()');

    this.showCreatePage = true;

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
    
    roomService.fetchMyRooms()
    .then( room => this.roomsArr = room);
  };

  this.goToAccount = () => {
    $location.url('settings/profile');
  };

  this.goToProfile = (id) => {
    $location.url(`/profile/${id}`);
  };

  this.goToMyProfile = () => {
    $location.url(`/profile/${ $window.localStorage.profileID}`);
  };

  this.goTo = (str) => {
    $location.url(`/social/${str}`);
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

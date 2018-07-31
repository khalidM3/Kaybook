'use strict';

require('./_profile-item.scss');

module.exports = {
  template: require('./profile-item.html'),
  controller: ['$log', '$rootScope', '$stateParams', '$location', '$window', '$uibModal', '$timeout', 'profileService', 'pageService', 'postService', 'roomService', ProfileItemController],
  controllerAs: 'profileItemCtrl',
  bindings: {
    profile: '<',
  }
};

function ProfileItemController($log, $rootScope, $stateParams, $location, $window, $uibModal,$timeout, profileService, pageService, postService, roomService) {
  $log.debug('ProfileViewController');

  this.$onInit = () => {
    let section = $stateParams.section;

    this.showCreatePostBtn = section === 'timeline' || section === 'posts' || section === null;
    this.showCreatePageBtn = section === 'pages';
    this.showCreateRoomBtn = section === 'chat';

    console.log('section is ', this.section);
    switch(section) {
    case 'timeline':
      return this.fetchTimeline();
    case 'posts':
      return this.fetchFriendsPosts();
    case 'chat':
      return this.fetchMyRooms();
    case 'friends':
      this.fetchFRP();
      return this.fetchMyFriends();
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

  // this.fetchMyProfile = function(){
  //   $log.debug('profileItemCtrl.fetchMyProfile()');

  //   profileService.fetchProfile()
  //   .then( profile => this.myProfile = profile)
  //   .catch(err => $log.error('FAILED fetchMyProfile()', err));
  // };

  this.searchEnd = () => {
    //TODO
    //maybe add if !mouseover results then continue
    $timeout( () => {
      this.showResults = false;
      this.resultsArr = null;
    }, 200);
  };

  this.searchProfiles = () => {
    console.log('changing', this.searchName);
    if(this.searchName.split('').length > 3) {
      this.showResults = true;
      profileService.searchProfile(this.searchName)
      .then( profiles => {
        this.resultsArr = profiles.length > 0 ? profiles : [{ name: 'not found'}];
      });
    }
  };


  this.fetchFRP = function(){
    $log.debug('profileViewCtrl.fetchFRP()');

    profileService.fetchFriendReq(this.profile._id)
   .then( profiles => this.friendsReq = profiles.friendReq);
  };


  this.fetchMyFriends = function(){
    $log.debug('profileItemCtrl.fetchMyFriends()');

    profileService.fetchFriends(this.profile._id)
    .then( profile => {
      this.profiles = profile.friends;
    })
    .catch( err => console.log('Failed fetchMyFriends ', err));
  };

  this.fetchPage = function(){
    $log.debug('profileItemCtrl.fetchPage()');
    console.log('what us going on mate', this.profile);
    this.showCreatePage = true;

    pageService.fetchPagesByPID(this.profile._id)
    .then( pages => this.pages = pages)
    .catch( err => console.log('Failed fetchMyPages()', err));

  };

  this.fetchFriendsPosts = function(){
    $log.debug('profileItemCtrl.fetchFriendsPosts()');

    postService.fetchFriendsPosts()
    .then( posts => this.posts =  posts)
    .catch(err => console.log('Failed to fetch posts', err));
  };
  
  this.fetchTimeline = () => {
    $log.debug('profileItemCtrl.fetchTimeline()');

    this.showPostBtn = true;

    postService.fetchTimeline()
    .then( posts => this.posts =  posts)
    .catch(err => console.log('Failed to fetch posts', err));
  };

  this.fetchJoinedPages = () => {
    $log.debug('profileItemCtrl.fetchJoinedPages()');

    this.showCreatePage = true;

    profileService.fetchJoinedPages(this.profile._id)
    .then( profile =>  {
      // this.myProfile = profile;
      this.pages = profile.memberOf;
      console.log('this.pages', this.pages, profile.memberOf);
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
    this.showRooms = true;
    
    roomService.fetchMyRooms()
    .then( rooms => {
      console.log('rooms is like', rooms);
      this.rooms = rooms;
      this.room = rooms[0];
    });
  };

  this.chooseRoom = (id) => {
    let currRoom = this.rooms.filter(room => room._id == id)[0];
    return this.room = currRoom;
    // console.log('room is ', this.room);
  };

  this.goToAccount = () => {
    $location.url('settings/profile');
  };

  this.goToProfile = (id) => {
    console.log('going to profile #', id);
    $location.url(`/profile/${id}`);
  };
  this.bark = (id) => console.log('id is ',id);

  this.goToMyProfile = () => {
    $location.url(`/profile/${this.profile._id}`);
  };
  this.goToProfile = (id) => {
    $location.url(`/profile/${id}`);
  };

  this.acceptReq = function(id){
    profileService.acceptReq(id)
    .then( res => console.log('SUCCESS accepted friend req()', res))
    .catch( err => console.error('FAILED accepted friend req()', err));
  };

  this.unFriend = function(id){
    profileService.unFriend(id)
    .then( res => console.log('Success unFriend() ', res))
    .catch( err => console.log('Failed unFriend()', err));
  };


  this.goTo = (str) => {
    $location.url(`/social/${str}`);
  };


  this.openCreatePostModal =  () => {
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

  this.openCreatePageModal = () => {
    let profile = this.profile;
    $uibModal.open({
      animation: this.animationsEnabled,
      component: 'createPage',
      resolve: {
        profile: function () {
          return profile;
        }
      }
    });
  };

  this.openSettingsModal = function () {
    let room = { members:[]};
    $uibModal.open({
      animation: this.animationsEnabled,
      component: 'member',
      resolve: {
        room: function () {
          return room;
        }
      }
    })
    .result.then( res => {
      console.log("ROOMS", this.rooms, res, this.rooms);
      res.members.push(this.profile._id);
      this.rooms.forEach( (room, i) => {
        let sameMembers = room.members.every( member => res.members.some( m => m === member));
        let sameLength = room.members.length == res.members.length;
        let scanComplete = i == this.rooms.length - 1;
        console.log(sameMembers, sameLength);
        if( sameMembers && sameLength) {
          this.room = room;
          throw console.log('already there', room);
        }
        if(scanComplete && !sameMembers) {
          console.log('make a room', res);
          return roomService.createRoom(res)
          .then( room => {
            this.rooms.push(room);
            this.room = room;
          });
        }
      });

      if(this.rooms.length < 1) {
        console.log('when no rooms', res);
        return roomService.createRoom(res)
        .then( room => console.log('Successfully createRoom ', room));
      }
    });
  };


}

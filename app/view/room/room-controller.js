'use strict';

require('./_room.scss');

module.exports = ['$log', '$rootScope', '$stateParams', '$window', 'profileService','roomService','socketService', RoomController];

function RoomController($log, $rootScope, $stateParams, $window, profileService, roomService, socketService) {
  $log.debug('RoomController');
  
  this.$onInit = function(){
    $log.debug('roomController.oninit()');


    roomService.fetchMyRooms()
    .then( rooms => this.roomsArr = rooms)
    .then( () => {
      this.fetchRoom();
      this.fetchMyProfile();
    });
  };

  this.fetchMyProfile = function(){
    $log.debug('roomCtrl.fetchMyProfile');

    let profileID = $window.localStorage.getItem('profileID');
    profileService.fetchProfile2(profileID)
    .then( profile => this.profile = profile);
  };

  this.fetchRoom = function(){
    $log.debug('roomCtrl.fetchRoom');
    let roomID = $stateParams.roomID;
    this.oldroom = this.currRoom;
    roomService.fetchRoom(roomID) 
    .then( room => {
      let data = { old: roomID, new: room._id};
      socketService.emit('join room', data);
      this.currRoom = room;
    });
  };

  this.createRoom = function(){
    $log.debug('profileItemCtrl.createRoom()');

    roomService.createRoom()
    .then( room => console.log('Successfully createRoom ', room));
  };



}
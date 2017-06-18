'use strict';

require('./_room.scss');

module.exports = ['$log', '$rootScope', '$stateParams', '$window', 'profileService','roomService', RoomController];

function RoomController($log, $rootScope, $stateParams, $window, profileService, roomService) {
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
    console.log('_____________',profileID);
    profileService.fetchProfile2(profileID)
    .then( profile => this.profile = profile);
  };

  this.fetchRoom = function(){
    $log.debug('roomCtrl.fetchRoom');
    let roomID = $stateParams.roomID;
    this.oldroom = this.currRoom;
    roomService.fetchRoom(roomID) // todo -secure the room BE;
    .then( room => {
      this.currRoom = room;
      this.socket = io(`${__API_URL__}/chat`);

      this.socket.emit('join room', {oldroom: this.oldroom, newroom: this.currRoom._id});

    });
  };

  this.createRoom = function(){
    $log.debug('profileItemCtrl.createRoom()');

    roomService.createRoom()
    .then( room => console.log('Successfully createRoom ', room));
  };



}
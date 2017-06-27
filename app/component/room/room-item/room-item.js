'use strict';

require('./_room-item.scss');

module.exports = {
  template: require('./room-item.html'),
  controller: ['$log', '$location', '$stateParams', '$window','$uibModal', 'messageService', RoomItemController],
  controllerAs: 'roomItemCtrl',
  bindings: {
    room: '<',
    profile: '<',
    socket: '<'
  }
};


function RoomItemController($log, $location, $stateParams, $window, $uibModal, messageService){
  $log.debug('RoomItemController');

  this.msg = {};
  this.msgArr = [];

  this.$onInit = function(){
    console.log('ON INIT WORKING ?');
    console.log(this.room);
  };

  // const socket = io(`${__API_URL__}/chat`);

  // socket.join(this.room._id);

  this.createMsg = function(){
    $log.debug('roomItemCtrl.createMsg');
    this.msg.roomID = this.room._id;
    this.msg.posterID = this.profile._id;
    this.msg.name = this.profile.name;
    this.msg.profilePicURI = this.profile.profilePicURI;
    this.socket.emit('created msg', this.msg);

    this.socket.on('new msg', data => {
      console.log('ID', this.socket.id);
      this.msg = data;
      console.log('msg', this.msg);

      console.log('new message', data.content);
      this.msgArr.push(data);
      console.log(this.msgArr);
      return;
    });


  };

  


  this.bark = function(){
    console.log(this.room);
    console.log('prof', this.profile,
          'msgARr', this.socket);
  };



  this.openMemberModal= function ( profile) {

    var modalInstance = $uibModal.open({
      animation: this.animationsEnabled,
      component: 'member',
      resolve: {
        profile: function () {
          return profile;
        }
      }
    });
  };

  

}
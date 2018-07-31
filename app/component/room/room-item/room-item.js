'use strict';

require('./_room-item.scss');

module.exports = {
  template: require('./room-item.html'),
  controller: ['$log', '$location', '$stateParams', '$window','$uibModal', 'socketService', RoomItemController],
  controllerAs: 'roomItemCtrl',
  bindings: {
    room: '<',
    profile: '<',
    socket: '<'
  }
};


function RoomItemController($log, $location, $stateParams, $window, $uibModal, socketService){
  $log.debug('RoomItemController');

  this.msg = {};
  this.msgArr = [];


  this.createMsg = function(){
    $log.debug('roomItemCtrl.createMsg');
    this.msg.roomID = this.room._id;
    this.msg.posterID = this.profile._id;
    this.msg.name = this.profile.name;
    this.msg.profilePicURI = this.profile.profilePicURI;
    socketService.emit('created msg', this.msg);
  };

  socketService.on('new msg', data => {
    this.msgArr.push(data);
    return;
  });
  
  this.bark = function(){
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
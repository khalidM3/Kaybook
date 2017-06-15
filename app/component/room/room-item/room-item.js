'use strict';

require('./_room-item.scss');

module.exports = {
  template: require('./room-item.html'),
  controller: ['$log', '$location', '$stateParams', '$window','$uibModal', 'messageService', RoomItemController],
  controllerAs: 'roomItemCtrl',
  bindings: {
    room: '<',
    profile: '<'
  }
};


function RoomItemController($log, $location, $stateParams, $window, $uibModal, messageService){
  $log.debug('RoomItemController');

  this.msg = {};

  this.createMsg = function(){
    $log.debug('roomItemCtrl.createMsg');

    messageService.createMsg(this.room._id, this.msg)
    .then( msg => console.log('Successfuly created msg', msg));
  };

  this.bark = function(){
    console.log(this.msg.content);
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
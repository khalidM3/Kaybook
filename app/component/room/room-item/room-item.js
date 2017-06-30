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

  

  // this.$on('$locationChangeStart', function(event){
  //   socketService.disconnect(true);
  // });

  // const socket = io(`${__API_URL__}/chat`);

  // socket.join(this.room._id);

  this.createMsg = function(){
    $log.debug('roomItemCtrl.createMsg');
    this.msg.roomID = this.room._id;
    this.msg.posterID = this.profile._id;
    this.msg.name = this.profile.name;
    this.msg.profilePicURI = this.profile.profilePicURI;
    socketService.emit('created msg', this.msg);
  };

  socketService.on('new msg', data => {
    console.log('ID', socketService.id);
    // this.msg = data;
    // console.log('msg', this.msg);

    console.log('new message', data.content);
    this.msgArr.push(data);
    console.log(this.msgArr);
    return;
  });
  


  this.bark = function(){
    console.log(this.room);
    // console.log('prof', this.profile,
          // 'msgARr', socketService);
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
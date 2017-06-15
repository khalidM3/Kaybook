'use strict';

require('./_room-tile.scss');

module.exports = {
  template: require('./room-tile.html'),
  controller: ['$log', '$location', '$stateParams', '$window', 'profileService', RoomTileController],
  controllerAs: 'roomTileCtrl',
  bindings: {
    room: '<'
  }
};


function RoomTileController($log, $location, $stateParams, $window, profileService){
  $log.debug('RoomTileController');

  this.goToRoom = function(){
    $log.debug('roomTileCtrl.goToRoom()');

    console.log(this.room._id);
    $location.url( `/room/${this.room._id}`);
  };

}
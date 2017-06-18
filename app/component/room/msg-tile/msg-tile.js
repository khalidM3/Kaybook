'use strict';

require('./_msg-tile.scss');

module.exports = {
  template: require('./msg-tile.html'),
  controller: ['$log', '$location', '$stateParams', '$window', MsgTileController],
  controllerAs: 'msgTileCtrl',
  bindings: {
    msg: '=',
    profile: '<'
  }
};


function MsgTileController($log, $location, $stateParams, $window){
  $log.debug('RoomItemController');

}
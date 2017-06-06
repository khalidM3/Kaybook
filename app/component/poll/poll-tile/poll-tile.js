'use strict';

require('./_poll-tile.scss');

module.exports = {
  template: require('./poll-tile.html'),
  controller: ['$log', '$location', PollTileController],
  controllerAs: 'pollTileCtrl',
  bindings: {
    poll: '<'
  }
};

function PollTileController($log, $location) {
  $log.debug('PollTileController');
  
  this.goToPoll = function(){
    $log.debug('pollTileCtrl.goToPoll()');

    $location.url(`/poll/${this.poll._id}`);
  };

}
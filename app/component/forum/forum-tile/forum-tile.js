'use strict';

require('./_forum-tile.scss');

module.exports = {
  template: require('./forum-tile.html'),
  controller: ['$log', '$location', FormTileController],
  controllerAs: 'forumTileCtrl',
  bindings: {
    forum: '<'
  }
};

function FormTileController($log, $location) {
  $log.debug('FormTileController');
  
  this.goToForum = function(){
    $log.debug('forumTileCtrl.goToForum()');

    $location.url(`/forum/${this.forum._id}`);
  };

}
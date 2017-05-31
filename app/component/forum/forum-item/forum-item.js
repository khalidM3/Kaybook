'use strict';

require('./_forum-item.scss');

module.exports = {
  template: require('./forum-item.html'),
  controller: ['$log', '$window', '$stateParams', 'forumService', ForumItemController],
  controllerAs: 'forumItemCtrl',
  // bindings: {
  //   page: '<'
  // }
};


function ForumItemController($log, $window, $stateParams, forumService){
  $log.debug('ForumItemController');

  this.forumID = $stateParams.forumID;

  this.$onInit = function(){
    $log.debug('forumItemCtrl.onInit()');

    forumService.fetchForum(this.forumID)
    .then( forum => this.forum =  forum)
    .catch(err => console.log('failed fetchForum()', err));
  };


}
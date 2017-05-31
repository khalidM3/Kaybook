'use strict';

require('./_create-forum.scss');

module.exports = {
  template: require('./create-forum.html'),
  controller: ['$log', '$window', 'forumService', CreateForumController],
  controllerAs: 'createForumCtrl',
  bindings: {
    page: '<',
    onPostCreated: '&',
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

function CreateForumController($log, $window, forumService) {
  $log.debug('CreateForumController');

  this.forum = {};
  
  this.createForum = function(){
    $log.debug('createForumCtrl.createForum()');

    forumService.createForum(this.resolve.page._id, this.forum)
    .then( forum => console.log('Success createForum()', forum))
    .catch(err => console.log('Failed createForum()', err));
  };

  this.cancel = function () {
    // this.dismiss({$value: 'cancel'});
    console.log(
      'page', this.resolve.page,
      'forum', this.forum
    );
  };
}
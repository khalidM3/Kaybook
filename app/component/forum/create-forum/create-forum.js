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

    let profileID = $window.localStorage.getItem('profileID');
    let admin = profileID === this.resolve.page.profileID;

    if( !admin ) {
      forumService.createForum(this.resolve.page._id, this.forum)
      .then( forum => console.log('Success createForum()', forum))
      .catch(err => console.log('Failed createForum()', err));
    }

    if( admin ) {
      forumService.createForumFeed(this.resolve.page._id, this.forum)
      .then( forum => console.log('Success createForumFeed()', forum))
      .catch(err => console.log('Failed createForumFeed()', err));
    }
    
  };

  this.cancel = function () {
    this.dismiss({$value: 'cancel'});
  };



}
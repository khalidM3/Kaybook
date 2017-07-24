'use strict';

require('./_create-forum.scss');

module.exports = {
  template: require('./create-forum.html'),
  controller: ['$log', '$window', 'postService', CreateForumController],
  controllerAs: 'createForumCtrl',
  bindings: {
    page: '<',
    onPostCreated: '&',
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

function CreateForumController($log, $window, postService) {
  $log.debug('CreateForumController');

  this.question = {};
  this.question.type='question';
  
  this.createQuestion = function(){
    $log.debug('createForumCtrl.createForum()');

    let profileID = $window.localStorage.getItem('profileID');
    let admin = profileID === this.resolve.page.profileID;

    if( !admin ) {
      postService.createPost(this.resolve.page._id, this.question)
      .then( question => console.log('Success createPost()', question))
      .catch(err => console.log('Failed createPost()', err));
    }

    if( admin ) {
      postService.createFeed(this.resolve.page._id, this.question)
      .then( question => console.log('Success createForumFeed()', question))
      .catch(err => console.log('Failed createForumFeed()', err));
    }
    
  };

  this.cancel = function () {
    this.dismiss({$value: 'cancel'});
  };



}
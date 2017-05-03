'use strict';

require('./_create-post.scss');

module.exports = {
  template: require('./create-post.html'),
  controller: ['$log', '$location', '$rootScope', 'postService', CreatePostController],
  controllerAs: 'createPostCtrl',
  bindings: {
    profile: '<',
    onPostCreated: '&'
  }
};

function CreatePostController($log, $location, $rootScope, postService) {
  $log.debug('CreatePostController');

  $log.debug('HERE !!!',this.profile);

  this.post = {};

  this.createPost = function() {
    $log.debug('CreatePostController.createPost()');

    $log.debug('HERE 2!!!',this.profile);
    console.log('POST>>', this.post);

    postService.createPost(this.profile._id, this.post)
    .then( () => {
      this.post = null;
      this.onPostCreated();
    })
    .catch( () => {
      return alert('Sorry, you are not a member!');
    });
  };

}

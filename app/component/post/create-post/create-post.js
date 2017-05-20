'use strict';

require('./_create-post.scss');

module.exports = {
  template: require('./create-post.html'),
  controller: ['$log', '$location', '$rootScope', 'postService', CreatePostController],
  controllerAs: 'createPostCtrl',
  bindings: {
    profile: '<',
    onPostCreated: '&',
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

function CreatePostController($log, $location, $rootScope, postService) {
  $log.debug('CreatePostController');

  $log.debug('HERE !!!',this.profile);

  this.post = {};

  // this.profile = this.resolve.items;

  this.createPost = function() {
    $log.debug('CreatePostController.createPost()');

    $log.debug('HERE 2!!!',this.profile);
    console.log('POST>>', this.resolve);

    postService.createPost(this.resolve.items._id, this.post)
    .then( () => {
      this.post = null;
      this.onPostCreated();
    })
    .catch( () => {
      return alert('Sorry, you are not a member!');
    });
  };

  this.ok = function () {
    this.close({$value: this.selected.item});
  };

  this.cancel = function () {
    this.dismiss({$value: 'cancel'});
  };

}

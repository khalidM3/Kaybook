'use strict';

require('./_create-post.scss');

module.exports = {
  template: require('./create-post.html'),
  controller: ['$log', '$location', '$rootScope', 'postService', 'picService', CreatePostController],
  controllerAs: 'createPostCtrl',
  bindings: {
    profile: '<',
    onPostCreated: '&',
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

function CreatePostController($log, $location, $rootScope, postService, picService) {
  $log.debug('CreatePostController');

  $log.debug('HERE !!!',this.profile);

  this.post = {};

  // this.profile = this.resolve.items;

  this.createPost = function() {
    $log.debug('CreatePostController.createPost()');

    $log.debug('HERE 2!!!',this.profile);
    console.log('POST>>', this.resolve);

    postService.createPost(this.resolve.profile._id, this.post)
    .then( post => {
      console.log('res.post  CAPITAL', post._id);
      return picService.uploadPostPic(post, this.uploadedPost);
    })
    .then( () => {
      this.post = null;
      this.uploadPost = null;
      this.onPostCreated();
    })
    .then( () => this.cancel())
    .catch( () => {
      this.post = null;
      this.uploadPost = null;
      return alert('Sorry, you are not a member!');
    });
  };

  // this.ok = function () {
  //   this.close({$value: this.selected.item});
  // };

  this.cancel = function () {
    this.dismiss({$value: 'cancel'});
  };

}

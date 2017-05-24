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
  this.uploadedPost = {};

  // this.profile = this.resolve.items;
  this.bark = function(){
    console.log('BARK! BARK! Bark!', this.post);
    console.log('UPload', this.uploadedPost);
    // for(var prop in this.uploadedPost) var hasProp = this.uploadedPost[prop];
    console.log('uploadedPost present', this.uploadedPost.name);
  };


  this.createPost = function() {
    $log.debug('CreatePostController.createPost()');

    // $log.debug('HERE 2!!!',this.profile);
    // console.log('POST>>', this.resolve);

    postService.createPost(this.resolve.page._id, this.post)
    .then( post => {
      console.log('res.post  CAPITAL', post._id);
      console.log('uploadedPost', this.uploadedPost);
      if( this.uploadedPost.name) picService.uploadPostPic(post._id, this.uploadedPost);
      return;
    })
    .then( () => {
      this.post = null;
      this.uploadPost = null;
      this.onPostCreated();
    })
    .then( () => this.cancel())
    .catch( err => {
      this.post = null;
      this.uploadPost = null;
      console.log('the error', err);
    });
  };

  // this.ok = function () {
  //   this.close({$value: this.selected.item});
  // };

  this.cancel = function () {
    this.dismiss({$value: 'cancel'});
  };

}

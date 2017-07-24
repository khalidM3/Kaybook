'use strict';

require('./_create-post.scss');

module.exports = {
  template: require('./create-post.html'),
  controller: ['$log', '$location', '$rootScope', '$window', 'postService', 'picService', CreatePostController],
  controllerAs: 'createPostCtrl',
  bindings: {
    onPostCreated: '&',
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

function CreatePostController($log, $location, $rootScope, $window, postService, picService) {
  $log.debug('CreatePostController');

  $log.debug('HERE !!!',this.profile);

  this.post = {};
  this.post.type = 'pic';
  this.uploadedPost = {};

  // this.profile = this.resolve.items;
  this.bark = function(){
    console.log('profile', this.resolve.page.profileID);
    let profileID = $window.localStorage.getItem('profileID');
    console.log(profileID === this.resolve.page.profileID);
  };


  this.createPost = function() {
    $log.debug('CreatePostController.createPost()');

    let profileID = $window.localStorage.getItem('profileID');
    // todo - change to array of admin profile ID's
    // let admin = this.resolve.page.admins.some(PID => PID.toString() === profileID);
    if(profileID === this.resolve.page.profileID ) {
      postService.createFeed(this.resolve.page._id, this.post)
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
    }

    if(profileID !== this.resolve.page.profileID) {
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
    }

  };

  // this.ok = function () {
  //   this.close({$value: this.selected.item});
  // };

  this.cancel = function () {
    this.dismiss({$value: 'cancel'});
  };

}

'use strict';

require('./_edit-post.scss');

module.exports = {
  template: require('./edit-post.html'),
  controller: ['$log', '$location', '$rootScope', 'postService', 'picService', EditPostController],
  controllerAs: 'editPostCtrl',
  bindings: {
    profile: '<',
    onPostCreated: '&',
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

function EditPostController($log, $location, $rootScope, postService, picService) {
  $log.debug('EditPostController');

  $log.debug('HERE !!!',this.profile);

  this.post = {};
  this.upload = {};

  // this.profile = this.resolve.items;

  // this.updatePost = function() {
  //   $log.debug('EditPostController.editPost()');

  //   // service.updatePost = function(postID, postData) {};
  //   console.log('THIS.POST <><><><><><><><><>', this.post);
  //   postService.updatePost(this.resolve.post._id, this.post)
  //   .then( post => {
  //     console.log('res.post  CAPITAL', post._id);
  //     return picService.uploadPostPic(post, this.uploadedPost);
  //   })
  //   .then( () => {
  //     this.post = null;
  //     this.uploadPost = null;
  //     this.onPostCreated();
  //   })
  //   .then( () => this.cancel())
  //   .catch( () => {
  //     return alert('Sorry, you are not a member!');
  //   });
  // }; 
  this.updatePostPic = function(){
    return picService.uploadPostPic(this.resolve.post, this.upload)
    .then( () => {
      this.upload = null;
      this.onPostCreated();
    })
    .catch( err => {
      $log.error('update post pic FAILED', err);
    }); 
  };

  this.updatePostDesc = function(){
    return postService.updatePost(this.resolve.post._id, this.post)
    .then( () => {
      this.post = null;
      this.onPostCreated();
    })
    .catch( err => {
      $log.error('update post desc FAILED', err);
    });
  };


  this.updatePost = function() {
    $log.debug('EditPostController.editPost()');

    if(this.post.description) this.updatePostDesc();
    if(this.upload) this.updatePostPic();

    // // service.updatePost = function(postID, postData) {};
    // console.log('THIS.POST <><><><><><><><><>', this.post);
    // postService.updatePost(this.resolve.post._id, this.post)
    // .then( post => {
    //   console.log('res.post  CAPITAL', post._id);
    //   return picService.uploadPostPic(post, this.uploadedPost);
    // })
    // .then( () => {
    //   this.post = null;
    //   this.uploadPost = null;
    //   this.onPostCreated();
    // })
    // .then( () => this.cancel())
    // .catch( () => {
    //   return alert('Sorry, you are not a member!');
    // });
    return;
  }; 


  // this.ok = function () {
  //   this.close({$value: this.selected.item});
  // };

  this.cancel = function () {
    this.dismiss({$value: 'cancel'});
  };

}

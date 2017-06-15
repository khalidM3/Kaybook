'use strict';

require('./_post-item.scss');

module.exports = {
  template: require('./post-item.html'),
  controller: ['$log', 'postService', 'profileService', 'commentService', PostItemController],
  controllerAs: 'postItemCtrl',
  bindings: {
    loggedIn: '<',
    profile: '<',
    onpostChange: '&',
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

function PostItemController($log, postService, profileService, commentService){
  $log.debug('postItemController');

  
// posts.data are resolve.post

  this.showEditpost = false;
  this.showCreateComment = false;

  this.$onInit = function() {
    $log.debug('postItemController.$onInit()');
    
    if (this.resolve.post) return this.updatePostView();
    return this.onpostChange();
  };

  this.updatePostItemView = function() {
    $log.debug('postItemController.updatePostItemView', this.post);

    this.onpostChange();
  };

  // this.deletepost = function(post){
  //   $log.debug('postItemController.deletepost');

  //   postService.deletepost(post)
  //   .then(this.onpostChange());
  // };

  // this.posterf = function() {
  //   $log.debug('postItemController.poster',this.resolve.post.posterPID);

  //   profileService.fetchProfile2(this.resolve.post.posterPID)
  //   .then(profile => {
  //     console.log('HERE IT IS MATE',this.resolve.post.posterPID);
  //     this.poster = profile;
  //     return this.poster;
  //   });
  // };

  this.updatePostView = function(){
    $log.debug('PostItemController.updatePost');

  
    console.log('RESOLVE {}::', this.resolve);

    // this.showCreateComment = true;
    this.isVid = (/\.mp4$/).test(this.resolve.post.postPicURI);
    this.commentArr = [];
    // this.showCommentField = false;

    $log.debug('this.post >>');

    // postService.fetchPost(this.resolve.post._id)
    // .then( post => this.post = post.data)
    // .then( () => profileService.fetchProfile2(this.post.posterPID))
    profileService.fetchProfile2(this.resolve.post.posterPID)
    .then(profile => {
      this.poster = profile;
    })
    .then( () => {
      if (this.resolve.post.comments.length < 1) return;
      commentService.fetchPostComments(this.resolve.post._id)
        .then( post => this.commentArr = post.comments)
        .catch( err => console.log('FAILED fetch post comments', err));
    })
    .catch(err => $log.error(err.message));
  };

  this.likePost = function(){
    $log.debug('postItemCtrl.likePost()');

    postService.likePost(this.resolve.post._id)
    .then( post => this.resolve.post =  post)
    .catch( err => console.log('Failed likePost()', err));
  };

  this.unLikePost = function() {
    $log.debug('postItemCtrl.unLikePost()');

    postService.unLikePost(this.resolve.post._id)
    .then( post => console.log('Successfuly unLikedPost()', post))
    .catch( err => console.log('Failed unLikePost()', err));
  };

  this.dislikePost = function() {
    $log.debug('postItemCtrl.dislikePost()');

    postService.dislikePost(this.resolve.post._id)
    .then( post => console.log('Successfuly dislikedPost()', post))
    .catch( err => console.log('Failed dislikePost()', err));
  };


  this.cancel = function () {
    this.dismiss({$value: 'cancel'});
  };
}

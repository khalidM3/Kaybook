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
  this.bark = function(){
    console.log('BARK BARK BARK');
  };

  this.deletepost = function(post){
    $log.debug('postItemController.deletepost');

    postService.deletepost(post)
    .then(this.onpostChange());
  };

  this.posterf = function() {
    $log.debug('postItemController.poster',this.resolve.post.posterPID);

    profileService.fetchProfile2(this.resolve.post.posterPID)
    .then(profile => {
      console.log('HERE IT IS MATE',this.resolve.post.posterPID);
      this.poster = profile;
      return this.poster;
    });
  };

  this.updatePostView = function(){
    $log.debug('PostItemController.updatePost');

    console.log('RESOLVE {}::', PostItemController.resolve);

    this.showCreateComment = true;
    this.commentArr = [];
    this.showCommentField = false;

    $log.debug('this.post >>');

    // postService.fetchPost(this.resolve.post._id)
    // .then( post => this.post = post.data)
    // .then( () => profileService.fetchProfile2(this.post.posterPID))
    profileService.fetchProfile2(this.resolve.post.posterPID)
    .then(profile => {
      console.log('PROFILE >>>', profile);
      this.profilePic = profile.profilePicURI;
      this.profileName = profile.name;
    })
    .then( () => {
      if (this.resolve.post.comments.length !== 0) {
        this.resolve.post.comments.forEach(commentID => {
          console.log('CommentID HERE!!!',commentID);
          commentService.fetchComment(commentID)
          .then(commentObj => this.commentArr.push(commentObj));
        });
      }
    })
    .catch(err => $log.error(err.message));
  };

  // this.updatePostView();
  // this.poster();

  this.$onInit = function() {
    $log.debug('postItemController.$onInit()');
    
    if (this.resolve.post) return this.posterf();
    return this.onpostChange();
  };

  this.updatePostItemView = function() {
    $log.debug('postItemController.updatePostItemView', this.post);

    this.onpostChange();
  };
}

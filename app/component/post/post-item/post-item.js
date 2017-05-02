'use strict';

require('./_post-item.scss');

module.exports = {
  template: require('./post-item.html'),
  controller: ['$log', 'postService', 'profileService', 'commentService', PostItemController],
  controllerAs: 'postItemCtrl',
  bindings: {
    post: '<',
    loggedIn: '<',
    profile: '<',
    onpostChange: '&',
  }
};

function PostItemController($log, postService, profileService, commentService){
  $log.debug('postItemController');


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
    $log.debug('postItemController.poster', this.post.posterPID);

    profileService.fetchProfile2(this.post.data.posterPID)
    .then(profile => {
      console.log('HERE IT IS MATE',this.post.data.posterPID);
      this.poster = profile;
      return this.poster;
    });
  };

  this.updatePostView = function(){
    $log.debug('PostItemController.updatePost');

    this.showCreateComment = true;
    this.commentArr = [];
    this.showCommentField = false;

    $log.debug('this.post >>');

    // postService.fetchPost(this.post.data._id)
    // .then( post => this.post = post.data)
    // .then( () => profileService.fetchProfile2(this.post.posterPID))
    profileService.fetchProfile2(this.post.data.posterPID)
    .then(profile => {
      console.log('PROFILE >>>', profile);
      this.profilePic = profile.profilePicURI;
      this.profileName = profile.name;
    })
    .then( () => {
      if (this.post.data.comments.length !== 0) {
        this.post.data.comments.forEach(commentID => {
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
    
    if (this.post) return this.posterf();
    return this.onpostChange();
  };

  this.updatePostItemView = function() {
    $log.debug('postItemController.updatePostItemView', this.post);

    this.onpostChange();
  };
}

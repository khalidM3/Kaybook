'use strict';

require('./_comment-item.scss');

module.exports = {
  template: require('./comment-item.html'),
  controller: ['$log', '$window', 'commentService', 'profileService', CommentItemController],
  controllerAs: 'commentItemCtrl',
  bindings: {
    comment: '<',
    loggedIn: '<',
    profile: '<',
    onCommentChange: '&'
  }
};

function CommentItemController($log, $window, commentService, profileService){
  $log.debug('CommentItemController');

  this.showEditComment = false;

  this.check = function(){
    let userID = $window.localStorage.getItem('userID');
    profileService.fetchProfile(userID)
    .then( profile => {
      this.authorized = profile._id.toString() === this.comment.commenterProfileID;
    });
  };
  this.check();

  this.deleteComment = function(){
    $log.debug('CommentItemController.deleteComment');

    commentService.deleteComment(this.comment)
    .then(this.onCommentChange());
  };

  this.commenter = function() {
    $log.debug('CommentItemController.commenter', this.comment.commenterProfileID);

    profileService.fetchProfile2(this.comment.commenterProfileID)
    .then(profile => this.commenter = profile);
  };

  this.$onInit = function() {
    $log.debug('CommentItemController.$onInit()');
    
    if (this.comment) return this.commenter();
    return this.onCommentChange();
  };

  this.updateCommentItemView = function() {
    $log.debug('CommentItemController.updateCommentItemView', this.comment);

    this.onCommentChange();
  };
}

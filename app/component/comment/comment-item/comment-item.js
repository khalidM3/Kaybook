'use strict';

require('./_comment-item.scss');

module.exports = {
  template: require('./comment-item.html'),
  controller: ['$log', 'commentService', 'profileService', CommentItemController],
  controllerAs: 'commentItemCtrl',
  bindings: {
    comment: '<',
    loggedIn: '<',
    profile: '<',
    onCommentChange: '&',
  }
};

function CommentItemController($log, commentService, profileService){
  $log.debug('CommentItemController');

  this.showEditComment = false;

  this.deleteComment = function(comment){
    $log.debug('CommentItemController.deleteComment');

    commentService.deleteComment(comment)
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

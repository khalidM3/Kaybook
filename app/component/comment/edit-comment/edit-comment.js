'use strict';

require('./_edit-comment.scss');

module.exports = {
  template: require('./edit-comment.html'),
  controller: ['$log', 'commentService', EditCommentController],
  controllerAs: 'editCommentCtrl',
  bindings: {
    comment: '<',
    loggedIn: '<',
    onCommentEdited: '&'
  }
};


function EditCommentController($log, commentService){
  $log.debug('EditCommentController');
  console.log('inside editCommentController :::::::::');

  this.editComment = function(){
    let commentData = {
      comment: this.commentUpdate
    };

    commentService.updateComment(this.comment._id, commentData)
    .then( () => this.onCommentEdited());
  };
}

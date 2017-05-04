'use strict';

require('./_create-comment.scss');

module.exports = {
  template: require('./create-comment.html'),
  controller: ['$log', 'commentService', CreateCommentController],
  controllerAs: 'createCommentCtrl',
  bindings: {
    post: '<',
    onCommentCreated: '&',
    loggedIn: '<'
  }
};

function CreateCommentController($log, commentService){
  $log.debug('createCommentController');

  this.createComment = function(){
    let commentData = {
      comment: this.comment
    };
    
    commentService.createComment(this.post, commentData)
    .then( () => {
      this.onCommentCreated();
      this.comment = null;
    });
  };
}

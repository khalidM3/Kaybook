'use strict';

require('./_answer-item.scss');

module.exports = {
  template: require('./answer-item.html'),
  controller: ['$log', '$window', '$stateParams', 'answerService', 'profileService', AnswerItemController],
  controllerAs: 'answerItemCtrl',
  bindings: {
    answer: '=',
    parent: '=',
    post: '='
  }
};


function AnswerItemController($log, $window, $stateParams, answerService, profileService){
  $log.debug('AnswerItemController');

  // this.forumID = $stateParams.forumID;


  this.$onInit = function(){
    $log.debug('answerItemCtrl.onInit()');

    let profileID = $window.localStorage.getItem('profileID');
    this.showDeleteBtn = profileID === this.answer.posterID;

    profileService.fetchProfile2(this.answer.posterID)
    .then( profile => this.poster = profile);
  };

  this.upvote = function(){
    $log.debug('answerItemCtrl.upvote()');

    answerService.upvoteAnswer(this.answer._id)
    .then( answer => this.answer =  answer)
    .catch(err => console.log('Failed to upvoteAnswer()',err));
  };

  this.downvote = function(){
    $log.debug('answerItemCtrl.downvote()');

    answerService.downvoteAnswer(this.answer._id)
    .then( answer => this.answer = answer)
    .catch(err => console.log('Failed to downvoteAnswer()',err));
  };

  this.unvote = function(){
    $log.debug('answerItemCtrl.unvote()');

    answerService.unvoteAnswer(this.answer._id)
    .then( answer => this.answer =  answer)
    .catch(err => console.log('Failed to unvoteAnswer()',err));
  };

  this.fetchReplies = function(){
    $log.debug('answerIteCtrl.fetchReplies()');

    answerService.fetchAnswerReplies(this.answer._id)
    .then( answer => {
      this.answer = answer;
      console.log('AR +++++++++++++++++');
      console.log(answer.replies);
      return this.repliesArr = answer.replies;
    })
    .catch(err => console.log('Failed to unvoteAnswer()',err));
  };

  this.deleteAnswer = function(){
    $log.debug('answerItemCtrl.deleteAnswer()');

    if(this.parent) {
      return answerService.deleteReply(this.answer._id)
      .then( answer =>  {
        this.parent = answer;
        this.answer = null;
        return;
      })
      .catch( err => console.log('Failed to delete a reply', err));
    }

    return answerService.deleteAnswer(this.answer._id)
    .then( forum => console.log('Successfuly deleted answer', forum))
    .catch( err => console.log('Failed to delet an answer', err));
  };

}


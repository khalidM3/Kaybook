'use strict';

require('./_answer-item.scss');

module.exports = {
  template: require('./answer-item.html'),
  controller: ['$log', '$window', '$uibModal', 'answerService', AnswerItemController],
  controllerAs: 'answerItemCtrl',
  bindings: {
    answer: '=',
    parent: '=',
    post: '=',
  }
};


function AnswerItemController($log, $window, $uibModal, answerService){
  $log.debug('AnswerItemController');


  
  this.$onInit = function(){
    $log.debug('answerItemCtrl.onInit()');
    this.showReply = false;
    this.profile = $window.localStorage.getItem('profile');
    this.showDeleteBtn = this.profile === this.answer.posterID;
    this.poster = this.answer.posterID;
    this.isQuest = this.post.type === 'question';
    this.updatedAnswer = this.answer;
  };

  this.parseStr = (str) => {
    let urlReg = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    let imgReg = /\.(?:jpe?g|gif|png)$/i;
    let hash = /#(?:\w)\w*/g;
    
    return str.split(' ').map( word => ({
      type: word.match(urlReg) || word.match(hash)
              ? word.match(imgReg) ? 'img' : 'link'
              : 'string',
      payload: word,
      link:  word.match(hash) ? `http://localhost:8080/#!/hash/${word.split('#')[1]}`: word,
      size: {}
    }));
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

    console.log('_ANSWER_: ', this.answer.replies);
    if(!this.repliesArr) {
      console.log('first');
      answerService.fetchAnswerReplies(this.answer._id)
      .then( answer => {
        this.answer = answer;
        return this.repliesArr = answer.replies;
      })
      .catch(err => console.log('Failed to fetchAnswer()',err));
    }

    if(this.repliesArr.length < 1) {
      return this.repliesArr = this.answer.replies;
    }

    return this.repliesArr = [];

  };

  this.report = () => {
    let answer = this.answer;
    $uibModal.open({
      animation: this.animationsEnabled,
      component: 'report',
      resolve: {
        answer: function () {
          return answer; 
        }
      }
    });
  };

  this.setupEdit = () => {
    this.editAnswer = true;
    this.updatedAnswer = this.answer;
  };

  this.edit = () => {
    answerService.updateAnswer(this.answer._id, this.updatedAnswer);
  };

  
  this.delete = function(){
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


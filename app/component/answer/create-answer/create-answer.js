'use strict';

require('./_create-answer.scss');

module.exports = {
  template: require('./create-answer.html'),
  controller: ['$log', '$window','answerService', CreateAnswerController],
  controllerAs: 'createAnswerCtrl',
  bindings: {
    post: '<',
    answer: '<',
    showreply: '=',
  }
};

function CreateAnswerController($log, $window, answerService) {
  $log.debug('CreateAnswerController');

  this.answerData = {};

  this.$onInit = () => {
    this.profile = JSON.parse($window.localStorage.profile);
    this.showreply = this.showreply || false;
  };

  this.bark = () => console.log('show reply', this.showreply);

  this.createAnswer = function(){
    $log.debug('createAnswerCtrl.createAnswer()');
    if(this.post) {
      answerService.createAnswer(this.post._id, this.answerData)
    .then( post => console.log('Successfully created answer', post))
    .catch( err => console.log('FAiled to createAnswer', err));
    }
  
    if(this.answer) {
      this.answerData.level = this.answer.level + 1;
      let full = this.answer.level > 2;
      if(full)this.answerData.answer = '@'+this.answer.posterID.name+' '+this.answerData.answer;
      answerService.replyAnswer(full ? this.answer.postedID :this.answer._id, this.answerData)
    .then( forum => console.log('Successfully replied answer', forum))
    .catch( err => console.log('FAiled to reply to Answer', err));
    }

  };

}
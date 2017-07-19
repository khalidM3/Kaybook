'use strict';

require('./_create-answer.scss');

module.exports = {
  template: require('./create-answer.html'),
  controller: ['$log', '$window', 'answerService', CreateAnswerController],
  controllerAs: 'createAnswerCtrl',
  bindings: {
    post: '<',
    answer: '<'
  }
};

function CreateAnswerController($log, $window, answerService) {
  $log.debug('CreateAnswerController');

  this.answerData = {};

  this.createAnswer = function(){
    $log.debug('createAnswerCtrl.createAnswer()');
    console.log('post =============|>', this.post, this.answerData);
    if(this.post) {
      answerService.createAnswer(this.post._id, this.answerData)
    .then( post => console.log('Successfully created answer', post))
    .catch( err => console.log('FAiled to createAnswer', err));
    }
  
    if(this.answer) {
      answerService.replyAnswer(this.answer._id, this.answerData)
    .then( forum => console.log('Successfully replied answer', forum))
    .catch( err => console.log('FAiled to reply to Answer', err));
    }
  
  
  };

}
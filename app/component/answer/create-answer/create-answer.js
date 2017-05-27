'use strict';

require('./_create-answer.scss');

module.exports = {
  template: require('./create-answer.html'),
  controller: ['$log', '$window', 'answerService', CreateAnswerController],
  controllerAs: 'createAnswerCtrl',
  bindings: {
    forum: '<',
  }
};

function CreateAnswerController($log, $window, answerService) {
  $log.debug('CreateAnswerController');

  this.answerData = {};

  this.createAnswer = function(){
    $log.debug('createAnswerCtrl.createAnswer()');

    answerService.createAnswer(this.forum._id, this.answerData)
    .then( forum => console.log('Successfully created answer', forum))
    .catch( err => console.log('FAiled to createAnswer', err));
  };

}
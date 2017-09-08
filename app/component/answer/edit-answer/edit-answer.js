'use strict';

require('./_edit-answer.scss');

module.exports = {
  template: require('./edit-answer.html'),
  controller: ['$log', '$window','$document', 'answerService', EditAnswerController],
  controllerAs: 'editAnswerCtrl',
  bindings: {
    post: '<',
    answer: '<'
  }
};

function EditAnswerController($log, $window, $document, answerService) {
  $log.debug('EditAnswerController');

  this.editAnswer = () => {
    answerService.editAnswer()
    .then( answer => console.log(answer));
  };
  
}
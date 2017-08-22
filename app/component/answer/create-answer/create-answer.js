'use strict';

require('./_create-answer.scss');

module.exports = {
  template: require('./create-answer.html'),
  controller: ['$log', '$window','$document', 'answerService', CreateAnswerController],
  controllerAs: 'createAnswerCtrl',
  bindings: {
    post: '<',
    answer: '<'
  }
};

function CreateAnswerController($log, $window, $document, answerService) {
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
      this.answerData.level = this.answer.level + 1;
      let full = this.answer.level > 2;
      if(full)this.answerData.answer = '@'+this.answer.posterID.name+' '+this.answerData.answer;
      console.log('reply ==> ', full, this.answerData.answer);
      answerService.replyAnswer(full ? this.answer.postedID :this.answer._id, this.answerData)
    .then( forum => console.log('Successfully replied answer', forum))
    .catch( err => console.log('FAiled to reply to Answer', err));
    }
  };

  // this.parseURL = (str ) => {
  //   console.log('str\n',str);
  //   let urlReg = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  //   let imgReg = /\.(?:jpe?g|gif|png)$/i;
  //   let parsed = str.replace(urlReg, (match) => {
  //     console.log('match\n',match);
  //     return imgReg.test(match) ? '<img src="'+match+'" class="thumb" />' : '<a href="'+match+'" target="_blank">'+match+'</a>';
  //   });
  //   $window.document.getElementById('cont').innerHTML = parsed;
  // };

  // this.check = () => {
  //   this.answerData.answer = this.answerData.answer.replace(
  //     /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-]).(jpg|png)/g,
  //     (match) => '<img src="'+ match +'" />'
  //   );

    

  // };

  // this.wtf = () => {
  //   console.log('changing');
  //   console.log(this.parseURL(this.answerData.answer));
  //   // this.answerData.answer = this.parseURL(this.answerData.answer);
  //   this.parseURL(this.answerData.answer);
  //   // $window.document.getElementById('cont').innerHTML = this.parseURL(this.answerData.answer);
  // };

}
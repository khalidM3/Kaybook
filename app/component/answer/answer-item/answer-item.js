'use strict';

require('./_answer-item.scss');

module.exports = {
  template: require('./answer-item.html'),
  controller: ['$log', '$window', '$filter', 'answerService', 'profileService', AnswerItemController],
  controllerAs: 'answerItemCtrl',
  bindings: {
    answer: '=',
    parent: '=',
    post: '='
  }
};


function AnswerItemController($log, $window, $filter, answerService, profileService){
  $log.debug('AnswerItemController');

  // this.forumID = $filter.forumID;


  this.$onInit = function(){
    $log.debug('answerItemCtrl.onInit()');
    // console.log('\n\n==>',$window.document.getElementById(this.answer._id));
    // $window.document.getElementById(this.answer._id).innerHTML = this.parseURL(this.answer.answer);
    let profileID = $window.localStorage.getItem('profileID');
    this.showDeleteBtn = profileID === this.answer.posterID;
    profileService.fetchProfile2(this.answer.posterID)
    .then( profile => this.poster = profile);
  };

  this.parseURL = (str ) => {
    console.log('str\n',str);
    let urlReg = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    let imgReg = /\.(?:jpe?g|gif|png)$/i;
    return str.replace(urlReg, (match) => {
      console.log('match\n',match);
      return imgReg.test(match) ? '<img src="'+match+'" class="thumb" />' : '<a href="'+match+'" target="_blank">'+match+'</a>';
    });
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


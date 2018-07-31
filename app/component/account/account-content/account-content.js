'use strict';

require('./_account-content.scss');

module.exports = {
  template: require('./account-content.html'),
  controller: ['$log', '$rootScope', '$stateParams', '$window', 'profileService', 'postService', 'answerService', AccountContentController],
  controllerAs: 'accountContentCtrl',
  bindings: {
    profile: '<',
    onProfileUpdated: '&'
  }
};

function AccountContentController($log, $rootScope, $stateParams, $window, profileService, postService, answerService) {
  $log.debug('AccountContentController');

  this.myUserID = $window.localStorage.getItem('userID');
  this.myProfile = [];

  this.$onInit = () => {
    this.fetchMyPosts();
  };

  this.fetchMyPosts = () => {
    $log.debug('AccountContentController.fetchMyPosts()');
    this.answersArr = [];
    postService.fetchMyPosts()
    .then( posts =>  {
      this.postsArr = posts;
      this.posts = posts;
    });
  };

  this.fetchMyAnswers = () => {
    $log.debug('AccountContentController.fetchMyAnswers()');
    this.posts = [];
    answerService.fetchMyAnswers()
    .then( answers => this.answersArr = answers);
  };

  this.filterType = (type) => {
    console.log(type);
    this.answersArr = [];
    this.posts = this.postsArr.filter( post => post.type == type);
  };


}
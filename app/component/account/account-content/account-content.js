'use strict';

require('./_account-content.scss');

// module.exports = ['$log', '$rootScope', '$stateParams', 'profileService', 'postService', 'commentService', AccountContentController];

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
  // this.fetchMyProfile = function(){
  //   $log.debug('AccountContentController.fetchMyProfile()');

  //   this.myUserID = $window.localStorage.getItem('userID');
  //   console.log('this one ?',this.myUserID);
  //   profileService.fetchProfile(this.myUserID)
  //     .then( profile => {
  //       this.myProfile.push(profile);
  //       console.log('HERE!!!',this.myProfile[0]._id);
  //     });

  // };

  // this.fetchMyProfile();
    // this.myCommentsArray = [];
    // this.myPostsArray = [];

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

    

  // this.fetchMyComments = function() {
  //   $log.debug('AccountContentController.fetchMyComments');

  //   this.myPostsArray = [];

  //   this.myCommentsArray = [];
  //   console.log('JCKBDJCGJDGCKJDBCKJDBCJKHDC', this.myCommentsArray[0]);
  //   // for( var prop in this.myCommentsArray){
  //   //   console.log( prop);
  //   // }
  //   // this.myCommentsArray.forEach( comment => {
  //   //   console.log('comment if ',comment._id)
  //   // });


  //   commentService.fetchProfileComments(this.myProfile[0])
  //   .then( profile => {
  //     console.log('AccountContent profile ::::::::::::::::>', profile.comments[1]);
  //     profile.comments.forEach( comment => {
  //       this.myCommentsArray.push(comment);
  //       // console.log('comment pushed:::::::', comment._id);
  //     });
  //     //  console.log('JCKBDJCGJDGCKJDBCKJDBCJKHDC', this.myCommentsArray[1]._id);
  //   });

    
  //   // for( var prop in this.myCommentsArray[0]){
  //   //   console.log('BROB',prop);
  //   // }
  // };

  // this.fetchMyComments = function(){
  //   $log.debug('AccountContentController.fetchMyComments()');

  //   this.myPostsArray = [];
  //   this.myCommentsArray = [];

  //   commentService.fetchMyProfileComments(this.myProfile[0]._id)
  //   .then( comments => {
  //     comments.forEach( comment => {
  //       this.myCommentsArray.push(comment);
  //     });
  //   })
  //   .catch(err => {
  //     $log.error('FAILED to fetchMyComment()', err);
  //   });
  // };

  // this.fetchMyPosts = function(){
  //   $log.debug('AccountContentController.fetchMyPosts()');

  //   this.myCommentsArray = [];
  //   this.myPostsArray = [];

  //   postService.fetchPostedPosts(this.myProfile[0]._id)
  //   .then( posts => {
  //     // console.log(posts);
  //     posts.forEach( postData => {
  //       console.log(postData.posterName);
  //       let post = {};
  //       post.data = postData;
  //       this.myPostsArray.push(post);
  //     });
  //   });
  // };


}
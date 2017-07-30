'use strict';

require('./_forum-item.scss');

module.exports = {
  template: require('./forum-item.html'),
  controller: ['$log', '$window', '$stateParams', 'profileService', 'postService', ForumItemController],
  controllerAs: 'forumItemCtrl',
  bindings: {
    page: '<'
  }
};


function ForumItemController($log, $window, $stateParams, profileService, postService){
  $log.debug('ForumItemController');

  this.questionID = $stateParams.questionID;
  

  this.$onInit = function(){
    $log.debug('forumItemCtrl.onInit()');

    
    postService.fetchPostComments(this.questionID)
    .then( question =>  {
      console.log('wait a minute', question);
      this.question =  question;
      this.answersArr = question.comments;
      console.log('ARR',this.answersArr);
      return;
    })
    .then( () => {
      console.log('thee is a question', this.question.posterID);
      profileService.fetchProfile2(this.question.posterID)
      .then( profile =>  {
        this.poster = profile;
        let profileID = $window.localStorage.getItem('profileID');
        return this.showDeleteBtn = profileID === this.poster._id;
      });
    })
    .catch(err => console.log('failed fetchForum()', err));
  };

  this.likePost = function(){
    $log.debug('postItemCtrl.likePost()');

    postService.likePost(this.question._id)
    .then( post => this.question = post)
    .catch( err => console.log('Failed likePost()', err));
  };

  // this.unLikePost = function() {
  //   $log.debug('postItemCtrl.unLikePost()');

  //   postService.unLikePost(this.question._id)
  //   .then( post => console.log('Successfuly unLikedPost()', post))
  //   .catch( err => console.log('Failed unLikePost()', err));
  // };

  this.dislikePost = function() {
    $log.debug('postItemCtrl.dislikePost()');

    postService.dislikePost(this.question._id)
    .then( post => this.question =  post)
    .catch( err => console.log('Failed dislikePost()', err));
  };

  this.deleteForum = function(){
    $log.debug('forumItemCtrl.deleteForum()');

    postService.deletePost(this.question._id)
    .then( res => console.log('Successfully deleted question', res))
    .catch( err => console.log('Failed to delete question', err));
    
  };

}
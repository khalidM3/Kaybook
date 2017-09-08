'use strict';

require('./_poll-item.scss');

module.exports = {
  template: require('./poll-item.html'),
  controller: ['$log', '$window', '$stateParams', 'profileService', 'postService', 'choiceService', PollItemController],
  controllerAs: 'pollItemCtrl',
  // bindings: {
  //   forum: '<'
  // }
};


function PollItemController($log, $window, $stateParams, profileService, postService, choiceService){
  $log.debug('PollItemController');

  this.pollID = $stateParams.pollID;
  

  this.$onInit = function(){
    $log.debug('pollItemCtrl.onInit()');

    
    postService.fetchPostComments(this.pollID)
    .then( poll =>  {
      this.poll =  poll;
      // this.commentsArr = poll.comments;
      // console.log('arr ans', this.commentsArr);
      this.choicesArr = poll.choices;
      console.log('ARR',poll.choices);
      return;
    })
    .then( () => {
      profileService.fetchProfile2(this.poll.posterID)
      .then( profile =>  {
        this.poster = profile;
        if(this.poster) {
          let profileID = $window.localStorage.getItem('profileID');
          this.showDeleteBtn = profileID === this.poster._id;
        }
      });
    })
    .catch(err => console.log('failed fetchForum()', err));
  };

  // this.deleteForum = function(){
  //   $log.debug('forumItemCtrl.deleteForum()');

  //   forumService.deleteForum(this.forum._id)
  //   .then( res => console.log('Successfully deleted forum', res))
  //   .catch( err => console.log('Failed to delete forum', err));
  // };


  this.vote = function(choice){
    console.log(choice);
    // /api/vote/:pollID/:choiceID

    postService.vote(this.poll._id, choice._id)
    .then( poll => this.choicesArr = poll.choices)
    .catch(err => console.log('Failed choice', err));
  };

  this.likePost = function(){
    $log.debug('postItemCtrl.likePost()');

    postService.likePost(this.poll._id)
    .then( post => this.poll = post)
    .catch( err => console.log('Failed likePost()', err));
  };

  // this.unLikePost = function() {
  //   $log.debug('postItemCtrl.unLikePost()');

  //   postService.unLikePost(this.poll._id)
  //   .then( post => console.log('Successfuly unLikedPost()', post))
  //   .catch( err => console.log('Failed unLikePost()', err));
  // };

  this.dislikePost = function() {
    $log.debug('postItemCtrl.dislikePost()');

    postService.dislikePost(this.poll._id)
    .then( post => this.poll =  post)
    .catch( err => console.log('Failed dislikePost()', err));
  };

  this.deletePoll = function(){
    $log.debug('pollItemCtrl.deletePoll()');

    postService.deletePost(this.poll._id)
    .then( res => console.log('Success', res));
  };
}
'use strict';

require('./_poll-item.scss');

module.exports = {
  template: require('./poll-item.html'),
  controller: ['$log', '$window', '$stateParams', 'profileService', 'pollService', 'choiceService', PollItemController],
  controllerAs: 'pollItemCtrl',
  // bindings: {
  //   forum: '<'
  // }
};


function PollItemController($log, $window, $stateParams, profileService, pollService, choiceService){
  $log.debug('PollItemController');

  this.pollID = $stateParams.pollID;
  

  this.$onInit = function(){
    $log.debug('forumItemCtrl.onInit()');

    
    pollService.fetchPollAns(this.pollID)
    .then( poll =>  {
      this.poll =  poll;
      this.answersArr = poll.comments;
      console.log('arr ans', this.answersArr)
      this.choicesArr = poll.choices;
      console.log('ARR',poll.choices);
      return;
    })
    .then( () => {
      profileService.fetchProfile2(this.poll.posterID)
      .then( profile =>  {
        this.poster = profile;
        let profileID = $window.localStorage.getItem('profileID');
        return this.showDeleteBtn = profileID === this.poster._id;
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

    choiceService.vote(this.poll._id, choice._id)
    .then( choice => console.log('Success choice', choice))
    .catch(err => console.log('Failed choice', err));
  };

  
}
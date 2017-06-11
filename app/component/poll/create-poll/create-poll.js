'use strict';

require('./_create-poll.scss');

module.exports = {
  template: require('./create-poll.html'),
  controller: ['$log', '$window', 'pollService', 'choiceService', CreatePollController],
  controllerAs: 'createPollCtrl',
  bindings: {
    page: '<',
    onPostCreated: '&',
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

function CreatePollController($log, $window, pollService, choiceService) {
  $log.debug('CreatePollController');

  this.poll = {};
  this.choices = [];
  
  
  this.createPoll = function(){
    $log.debug('createPollCtrl.createPoll()');

    let profileID = $window.localStorage.getItem('profileID');
    let admin = profileID === this.resolve.page.profileID;
    this.choices = [this.choice1, this.choice2, this.choice3];

    if( !admin ) {
      pollService.createPoll(this.resolve.page._id, this.poll)
      .then( poll => {
        console.log('Success createPoll()', poll);
        this.createChoices(poll);
        return;
      })
      .catch(err => console.log('Failed createPoll()', err));
    }

    if( admin ) {
      pollService.createPollFeed(this.resolve.page._id, this.poll)
      .then( poll => {
        console.log('Success createPollFeed()', poll)
        this.createChoices(poll);
        return;
      })
      .catch(err => console.log('Failed createPollFeed()', err));
    }
    
  };

  this.cancel = function () {
    this.dismiss({$value: 'cancel'});
  };

  this.createChoices= function(poll){
    
    this.choices = [{title: this.choice1}, { title: this.choice2}, {title: this.choice3}];
    console.log('poll', this.choices );
    this.choices.forEach( choice => {
      choiceService.createChoice(poll._id, choice)
      .then( choice => console.log('Success ', choice))
      .catch( err => console.log('Failed',err));
    });
  };



}
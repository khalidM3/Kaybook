'use strict';

require('./_create-poll.scss');

module.exports = {
  template: require('./create-poll.html'),
  controller: ['$log', '$window', 'postService', CreatePollController],
  controllerAs: 'createPollCtrl',
  bindings: {
    page: '<',
    onPostCreated: '&',
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

function CreatePollController($log, $window, postService) {
  $log.debug('CreatePollController');

  this.poll = {};
  this.poll.type = 'poll';
  this.poll.choices = [];

  this.nums = 0;
  
  
  this.createPoll = function(){
    $log.debug('createPollCtrl.createPoll()');

    let profileID = $window.localStorage.getItem('profileID');
    let admin = profileID === this.resolve.page.profileID;
    this.choices = [this.choice1, this.choice2, this.choice3];


    if( !admin ) {
      postService.createPost(this.resolve.page._id, this.poll)
      .then( poll => {
        console.log('Success createPoll()', poll);
        return;
      })
      .catch(err => console.log('Failed createPoll()', err));
    }

    if( admin ) {
      postService.createFeed(this.resolve.page._id, this.poll)
      .then( poll => {
        console.log('Success createPollFeed()', poll);
        return;
      })
      .catch(err => console.log('Failed createPollFeed()', err));
    }
    
  };

  this.addChoice = () => {
    console.log({name: this.choice1});
    this.poll.choices.push({name: this.choice, picURI: this.picURI});
    this.choice = null;
    this.picURI = null;
    console.log('poll\n', this.poll);
  };

  this.removeChoice = (choice) => {
    this.poll.choices.forEach( ( ch, ind )  => {
      if(choice.name === ch.name && choice.picURI === ch.picURI) {
        this.poll.choices.splice(ind, 1);
      }
    });
  };

  this.bark = () => {
    // console.log('choice', this.choice1);
  };

  this.cancel = function () {
    this.dismiss({$value: 'cancel'});
  };

  // this.createChoices= function(poll){
    
  //   this.choices = [{title: this.choice1}, { title: this.choice2}, {title: this.choice3}];
  //   console.log('poll', this.choices );
  //   this.choices.forEach( choice => {
  //     choiceService.createChoice(poll._id, choice)
  //     .then( choice => console.log('Success ', choice))
  //     .catch( err => console.log('Failed',err));
  //   });
  // };



}
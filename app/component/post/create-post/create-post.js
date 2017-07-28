'use strict';

require('./_create-post.scss');

module.exports = {
  template: require('./create-post.html'),
  controller: ['$log', '$location', '$rootScope', '$window', 'postService', 'picService', CreatePostController],
  controllerAs: 'createPostCtrl',
  bindings: {
    onPostCreated: '&',
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

function CreatePostController($log, $location, $rootScope, $window, postService, picService) {
  $log.debug('CreatePostController');

  $log.debug('HERE !!!',this.profile);

  this.post = {};
  this.post.type = 'pic';
  this.uploadedPost = {};

  this.chosePost = () => {
    console.log('chose post');
    this.post = {};
    this.post.type = 'pic';
    this.showPic = true;
    this.showArticle = this.showPoll = false;
  };

  this.choseQuest = () => {
    console.log('chose question');
    this.post = {};
    this.post.type = 'question';
    this.showPic = this.showArticle = this.showPoll = false;
  };

  this.choseArticle = () => {
    console.log('chose article');
    this.post = {};
    this.post.type = 'article';
    this.showArticle = true;
    this.showPic = this.showPoll = false;
  };

  this.chosePoll = () => {
    console.log('chose poll');
    this.post = {};
    this.post.choices = [];
    this.post.type = 'poll';
    this.showPoll = true;
    this.showArticle = this.showPic = false;
  };

  

  this.createPost = function(){
    $log.debug('createPostCtrl.createPost()');
    this.post.timeline = true;
    let profileID = $window.localStorage.getItem('profileID');
    let admin = profileID === this.resolve.page.profileID;

    if( !admin ) {
      postService.createPost(this.resolve.page._id, this.post)
      .then( post => console.log('Success createPost()', post))
      .catch(err => console.log('Failed createPost()', err));
    }

    if( admin ) {
      postService.createFeed(this.resolve.page._id, this.post)
      .then( post => console.log('Success createForumFeed()', post))
      .catch(err => console.log('Failed createForumFeed()', err));
    }
    
  };


  this.addChoice = () => {
    console.log({name: this.choice1});
    this.post.choices.push({name: this.choice, picURI: this.picURI});
    this.choice = null;
    this.picURI = null;
    console.log('post\n', this.post);
  };

  this.removeChoice = (choice) => {
    this.post.choices.forEach( ( ch, ind )  => {
      if(choice.name === ch.name && choice.picURI === ch.picURI) {
        this.post.choices.splice(ind, 1);
      }
    });
  };

  this.cancel = function () {
    this.dismiss({$value: 'cancel'});
  };


  this.bark = function(){
  };

}
  




// let profileID = $window.localStorage.getItem('profileID');
//     // todo - change to array of admin profile ID's
//     // let admin = this.resolve.page.admins.some(PID => PID.toString() === profileID);
//     if(profileID === this.resolve.page.profileID ) {
//       postService.createFeed(this.resolve.page._id, this.post)
//       .then( post => {
//         console.log('res.post  CAPITAL', post._id);
//         console.log('uploadedPost', this.uploadedPost);
//         if( this.uploadedPost.name) picService.uploadPostPic(post._id, this.uploadedPost);
//         return;
//       })
//       .then( () => {
//         this.post = null;
//         this.uploadPost = null;
//         this.onPostCreated();
//       })
//       .then( () => this.cancel())
//       .catch( err => {
//         this.post = null;
//         this.uploadPost = null;
//         console.log('the error', err);
      // });

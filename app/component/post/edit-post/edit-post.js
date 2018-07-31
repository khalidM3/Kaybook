'use strict';

require('./_edit-post.scss');

module.exports = {
  template: require('./edit-post.html'),
  controller: ['$log', '$location', '$rootScope', 'postService', 'picService', EditPostController],
  controllerAs: 'editPostCtrl',
  bindings: {
    profile: '<',
    onPostCreated: '&',
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

function EditPostController($log, $location, $rootScope, postService, picService) {
  $log.debug('EditPostController');


  this.post = {};
  this.upload = {};

  this.$onInit = () => {
    this.post = this.resolve.post;
    switch (this.post.type) {
    case 'pic':
      this.showPic = true;
      this.showArticle = this.showPoll = false;
      break;
    case 'question':
      this.showPic = this.showArticle = this.showPoll = false;
      break;
    case 'article':
      this.showArticle = true;
      this.showPic = this.showPoll = false;
      break;
    case 'poll':
      this.showPoll = true;
      this.showArticle = this.showPic = false;
      break;
    default:
      this.showPic = this.showArticle = this.showPoll = false;
    }
  };

  this.addChoice = () => {
    this.post.choices.push({name: this.choice, picURI: this.picURI});
    this.choice = null;
    this.picURI = null;
  };

  this.removeChoice = (choice) => {
    this.post.choices.forEach( ( ch, ind )  => {
      if(choice.name === ch.name && choice.picURI === ch.picURI) {
        this.post.choices.splice(ind, 1);
      }
    });
  };

  this.choseText = () => {
    this.showLinkInput = false;
    this.showTextInput = true;
    this.showChoiceInputs = true;
  };

  this.choseLink = () => {
    this.showTextInput = false;
    this.showLinkInput = true;
    this.showChoiceInputs = true ;
  };

  this.updatePost = function() {
    $log.debug('EditPostController.editPost()');

    this.post.updated = new Date();
    this.post.edited = true;
    postService.updatePost(this.post._id, this.post)
    .then( post => {
      this.post = {};
      this.ok();
      return;
    });
  }; 

  this.ok = function () {
    this.close({$value: this.post});
  };

  this.cancel = function () {
    this.dismiss({$value: 'cancel'});
  };

}

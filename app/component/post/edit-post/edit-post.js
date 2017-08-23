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

  // $log.debug('HERE !!!',this.profile);

  this.post = {};
  this.upload = {};

// "showeditBtn = true"
  this.$onInit = () => {
    this.post = this.resolve.post;
    switch (this.post.type) {
    case 'pic':
      console.log('issa pic');
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
      console.log('default on me eh ?')
      this.showPic = this.showArticle = this.showPoll = false;
    }
  };

  // this.updatePostPic = function(){
  //   picService.uploadPostPic(this.resolve.post._id, this.upload)
  //   .then( () => {
  //     this.upload = null;
  //     this.onPostCreated();
  //   })
  //   .catch( err => {
  //     $log.error('update post pic FAILED', err);
  //   }); 
  // };

  // this.updatePostDesc = function(){
  //   postService.updatePost(this.resolve.post._id, this.post)
  //   .then( () => {
  //     this.post = null;
  //     this.onPostCreated();
  //   })
  //   .catch( err => {
  //     $log.error('update post desc FAILED', err);
  //   });
  // };

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

  this.updatePost = function() {
    $log.debug('EditPostController.editPost()');

    // if(this.post.description) this.updatePostDesc();
    // if(this.upload) this.updatePostPic();

    // service.updatePost = function(postID, postData) {};
    console.log('THIS.POST <><><><><><><><><>', this.post);
    this.post.updated = new Date();
    this.post.edited = true;
    this.post.searchTerms = this.post.desc.match(/#(?:\w)\w*/g);
    postService.updatePost(this.post._id, this.post)
    .then( post => {
      console.log('res.post  CAPITAL', post._id);
      this.post = {};
      // this.cancel();
      this.ok();
      // return picService.uploadPostPic(post, this.uploadedPost);
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

'use strict';

require('./_post-item.scss');

module.exports = {
  template: require('./post-item.html'),
  controller: ['$log','$rootScope', '$window', '$uibModal', '$location', 'postService', 'profileService', 'commentService', PostItemController],
  controllerAs: 'postItemCtrl',
  bindings: {
    loggedIn: '<',
    profile: '<',
    onpostChange: '&',
    resolve: '<',
    close: '&',
    dismiss: '&',
    closed: '&',
  }
};

function PostItemController($log, $rootScope,$window, $uibModal, $location, postService, profileService, commentService){
  $log.debug('postItemController');

  
// posts.data are resolve.post

  this.showEditpost = false;
  this.showCreateComment = false;


  this.updatePostItemView = function() {
    $log.debug('postItemController.updatePostItemView', this.post);

    this.onpostChange();
  };

  this.$onInit = function(){
    $log.debug('articleItemCtrl.onInit()');


    postService.fetchPostComments(this.resolve.post._id)
    .then( post =>  {
      this.post =  post;
      this.reposter = post.repost ? post.posterID : null;
      post = post.repost ? post.repost : post;
  
      this.commentsArr = post.comments;
      this.choicesArr = post.choices;
      this.poster = post.posterID;
      // this.parsedArr = this.parseStr(this.post.desc);
      this.isVid = (/\.mp4$/).test(this.resolve.post.postPicURI);
      console.log(this.parsedArr);
      let profileID = $window.localStorage.getItem('profileID');
      return this.showDeleteBtn = profileID === this.poster._id;
    })
    .catch(err => console.log('failed fetchArticle()', err));
  };



  this.parseStr = (str) => {
    let urlReg = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    let imgReg = /\.(?:jpe?g|gif|png)$/i;
    let hash = /#(?:\w)\w*/g;
    let embed = /((https| http):\/\/(www\.youtu|www\.vimeo|imgur|))/;
    
    return str.split(' ').map( word => ({
      type: word.match(urlReg) || word.match(hash)
              ? word.match(imgReg)
              ? 'img' : word.match(embed)
                        ? 'embed' : 'link'
              : 'string',
      payload: word,
      link:  word.match(hash) ? `http://localhost:8080/#!/hash/${word.split('#')[1]}`: word,
      size: {}
    }));
  };

  this.likePost = function(){
    $log.debug('postItemCtrl.likePost()');

    postService.likePost(this.resolve.post._id)
    .then( post => this.post =  post)
    .catch( err => console.log('Failed likePost()', err));
  };

  this.dislikePost = function() {
    $log.debug('postItemCtrl.dislikePost()');

    postService.dislikePost(this.resolve.post._id)
    .then( post => this.post = post)
    .catch( err => console.log('Failed dislikePost()', err));
  };

  this.vote = function(choice){
    
    postService.vote(this.post._id, choice._id)
    .then( poll => this.choicesArr = poll.choices)
    .catch(err => console.log('Failed choice', err));
  };

  
  this.ok = function () {
    this.close({$value: this.post});
  };
  
  
  this.cancel = function () {
    this.dismiss({$value: 'cancel'});
  };
  
  $rootScope.$on('$locationChangeSuccess', () => {
    this.ok();
  });

  this.openEditPostModal = function () {
    let post = this.post;
    $uibModal.open({
      animation: this.animationsEnabled,
      component: 'editPost',
      resolve: {
        post: function () {
          console.log('<><><><><><><><><><><><><>', post);
          return post; 
        }
      },
    });
  };


  this.delete = function(){
    $log.debug('postTileCtrl.deletePost()');

    postService.deletePost(this.post._id)
    .then( () => {
      $location.search('id', null);
      return this.ok();
    })
    .catch( err => console.log('Failed to delete question', err));
    
  };

  this.report = () => {
    let post = this.post;
    $uibModal.open({
      animation: this.animationsEnabled,
      component: 'report',
      resolve: {
        post: function () {
          console.log('<><><><><><><><><><><><><>', post);
          return post; 
        }
      }
    });
  };

}

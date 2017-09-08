'use strict';

require('./_post-item.scss');

module.exports = {
  template: require('./post-item.html'),
  controller: ['$log', '$window', 'postService', 'profileService', 'commentService', PostItemController],
  controllerAs: 'postItemCtrl',
  bindings: {
    loggedIn: '<',
    profile: '<',
    onpostChange: '&',
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

function PostItemController($log, $window, postService, profileService, commentService){
  $log.debug('postItemController');

  
// posts.data are resolve.post

  this.showEditpost = false;
  this.showCreateComment = false;

  // this.$onInit = function() {
  //   $log.debug('postItemController.$onInit()');
    
  //   if (this.resolve.post) return this.updatePostView();
  //   return this.onpostChange();
  // };

  this.updatePostItemView = function() {
    $log.debug('postItemController.updatePostItemView', this.post);

    this.onpostChange();
  };

  this.$onInit = function(){
    $log.debug('articleItemCtrl.onInit()');

    this.isVid = (/\.mp4$/).test(this.resolve.post.postPicURI);

    postService.fetchPostComments(this.resolve.post._id)
    .then( post =>  {
      this.post =  post;
      this.commentsArr = post.comments;
      this.choicesArr = post.choices;
      this.poster = post.posterID;
      this.parsedArr = this.parseStr(this.post.desc);
      console.log(this.parsedArr);
      // console.log('ARR',this.commentsArr);
      let profileID = $window.localStorage.getItem('profileID');
      return this.showDeleteBtn = profileID === this.poster._id;
    })
    .catch(err => console.log('failed fetchArticle()', err));
  };

  this.parseStr = (str) => {
    let urlReg = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    let imgReg = /\.(?:jpe?g|gif|png)$/i;
    let hash = /#(?:\w)\w*/g;
    
    return str.split(' ').map( word => ({
      type: word.match(urlReg) || word.match(hash)
              ? word.match(imgReg) ? 'img' : 'link'
              : 'string',
      payload: word,
      link:  word.match(hash) ? `http://localhost:8080/#!/hash/${word.split('#')[1]}`: word,
      size: {}
    }));
  };

  this.likePost = function(){
    $log.debug('postItemCtrl.likePost()');

    postService.likePost(this.resolve.post._id)
    .then( post => this.resolve.post =  post)
    .catch( err => console.log('Failed likePost()', err));
  };

  this.dislikePost = function() {
    $log.debug('postItemCtrl.dislikePost()');

    postService.dislikePost(this.resolve.post._id)
    .then( post => this.resolve.post = post)
    .catch( err => console.log('Failed dislikePost()', err));
  };

  this.vote = function(choice){
    
    postService.vote(this.post._id, choice._id)
    .then( poll => this.choicesArr = poll.choices)
    .catch(err => console.log('Failed choice', err));
  };


  this.cancel = function () {
    this.dismiss({$value: 'cancel'});
  };
}

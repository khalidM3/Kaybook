'use strict';

require('./_article-item.scss');

module.exports = {
  template: require('./article-item.html'),
  controller: ['$log', '$window', '$stateParams', 'profileService', 'postService', ArticleItemController],
  controllerAs: 'articleItemCtrl',
  bindings: {
    page: '<'
  }
};


function ArticleItemController($log, $window, $stateParams, profileService, postService){
  $log.debug('ArticleItemController');

  this.articleID = $stateParams.articleID;
  

  this.$onInit = function(){
    $log.debug('articleItemCtrl.onInit()');

    
    postService.fetchPostComments(this.articleID)
    .then( article =>  {
      this.article =  article;
      this.commentsArr = article.comments;
      this.poster = article.posterID;
      // console.log('ARR',this.commentsArr);
      let profileID = $window.localStorage.getItem('profileID');
      return this.showDeleteBtn = profileID === this.poster._id;
    })
    .catch(err => console.log('failed fetchArticle()', err));
  };

  this.likePost = function(){
    $log.debug('postItemCtrl.likePost()');

    postService.likePost(this.article._id)
    .then( post => this.article = post)
    .catch( err => console.log('Failed likePost()', err));
  };

  // this.unLikePost = function() {
  //   $log.debug('postItemCtrl.unLikePost()');

  //   postService.unLikePost(this.article._id)
  //   .then( post => console.log('Successfuly unLikedPost()', post))
  //   .catch( err => console.log('Failed unLikePost()', err));
  // };

  this.dislikePost = function() {
    $log.debug('postItemCtrl.dislikePost()');

    postService.dislikePost(this.article._id)
    .then( post => this.article =  post)
    .catch( err => console.log('Failed dislikePost()', err));
  };

  this.deleteArticle = function(){
    $log.debug('articleItemCtrl.deleteArticle()');

    postService.deletePost(this.article._id)
    .then( res => console.log('Successfully deleted article', res))
    .catch( err => console.log('Failed to delete article', err));
    
  };

}
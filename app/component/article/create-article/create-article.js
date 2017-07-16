'use strict';

require('./_create-article.scss');

module.exports = {
  template: require('./create-article.html'),
  controller: ['$log', '$window', 'postService', CreateArticleController],
  controllerAs: 'createArticleCtrl',
  bindings: {
    page: '<',
    onPostCreated: '&',
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

function CreateArticleController($log, $window, postService) {
  $log.debug('CreateArticleController');

  this.article = {};
  this.article.type = 'article';
  
  this.createArticle = function(){
    $log.debug('createArticleCtrl.createArticle()');

    let profileID = $window.localStorage.getItem('profileID');
    let admin = profileID === this.resolve.page.profileID;

    if( !admin ) {
      postService.createPost(this.resolve.page._id, this.article)
      .then( article => console.log('Success createArticle()', article))
      .catch(err => console.log('Failed createArticle()', err));
    }

    if( admin ) {
      postService.createFeed(this.resolve.page._id, this.article)
      .then( article => console.log('Success createArticleFeed()', article))
      .catch(err => console.log('Failed createArticleFeed()', err));
    }
    
  };

  this.cancel = function () {
    this.dismiss({$value: 'cancel'});
  };



}
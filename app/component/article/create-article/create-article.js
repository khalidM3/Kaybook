'use strict';

require('./_create-article.scss');

module.exports = {
  template: require('./create-article.html'),
  controller: ['$log', '$window', 'articleService', CreateArticleController],
  controllerAs: 'createArticleCtrl',
  bindings: {
    page: '<',
    onPostCreated: '&',
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

function CreateArticleController($log, $window, articleService) {
  $log.debug('CreateArticleController');

  this.article = {};
  
  this.createArticle = function(){
    $log.debug('createArticleCtrl.createArticle()');

    let profileID = $window.localStorage.getItem('profileID');
    let admin = profileID === this.resolve.page.profileID;

    if( !admin ) {
      articleService.createArticle(this.resolve.page._id, this.article)
      .then( article => console.log('Success createArticle()', article))
      .catch(err => console.log('Failed createArticle()', err));
    }

    if( admin ) {
      articleService.createArticleFeed(this.resolve.page._id, this.article)
      .then( article => console.log('Success createArticleFeed()', article))
      .catch(err => console.log('Failed createArticleFeed()', err));
    }
    
  };

  this.cancel = function () {
    this.dismiss({$value: 'cancel'});
  };



}
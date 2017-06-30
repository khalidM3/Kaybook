'use strict';

require('./_article-item.scss');

module.exports = {
  template: require('./article-item.html'),
  controller: ['$log', '$window', '$stateParams', 'profileService', 'articleService', ArticleItemController],
  controllerAs: 'articleItemCtrl',
  bindings: {
    page: '<'
  }
};


function ArticleItemController($log, $window, $stateParams, profileService, articleService){
  $log.debug('ArticleItemController');

  this.articleID = $stateParams.articleID;
  

  this.$onInit = function(){
    $log.debug('articleItemCtrl.onInit()');

    
    articleService.fetchArticleAns(this.articleID)
    .then( article =>  {
      this.article =  article;
      this.commentsArr = article.comments;
      console.log('ARR',this.commentsArr);
      return;
    })
    .then( () => {
      profileService.fetchProfile2(this.article.posterPID)
      .then( profile =>  {
        this.poster = profile;
        let profileID = $window.localStorage.getItem('profileID');
        return this.showDeleteBtn = profileID === this.poster._id;
      });
    })
    .catch(err => console.log('failed fetchArticle()', err));
  };

  this.deleteArticle = function(){
    $log.debug('articleItemCtrl.deleteArticle()');

    articleService.deleteArticle(this.article._id)
    .then( res => console.log('Successfully deleted article', res))
    .catch( err => console.log('Failed to delete article', err));
    
  };

}
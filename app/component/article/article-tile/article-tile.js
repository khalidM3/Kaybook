'use strict';

require('./_article-tile.scss');

module.exports = {
  template: require('./article-tile.html'),
  controller: ['$log', '$location', ArticleTileController],
  controllerAs: 'articleTileCtrl',
  bindings: {
    article: '<'
  }
};

function ArticleTileController($log, $location) {
  $log.debug('ArticleTileController');
  
  this.goToArticle = function(){
    $log.debug('articleTileCtrl.goToArticle()');

    $location.url(`/article/${this.article._id}`);
  };

}
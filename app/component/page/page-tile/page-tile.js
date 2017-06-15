'use strict';

require('./_page-tile.scss');

module.exports = {
  template: require('./page-tile.html'),
  controller: ['$log', '$location', '$window', PageTileController],
  controllerAs: 'pageTileCtrl',
  bindings: {
    page: '<'
  }
};

function PageTileController($log, $location, $window) {
  $log.debug('PageTileController');

  this.goToPage = function(){
    $log.debug('pageTileCtrl.goToPage()');

    $location.url(`/page/${this.page._id}`);
  };

}
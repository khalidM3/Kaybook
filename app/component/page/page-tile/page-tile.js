'use strict';

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

    let profileID = $window.localStorage.getItem('profileID');
    $location.url(`/page/${this.page._id}/${profileID}`);
  };

}
'use strict';

require('./_page-tile.scss');

module.exports = {
  template: require('./page-tile.html'),
  controller: ['$log', '$location', '$window', 'pageService', PageTileController],
  controllerAs: 'pageTileCtrl',
  bindings: {
    page: '<'
  }
};

function PageTileController($log, $location, $window, pageService) {
  $log.debug('PageTileController');

  this.$onInit = () => {
    this.profile = JSON.parse($window.localStorage.profile);
    this.showLeaveBtn = this.page.members.some( id => id === this.profile._id);
    this.showEditBtn = this.page.admins.some(id => id === this.profile._id);
  };

  this.goToPage = function(){
    $log.debug('pageTileCtrl.goToPage');
    $location.url(`/page/${this.page._id}/post`);
  };

  this.edit = () => {
    $location.url('/settings/pages');
  };

  this.joinPage = function() {
    $log.debug('pageItemCtrl.joinPage()');

    this.showLeaveBtn = true;
    ++this.count;

    pageService.joinPage(this.page._id)
    .then( page => {
      console.log('Successfully joinPage()');
    })
    .catch( err => console.log('Failed joinPage()', err));
  };

  this.leavePage = function(){
    $log.debug('pageItemCtrl.leavePage()');

    this.showLeaveBtn = false;
    --this.count;

    pageService.leavePage(this.page._id)
    .then( page => console.log('Successfully leavePage()', page))
    .catch( err => console.log('Failed leavePage()', err));
  };

}
'use strict';

require('./_account-pages.scss');

module.exports = {
  template: require('./account-pages.html'),
  controller: ['$log', '$window', 'pageService', AccountPagesController],
  controllerAs: 'accountPagesCtrl',
};

function AccountPagesController($log, $window, pageService) {
  $log.debug('AccountPagesController');


  this.$onInit = () => {
    this.profile = JSON.parse($window.localStorage.profile);
    this.fetchPages();
  };

  this.fetchPages = () => {
    pageService.fetchPagesByPID(this.profile._id)
    .then( pages =>  {
      this.pagesArr = pages;
      this.currpage = this.pagesArr[0];
    })
    .catch( err => console.log('Failed fetchMyPages()', err));
  };

  this.changeCurr = (page) => {
    this.currpage = page;
  };


}
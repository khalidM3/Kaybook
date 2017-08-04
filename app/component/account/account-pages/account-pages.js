'use strict';

require('./_account-pages.scss');

// module.exports = ['$log', '$rootScope', '$stateParams', 'profileService', 'postService', 'commentService', AccountprofileController];

module.exports = {
  template: require('./account-pages.html'),
  controller: ['$log', '$rootScope', '$stateParams', '$window', 'profileService', 'postService', 'pageService', AccountPagesController],
  controllerAs: 'accountPagesCtrl',
  bindings: {
    profile: '<'
  }
};

function AccountPagesController($log, $rootScope, $stateParams, $window, profileService, postService, pageService) {
  $log.debug('AccountPagesController');


  this.$onInit = () => {
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
    console.log('curr page :',this.currpage);
  };


}
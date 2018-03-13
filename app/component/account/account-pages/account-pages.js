'use strict';

require('./_account-pages.scss');

// module.exports = ['$log', '$rootScope', '$stateParams', 'profileService', 'postService', 'commentService', AccountprofileController];

module.exports = {
  template: require('./account-pages.html'),
  controller: ['$log', '$rootScope', '$stateParams', '$window', 'profileService', 'postService', 'pageService', AccountPagesController],
  controllerAs: 'accountPagesCtrl',
};

function AccountPagesController($log, $rootScope, $stateParams, $window, profileService, postService, pageService) {
  $log.debug('AccountPagesController');


  this.$onInit = () => {
    this.profile = JSON.parse($window.localStorage.profile);
    this.fetchPages();
    this.showOptions = false;
  };

  this.bark = () => {
    console.log(profileService.profile);
    this.showOptions = false;
  };

  

  this.fetchPages = () => {
    pageService.fetchPagesByPID(this.profile._id)
    .then( pages =>  {

      console.log('pages are ', pages, this.profile._id);
      this.pages = pages;
      this.currPage = pages[0];
    })
    .catch( err => console.log('Failed fetchMyPages()', err));
  };

  this.filter = (id) => {
    // this.filter_id = id;
    this.showOptions = false;
    console.log(this.showOptions );
    // if(id == 'all') return this.postsArr = this.posts;
    return this.pages.forEach( page => {
      if(page._id == id) {
        this.currPage = page;
        this.showOp = false;
        return;
      }
    });
    // this.showOptions = false;
    // console.log('CURRPAGE', this.showOptions);
  };

  // this.changeCurr = (page) => {
  //   this.currpage = page;
  //   console.log('curr page :',this.currpage);
  // };


}
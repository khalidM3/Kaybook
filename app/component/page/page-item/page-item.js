'use strict';

require('./_page-item.scss');

module.exports = {
  template: require('./page-item.html'),
  controller: ['$log', '$stateParams', '$window', '$location', '$uibModal', 'pageService', 'postService', 'merchService',PageItemController],
  controllerAs: 'pageItemCtrl',
  bindings: {
    page: '<' 
  }
};


function PageItemController ($log, $stateParams, $window, $location, $uibModal, pageService, postService, merchService){
  $log.debug('PageItemController');


  this.$onInit = function(){
    $log.debug('pageItemCtrl.onInit');

    this.pageID = $stateParams.pageID;
    this.filter_type = 'all';
    return pageService.fetchPage(this.pageID)
    .then( page => {
      this.myProfile = JSON.parse($window.localStorage.profile);
      let profileID = this.myProfile._id;
      this.count = page.members.length;
      this.showLeaveBtn = page.members.some( PID =>PID.toString() === profileID);
      this.showEditBtn = profileID === page.profileID;
      this.page = page;
      return this.fetch();
    })
    .then( () => {
      if($location.search().mid && $stateParams.section === 'merch') {
        merchService.fetchMerchOptions($location.search().mid)
          .then( merch => {
            $uibModal.open({
              animation: this.animationsEnabled,
              component: 'merchItem',
              resolve: {
                merch: function () {
                  return merch; 
                }
              }
            });
          });
      }
      return;
    });
  };


  this.fetch = function(){
    $log.debug('pageItemCtrl.fetch()');

    this.postsArr = [];
    this.merchesArr = [];
    this.showPostBtn = true;

    switch($stateParams.section) {
    case 'posts':
      return this.fetchPagePosts();
    case 'feed':
      return this.fetchPageFeed();
    case 'merch':
      this.showPostBtn = false;
      return this.fetchPageMerch();
    case 'about':
      return this.showAbout = true;
    default: 
      this.fetchPagePosts();
    }
  };


  this.pagePosts = () => {
    $location.url(`/page/${this.page._id}/posts`);
  };

  this.fetchPagePosts = function(){
    $log.debug('pageItemCtrl.fetchPagePosts()');

    postService.fetchPagePosts(this.page._id)
    .then( posts => {
      this.posts = posts;
      return this.postsArr = posts;
    })
    .catch( err => console.log('Failed ', err));
  };

  this.pageFeed = () => {
    $location.url(`/page/${this.page._id}/feed`);
  };

  this.fetchPageFeed = function(){
    $log.debug('pageItemCtrl.fetchPostsFeed()');

    postService.fetchPageFeed(this.page._id)
    .then( posts => {
      this.posts = posts;
      this.postsArr = posts;
    })
    .catch(err => console.log('Failed to fetch feed', err));
  };

  this.pageMerch = () => {
    $location.url(`/page/${this.page._id}/merch`);
  };

  this.fetchPageMerch = function(){
    $log.debug('pageItemCtrl.fetchPageMerch');

    merchService.fetchPageMerch(this.page._id)
    .then( merches => this.merches =  merches)
    .catch(err => console.log('Failed to fetch poll feed', err));
  };

  this.goToMerch = function(){
    $log.debug('pageItemCtrl.goToMerch()');

    $location.url(`/merch/${this.page._id}`);
  };

  this.goToCart = function(){
    $log.debug('pageItemCtrl.goToCart()');

    $location.url('/cart');
  };


  this.goToAbout = () => {
    $location.url(`/page/${this.page._id}/about`);
  };

  this.joinPage = function() {
    $log.debug('pageItemCtrl.joinPage()');

    this.showLeaveBtn = true;
    ++this.count;
    pageService.joinPage(this.page._id)
    .then( page => {
      this.openModal( page.greeting);
    });
  };

  this.leavePage = function(){
    $log.debug('pageItemCtrl.leavePage()');

    this.showLeaveBtn = false;
    --this.count;

    pageService.leavePage(this.page._id)
  };

  this.openModal = function (message) {
    $uibModal.open({
      animation: this.animationsEnabled,
      component: 'modalItem',
      resolve: {
        message: function () {
          return message;
        }
      }
    });
  };

  this.openCreatePostModal = function () {
    let page = this.page;
    $uibModal.open({
      animation: this.animationsEnabled,
      component: 'createPost',
      resolve: {
        page: function () {
          return page;
        }
      },
      backdrop: false,
    });
  };


  this.openCreateMerchModal = function () {
    let page = this.page;
    $uibModal.open({
      animation: this.animationsEnabled,
      component: 'createMerch',
      resolve: {
        page: function () {
          return page;
        }
      }
    })
    .result.then( merch => {
      this.merches.push(merch);
    });
  };

  this.openPostModal = function (post) {
    $uibModal.open({
      animation: this.animationsEnabled,
      component: 'postItem',
      resolve: {
        post: function () {
          return post;
        }
      }
    });
  };

  this.goToEditPage = () => {
    $location.url('settings/pages');
  };

  this.bark = () => {
    $location.search('id', null);
  };

  this.filter = (type) => {
    this.filter_type = type;
    if(type == 'all') return this.postsArr = this.posts;
    this.postsArr = this.posts.filter( post => post.type == type);
  };

  this.searchPost = (term) => {
    return postService.postSearch(this.page._id,term)
    .then( posts => {
      console.log('results ', posts);
    });
  };

}
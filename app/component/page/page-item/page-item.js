'use strict';

require('./_page-item.scss');

module.exports = {
  template: require('./page-item.html'),
  controller: ['$log', '$rootScope', '$stateParams', '$window', '$location', '$uibModal', 'pageService', 'postService', 'forumService', 'pollService', 'articleService', 'merchService',PageItemController],
  controllerAs: 'pageItemCtrl',
  bindings: {
    page: '<' 
  }
};


function PageItemController ($log, $rootScope, $stateParams, $window, $location, $uibModal, pageService, postService, forumService, pollService, articleService, merchService){
  $log.debug('PageItemController');


  this.$onInit = function(){
    $log.debug('pageItemCtrl.onInit');

    this.pageID = $stateParams.pageID;
    this.profileID = $window.localStorage.getItem('profileID');
    
    pageService.fetchPage(this.pageID)
    .then( page =>  {
      this.count = page.members.length;
      this.showLeaveBtn = page.members.some( PID => PID.toString() === this.profileID.toString());
      this.showEditBtn = this.profileID === page.profileID;
      return this.page = page;
    })
    .then( () => {
      this.fetch();
      return;
    });
  };
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//               FETCH MAIN
  this.fetch = function(){
    $log.debug('pageItemCtrl.fetch()');

    this.showPostBtn = true;

    this.postsArr = [];
    this.forumsArr = [];
    this.pollsArr = [];
    this.merchesArr = [];

    this.fetchPagePosts();
    this.fetchPageForums();
    this.fetchPageArticles();
    this.fetchPagePolls();
  };



  this.fetchPagePosts = function(){
    $log.debug('pageItemCtrl.fetchPagePosts()');

    
    postService.fetchPagePosts(this.page._id)
    .then( posts => {
      console.log(posts);
      return this.postsArr = posts;
    })
    .catch( err => console.log('Failed ', err));
  };

  this.fetchPageForums = function(){
    $log.debug('pageItemCtrl.fetchPageForum()');

    forumService.fetchPageForums(this.page._id)
    .then( forums => this.forumsArr = forums)
    .catch( err => console.log('failed fetchPageForum', err));
  };

  this.fetchPageArticles = function(){
    $log.debug('pageItemCtrl.fetchPageArticle()');

    articleService.fetchPageArticles(this.page._id)
    .then( articles => this.articlesArr = articles)
    .catch( err => console.log('failed fetchPageArticle', err));
  };

  this.fetchPagePolls = function(){
    $log.debug('pageItemCtrl.fetchPagePolls()');

    pollService.fetchPagePolls(this.page._id)
    .then( polls => this.pollsArr = polls)
    .catch( err => console.log('failed fetchPagePolls', err));
  };


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//               FEED

  this.fetchFeed = function(){
    $log.debug('pageItemCtrl.fetchFeed()');

    this.showPostBtn = true;

    this.postsArr = [];
    this.forumsArr = [];
    this.pollsArr = [];
    this.merchesArr = [];
    
    this.fetchPostFeed();
    this.fetchForumFeed();
    this.fetchArticleFeed();
    this.fetchPollFeed();
  };

  this.fetchPostFeed = function(){
    $log.debug('pageItemCtrl.fetchPostsFeed()');

    postService.fetchPageFeed(this.page._id)
    .then( posts => this.postsArr = posts)
    .catch(err => console.log('Failed to fetch feed', err));
  };

  this.fetchForumFeed = function(){
    $log.debug('pageItemCtrl.fetchForumFeed');

    forumService.fetchForumFeed(this.page._id)
    .then( forums => this.forumsArr = forums)
    .catch(err => console.log('Failed to fetch forum feed', err));
  };

  this.fetchArticleFeed = function(){
    $log.debug('pageItemCtrl.fetchArticleFeed');

    articleService.fetchArticleFeed(this.page._id)
    .then( articles => this.articlesArr = articles)
    .catch(err => console.log('Failed to fetch article feed', err));
  };

  this.fetchPollFeed = function(){
    $log.debug('pageItemCtrl.fetchPollFeed()');

    pollService.fetchPollFeed(this.page._id)
    .then( polls => this.pollsArr = polls)
    .catch(err => console.log('Failed to fetch poll feed', err));
  };
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                    MERCH
  this.fetchMerch = function(){
    $log.debug('pageItemCtrl.fetchMerch()');

    this.showPostBtn = false;

    this.postsArr = [];
    this.forumsArr = [];
    this.pollsArr = [];

    this.fetchPageMerch();
  };


  this.fetchPageMerch = function(){
    $log.debug('pageItemCtrl.fetchPageMerch');

    merchService.fetchPageMerch(this.page._id)
    .then( merches => this.merchesArr =  merches)
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

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                    PAGE 
  this.joinPage = function() {
    $log.debug('pageItemCtrl.joinPage()');

    this.showLeaveBtn = true;
    ++this.count;

    pageService.joinPage(this.page._id)
    .then( page => console.log('Successfully joinPage()', page))
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


  this.openComponentModal = function (page) {

    var modalInstance = $uibModal.open({
      animation: this.animationsEnabled,
      component: 'createPost',
      resolve: {
        page: function () {
          return page;
        }
      }
    });
  };

  this.openCreateForumModal = function (page) {

    var modalInstance = $uibModal.open({
      animation: this.animationsEnabled,
      component: 'createForum',
      resolve: {
        page: function () {
          return page;
        }
      }
    });
  };

  this.openCreateArticleModal = function (page) {

    var modalInstance = $uibModal.open({
      animation: this.animationsEnabled,
      component: 'createArticle',
      resolve: {
        page: function () {
          return page;
        }
      }
    });
  };

  this.openCreatePollModal = function (page) {

    var modalInstance = $uibModal.open({
      animation: this.animationsEnabled,
      component: 'createPoll',
      resolve: {
        page: function () {
          return page;
        }
      }
    });
  };

  this.openCreateMerchModal = function (page) {

    var modalInstance = $uibModal.open({
      animation: this.animationsEnabled,
      component: 'createMerch',
      resolve: {
        page: function () {
          return page;
        }
      }
    });
  };

}

// function ProfileViewController($log, $rootScope, $stateParams, $window, $uibModal, profileService, postService) {
//   $log.debug('ProfileViewController');

//   this.userID = $stateParams.userID;
//   this.showEditView = false;

//   let userID = $window.localStorage.getItem('userID');
  
//   this.showEditOption = userID === this.userID;

//   this.check = function(){
//     $log.debug('profileViewController.check()');

//     let userID = $window.localStorage.getItem('userID');
//     profileService.fetchProfile(userID)
//     .then( profile => {
//       let arr = profile.memberOf;
//       this.showLeaveBtn = arr.some( PID => PID.toString() === this.userID.toString());
//       // console.log('profile.memberOf  }-------->',arr);
//       // console.log('}------->', this.userID);
//     });
//   };
//   this.check();


//   this.deleteProfile = function(profile) {
//     if (this.profile._id === profile._id) {
//       this.profile = null;
//     }
//   };

//   this.updateProfileView = function() {
//     $log.debug('ProfileViewController.updateProfileView()');
//     console.log('this.postArray:::',this.postsArray);

//     this.postsArray = [];
    
//     profileService.fetchProfile(this.userID)
//     .then(profile => {
//       this.profile = profile;
//       this.showEditView = false;
//       if(profile.posts.length !== 0){
//         profile.posts.forEach( profileID => {
//           postService.fetchPost(profileID)
//           .then( postObj => this.postsArray.push(postObj));
//         });
//       }
//     })
//     .catch( err => $log.error(err.message));
//   };

//   this.join = function(){
//     $log.debug('ProfileViewController.join()');

//     profileService.joinProfile(this.userID)
//     .then( res => console.log('SUCCESS join()', res))
//     .catch( err => console.error('FAILED join()', err));
//     return this.updateProfileView();
//   };

//   this.leave = function(){
//     $log.debug('ProfileViewController.leave()');

//     profileService.leaveProfile(this.userID)
//     .then( profile => console.log(profile))
//     .catch( (err) => console.error('FAILED leave()', err));
//   };

//   // this.open = function (size, selectedPost) {
//   //   // var parentElem = parentSelector ? 
//   //   //   angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
//   //   var modalInstance = $uibModal.open({
//   //     animation: this.animationsEnabled,
//   //     // ariaLabelledBy: 'modal-title',
//   //     // ariaDescribedBy: 'modal-body',
//   //     templateUrl: 'create-post.html',
//   //     // controller: 'CreatePostController',
//   //     // controllerAs: 'this',
//   //     size: size,
//   //     // appendTo: parentElem,
//   //     resolve: {
//   //       items: function () {
//   //         return selectedPost;
//   //       }
//   //     }
//   //   });

//   //   // modalInstance.result.then(function (selectedItem) {
//   //   //   this.selected = selectedItem;
//   //   // }, function () {
//   //   //   $log.info('Modal dismissed at: ' + new Date());
//   //   // });
//   // };

  // this.openComponentModal = function ( profile) {

  //   var modalInstance = $uibModal.open({
  //     animation: this.animationsEnabled,
  //     component: 'createPost',
  //     resolve: {
  //       profile: function () {
  //         return profile;
  //       }
  //     }
  //   });
  // };


// }

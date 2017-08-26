'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$window', '$location', '$rootScope', '$uibModal', 'authService', 'profileService','pageService', NavbarController],
  controllerAs: 'navbarCtrl'
};

function NavbarController($log, $window, $location, $rootScope, $uibModal, authService, profileService, pageService) {
  $log.debug('NavbarController');

  // this.profilePic = $window.localStorage.getItem('profilePic');
  $rootScope.$on('$locationChangeStart', () => {
    // this.openPostModal({ _id: $location.search().id});()
    // console.log('atarere', $location.search().id);
    if($location.search().id) {
      $uibModal.open({
        animation: this.animationsEnabled,
        component: 'postItem',
        resolve: {
          post: function () {
            return { _id: $location.search().id};
          }
        }
      });
    }
    
  });
  
  this.fetchMyProfile = function(){

    let userID = $window.localStorage.getItem('userID');
    profileService.fetchProfile(userID)
    .then( profile => {
      $window.localStorage.setItem('profilePic', profile.profilePicURI);
      $window.localStorage.setItem('profileID', profile._id);
      return this.profilePic = profile.profilePicURI;
    });
  };


  this.goSignUp = function() {
    $log.debug('NavbarController.goSignUp()');

    $location.url('/join');
  };

  this.goLogin = function() {
    $log.debug('NavbarController.goLogin()');

    $location.url('/signin');
  };

  this.goToPage = function(pageID) {
    $log.debug('NavbarController.myPage()');

    // let userID = $window.localStorage.getItem('userID');
    $location.url(`/page/${pageID}/posts`);
  };

  this.myProfile = function() {
    $log.debug('NavbarController.myProfile()');

    let userID = $window.localStorage.getItem('userID');
    let profileID = $window.localStorage.getItem('profileID');
    $location.url(`/profile/${userID}/${profileID}`);
  };

  this.myAccount = function(){
    $log.debug('NavbarCtrl.myAccount');

    // let userID = $window.localStorage.getItem('userID');
    $location.url('settings/profile');
  };

  this.goHome = function() {
    $log.debug('NavbarController.goHome()');

    $location.url('/');
  };

  this.home = function() {
    $log.debug('NavbarController.home()');

    $location.url('/home');
  };

  this.logout = () => {
    $log.debug('NavbarController.logout()');

    authService.logout()
    .then( () => {
      $location.url('/');
    });
  };
  
  this.searchPages = () => {
    pageService.searchPages(this.searchName)
    .then( pages => this.pagesArr = pages );
  };

  this.checkPath = () => {
    $log.debug('NavbarController.checkPath()');

    let pathArray = $location.path().split('/');
    let path = `/${pathArray[1]}`;
    if (pathArray.length === 1) path = '/';

    if (path === '/' || path === '/landing') {
      this.hideLoginBtn = false;
      this.hideSignupBtn = false;
      this.hideLogout = true;
      this.hideMyRecipesBtn = true;
      this.hideHomeBtn = true;
      this.hideProfileBtn = true;
    }

    if (path === '/home') {
      this.hideLoginBtn = true;
      this.hideSignupBtn = true;
      this.hideLogout = false;
      this.hideMyRecipesBtn = false;
      this.hideHomeBtn = true;
      this.hideProfileBtn = false;
      this.fetchMyProfile();
    }

    if (path === '/mypage') {
      this.hideLoginBtn = true;
      this.hideSignupBtn = true;
      this.hideLogout = false;
      this.hideMyRecipesBtn = true;
      this.hideHomeBtn = false;
      this.hideProfileBtn = false;
      this.fetchMyProfile();
    }

    if (path === '/page') {
      authService.getToken()
      .then( () => {
        this.hideProfileBtn = false;
        this.hideLoginBtn = true;
        this.hideSignupBtn = true;
        this.hideLogout = false;
        this.hideMyRecipesBtn = true;
        this.hideHomeBtn = false;
      })
      .catch( () => {
        this.hideLoginBtn = false;
        this.hideSignupBtn = false;
        this.hideLogout = true;
        this.hideMyRecipesBtn = true;
        this.hideHomeBtn = true;
      });
    }

    if (path === '/join') {
      this.hideSignupBtn = false;
      this.hideLoginBtn = false;
      this.hideLogout = true;
      this.hideMyRecipesBtn = true;
      this.hideHomeBtn = true;
      this.hideProfileBtn = true;
    }

    if (path === '/signin') {
      this.hideLoginBtn = false;
      this.hideSignupBtn = false;
      this.hideLogout = true;
      this.hideMyRecipesBtn = true;
      this.hideHomeBtn = true;
      this.hideProfileBtn = true;
    }
  };

  this.checkPath();

  $rootScope.$on('$locationChangeSuccess', () => this.checkPath());
}

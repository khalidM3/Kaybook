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
    this.checkPath();
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

    // let userID = $window.localStorage.getItem('userID');
    profileService.fetchProfile()
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

    let profileID = $window.localStorage.getItem('profileID');
    $location.url(`/profile/${profileID}`);
  };

  this.myAccount = function(){
    $log.debug('NavbarCtrl.myAccount');

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


  this.check_profile = () => {
    if(!$window.localStorage.profile) {
      profileService.fetchProfile()
      .then( profile => {
        console.log('profile >>>>>>>>>', profile);
        this.profile = profile;
        $window.localStorage.profile = JSON.stringify(profile);
        $window.localStorage.profileID = profile._id;
      });
    } else {
      this.profile = JSON.parse($window.localStorage.profile);
    }
  };

  this.checkPath = () => {
    $log.debug('NavbarController.checkPath()');

    let pathArray = $location.path().split('/');
    let path = `/${pathArray[1]}`;
    if (pathArray.length === 1) path = '/';
    
    this.loggedIn = true;
    this.loginBtn = false;
    this.signupBtn = false;

    if (path === '/' || path === '/landing') {
      this.signupBtn = true;
      this.loginBtn = true;
      this.loggedIn = false;
    }

    if (path === '/home') {
      console.log('CHECKING CHECKING CHECKING CHECKIGN CHECKING', $window.localStorage.profileID);
      this.loggedIn = true;
      authService.getToken()
      .then( () => {
        this.loggedIn = true;
        this.check_profile();
      })
      .catch( () => {
        $location.url('/landing');
      });
    }

    if (path === '/mypage') {
      this.fetchMyProfile();
    }

    if (path === '/page') {
      authService.getToken()
      .then( () => {
        this.loggedIn = true;
      })
      .catch( () => {
        $location.url('/landing');
      });
    }

    if (path === '/join') {
      this.loginBtn = true;
      this.loggedIn = false;
    }

    if (path === '/signin') {
      this.signupBtn = true;      
      this.loggedIn = false;
    }
  };

  // this.checkPath();

  // $rootScope.$on('$locationChangeSuccess', () => this.checkPath());
}

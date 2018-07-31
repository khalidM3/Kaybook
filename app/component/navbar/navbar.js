'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$window', '$location', '$rootScope', '$uibModal', 'authService', 'profileService','pageService', NavbarController],
  controllerAs: 'navbarCtrl'
};

function NavbarController($log, $window, $location, $rootScope, $uibModal, authService, profileService, pageService) {
  $log.debug('NavbarController');

  $rootScope.$on('$locationChangeStart', () => {
    this.checkPath();
    if($location.search().id) {
      $uibModal.open({
        animation: this.animationsEnabled,
        component: 'postItem',
        resolve: {
          post: function () {
            return { _id: $location.search().id};
          }
        }
      })
      .closed.then( () => {
        $location.search('id', null);
      });
    }
    
  });
  
  this.fetchMyProfile = function(){
    profileService.fetchProfile()
    .then( profile => {
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
      delete $window.localStorage.token;
      delete $window.localStorage.profile;
      $location.url('/');
    });
  };
  
  this.searchEnd = () => {
    this.showResults = false;
    this.pagesArr = null;
  };

  this.searchPages = () => {
    if(this.searchName.split('').length > 3) {
      this.showResults = true;
      pageService.searchPages(this.searchName)
      .then( pages =>  {
        if(pages.length > 0 ) return this.pagesArr = pages;
        this.pagesArr = [{pageName: 'found nothing'}];
      });
    }
    
  };

  this.check_user = () => {
    profileService.fetchProfile()
    .then( profile => {
      this.profile = profile;
      this.loggedIn = true;
    })
    .catch( () => console.log('not logged in'));
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
      this.loggedIn = true;
      authService.getToken()
      .then( () => {
        this.loggedIn = true;
        this.check_user();
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

}

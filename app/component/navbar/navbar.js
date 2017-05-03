'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$window', '$location', '$rootScope', 'authService', NavbarController],
  controllerAs: 'navbarCtrl'
};

function NavbarController($log, $window, $location, $rootScope, authService) {
  $log.debug('NavbarController');

  this.profilePic = $window.localStorage.getItem('profilePic');

  this.goSignUp = function() {
    $log.debug('NavbarController.goSignUp()');

    $location.url('/join');
  };

  this.goLogin = function() {
    $log.debug('NavbarController.goLogin()');

    $location.url('/signin');
  };

  this.myPage = function() {
    $log.debug('NavbarController.myPage()');

    let userID = $window.localStorage.getItem('userID');
    $location.url(`/mypage/${userID}`);
  };

  this.goHome = function() {
    $log.debug('NavbarController.goHome()');

    $location.url('/');
  };

  this.home = function() {
    $log.debug('NavbarController.home()');

    let userID = $window.localStorage.getItem('userID');
    $location.url(`/home/${userID}`);
  };

  this.logout = () => {
    $log.debug('NavbarController.logout()');

    authService.logout()
    .then( () => {
      $location.url('/');
    });
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
    }

    if (path === '/mypage') {
      this.hideLoginBtn = true;
      this.hideSignupBtn = true;
      this.hideLogout = false;
      this.hideMyRecipesBtn = true;
      this.hideHomeBtn = false;
      this.hideProfileBtn = false;
    }

    if (path === '/recipe') {
      authService.getToken()
      .then( () => {
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

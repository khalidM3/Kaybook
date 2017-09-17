'use strict';

require('./_login.scss');

module.exports = ['$log', '$location', '$window', 'authService', LoginController];

function LoginController($log, $location, $window, authService) {
  $log.debug('LoginController');

  this.myProfile = {};
  this.user = {};

  this.login = function() {
    $log.debug('loginCtrl.login');
    let profileID = $window.localStorage.getItem('profileID');
    console.log('PID +++++++', profileID);
    console.log('USER::', this.user);
    authService.login(this.user)
    .then( () => $location.url('/home'))
    .catch( () => {
      this.showLoginError = true;
      this.user = null;
    });
  };
}
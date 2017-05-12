'use strict';

module.exports = ['$stateProvider', '$urlRouterProvider', routerConfig];

function routerConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('', '/landing');
  $urlRouterProvider.when('/', '/landing');
  $urlRouterProvider.when('/signup', '/signup');
  $urlRouterProvider.when('/login', '/login');

  let states = [
    {
      name: 'home',
      url: '/home/:userID',
      template: require('../view/home/home.html'),
      controller: 'HomeController',
      controllerAs: 'homeCtrl'
    },
    {
      name: 'settings',
      url: '/settings/:userID',
      template: require('../view/settings/settings.html'),
      controller: 'SettingsController',
      controllerAs: 'settingsCtrl'
    },
    {
      name: 'mypage',
      url: '/mypage/:userID',
      template: require('../view/mypage/mypage.html'),
      controller: 'MypageController',
      controllerAs: 'mypageCtrl'
    },
    {
      name: 'landing',
      url: '/landing',
      template: require('../view/landing/landing.html'),
      controller: 'LandingController',
      controllerAs: 'landingCtrl'
    },
    {
      name: 'signup',
      url: '/join',
      template: require('../view/signup/signup.html'),
      controller: 'SignupController',
      controllerAs: 'signupCtrl'
    },
    {
      name: 'login',
      url: '/signin',
      template: require('../view/login/login.html'),
      controller: 'LoginController',
      controllerAs: 'loginCtrl'
    }
  ];

  states.forEach( state => {
    $stateProvider.state(state);
  });
}

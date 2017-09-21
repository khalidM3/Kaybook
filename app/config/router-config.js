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
      url: '/home/:section',
      params: {
        section: {
          value: null,
          squash: true,
        }
      },
      template: require('../view/home/home.html'),
      controller: 'HomeController',
      controllerAs: 'homeCtrl'
    },
    {
      name: 'hash',
      url: '/hash/:term',
      template: require('../view/hash/hash.html'),
      controller: 'HashController',
      controllerAs: 'hashCtrl'
    },
    {
      name: 'settings',
      url: '/settings/:section',
      template: require('../view/settings/settings.html'),
      controller: 'SettingsController',
      controllerAs: 'settingsCtrl'
    },
    {
      name: 'myprofile',
      url: '/profile/:profileID',
      template: require('../view/myprofile/myprofile.html'),
      controller: 'MyprofileController',
      controllerAs: 'myprofileCtrl'
    },
    {
      name: 'page',
      url: '/page/:pageID/:section',
      params: {
        section: {
          value: null,
          squash: true,
        },
      },
      template: require('../view/mypage/mypage.html'),
      controller: 'MypageController',
      controllerAs: 'mypageCtrl'
    },
    {
      name: 'forum',
      url: '/question/:questionID',
      template: require('../view/forum/forum.html'),
      controller: 'ForumController',
      controllerAs: 'forumCtrl'
    },
    {
      name: 'article',
      url: '/article/:articleID',
      template: require('../view/article/article.html'),
      controller: 'ArticleController',
      controllerAs: 'articleCtrl'
    },
    {
      name: 'social',
      url: '/social/:section',
      params: {
        section: {
          value: null,
          squash: true,
        }
      },
      template: require('../view/social/social.html'),
      controller: 'SocialController',
      controllerAs: 'socialCtrl'
    },
    {
      name: 'merch',
      url: '/merch/:pageID',
      template: require('../view/merch/merch.html'),
      controller: 'MerchController',
      controllerAs: 'merchCtrl'
    },
    {
      name: 'product',
      url: '/product/:section',
      params: {
        section: {
          value: null,
          squash: true,
        }
      },
      template: require('../view/product/product.html'),
      controller: 'ProductController',
      controllerAs: 'productCtrl'
    },
    {
      name: 'room',
      url: '/room/:roomID',
      template: require('../view/room/room.html'),
      controller: 'RoomController',
      controllerAs: 'roomCtrl'
    },
    {
      name: 'poll',
      url: '/poll/:pollID',
      template: require('../view/poll/poll.html'),
      controller: 'PollController',
      controllerAs: 'pollCtrl'
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
      name: 'logins',
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

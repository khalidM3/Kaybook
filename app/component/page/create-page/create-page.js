'use strict';

require('./_create-page.scss');

module.exports = {
  template: require('./create-page.html'),
  controller: ['$log', '$window', 'pageService', CreatePageController],
  controllerAs: 'createPageCtrl'
};

function CreatePageController($log, $window, pageService) {
  $log.debug('CreatePageController');

  this.page = {};
  
  this.createPage = function(){
    $log.debug('createPageCtrl.createPage()');

    pageService.createPage(this.page)
    .then( page => console.log('Success createpage()', page))
    .catch(err => console.log('Failed createPage()', err));
  };
}
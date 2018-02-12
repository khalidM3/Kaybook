'use strict';

require('./_create-page.scss');

module.exports = {
  template: require('./create-page.html'),
  controller: ['$log', '$window', 'pageService', CreatePageController],
  controllerAs: 'createPageCtrl',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&',
  }
};

function CreatePageController($log, $window, pageService) {
  $log.debug('CreatePageController');

  this.page = {};

  this.check = () => {
    this.page.public ? console.log('changing the rest') : false;
  };
  
  this.createPage = function(){
    $log.debug('createPageCtrl.createPage()');

    pageService.createPage(this.page)
    .then( page =>  {
      console.log('Success createpage()', page);
      this.dismiss({$value: 'cancel'});
    })
    .catch(err => console.log('Failed createPage()', err));
  };
}
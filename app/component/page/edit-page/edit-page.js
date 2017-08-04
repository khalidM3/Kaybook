'use strict';

require('./_edit-page.scss');

module.exports = {
  template: require('./edit-page.html'),
  controller:['$log', 'pageService', EditPageController],
  controllerAs: 'editPageCtrl',
  bindings: {
    page: '<'
  }
};

function EditPageController($log, pageService){
  $log.debug('EditPageController');

  this.editPage = function(){
    $log.debug('editPageCtrl.editPage()');
    
    pageService.editPage(this.page._id, this.page)
    .then( page => console.log('Success editpage()', page))
    .catch(err => console.log('Failed editPage()', err));
  };


}
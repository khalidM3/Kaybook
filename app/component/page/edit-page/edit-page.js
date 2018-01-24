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


  this.addLink = () => {
    let val_name = this.link_name.split('').length > 1;
    let val_link = this.link_link.split('').length > 5;
    if(!val_name || !val_link) return;
    return this.page.links.push({ name: this.link_name, link: this.link_link});
  };

  this.removeLink = (link) => {
    return this.page.links = this.page.links.filter( l => l.name !== link.name);
  };


  this.bark = () => console.log(this.page);
  this.editPage = function(){
    $log.debug('editPageCtrl.editPage()');
    
    pageService.editPage(this.page._id, this.page)
    .then( page => console.log('Success editpage()', page))
    .catch(err => console.log('Failed editPage()', err));
  };


}
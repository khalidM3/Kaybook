'use strict';

require('./_modal-item.scss');

module.exports = {
  template: require('./modal-item.html'),
  controller: ['$log', ModalItemController],
  controllerAs: 'modalItemCtrl',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

function ModalItemController($log) {
  $log.debug('ModalController');

  
  this.$onInit = () => {
    console.log('modal controller', this.resolve.message);
  };

}
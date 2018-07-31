'use strict';

require('./_cart.scss');

module.exports = {
  template: require('./cart.html'),
  controller: ['$log','$window', CartController],
  controllerAs: 'cartCtrl',
  bindings: {
    page: '<',
  }
};

function CartController($log, $window) {
  $log.debug('CartController');

  this.$onInit = function(){
    $log.debug('cartCtrl.$oninit()');
    this.merches = JSON.parse($window.localStorage.merch);
    this.total = 0;
    for(var prop in this.merches) {
      let ptotal = this.merches[prop].price * this.merches[prop].count;
      this.total = this.total + ptotal;
    }
  };

  this.removeItem = (merch) => {
    delete this.merches[merch._id];
    $window.localStorage.merch = JSON.stringify(this.merches);
  };

  



}
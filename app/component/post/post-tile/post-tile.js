'use strict';

require('./_post-tile.scss');

module.exports = {
  template: require('./post-tile.html'),
  controller: ['$log', '$uibModal', PostTileController],
  controllerAs: 'postTileCtrl',
  bindings: {
    post: '<'
  }
};


function PostTileController($log, $uibModal){
  $log.debug('PostTileController');

  
  this.animationsEnabled = true;

  this.open = function (size, parentSelector) {
    // var parentElem = parentSelector ? 
    //   angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: this.animationsEnabled,
      // ariaLabelledBy: 'modal-title',
      // ariaDescribedBy: 'modal-body',
      // templateUrl: 'myModalContent.html',
      // controller: 'ModalInstanceCtrl',
      // controllerAs: 'this',
      size: size,
      // appendTo: parentElem,
      // resolve: {
      //   items: function () {
      //     return this.items;
      //   }
      // }
    });

    // modalInstance.result.then(function (selectedItem) {
    //   this.selected = selectedItem;
    // }, function () {
    //   $log.info('Modal dismissed at: ' + new Date());
    // });
  };

  this.openComponentModal = function (post) {
    var modalInstance = $uibModal.open({
      animation: this.animationsEnabled,
      component: 'postItem',
      resolve: {
        post: function () {
          console.log('<><><><><><><><><><><><><>', post);
          return post; 
        }
      }
    });

  };


}
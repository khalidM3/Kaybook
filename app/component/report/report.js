'use strict';

require('./_report.scss');

module.exports = {
  template: require('./report.html'),
  controller: ['$log', 'postService', 'answerService', ReportController],
  controllerAs: 'reportCtrl',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

function ReportController($log, postService, answerService) {
  $log.debug('ReportController');


  this.reportPost = () => {
    if(this.resolve.post) {
      postService.reportPost(this.resolve.post._id, this.report)
      .then( post => console.log('success', post));
    }

    if(this.resolve.answer) {
      answerService.reportAnswer(this.resolve.answer._id, this.report)
      .then( answer => console.log('Success ', answer));
    }
   
  };

  this.ok = function () {
    this.close({$value: this.post});
  };

  this.cancel = function () {
    this.dismiss({$value: 'cancel'});
  };

}
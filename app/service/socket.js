'use strict';

module.exports = ['$log', '$rootScope', socket];

function socket($log, $rootScope){
  $log.debug('SocketService');

  let socket = io.connect(`${__API_URL__}`);

  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    }
  };
}


// 'use strict';

// module.exports = ['$log', 'socketFactory', socketService];

// function socketService($log, socketFactory){
//   $log.debug('SocketService');

//   let chatSocket = io.connect(`${__API_URL__}/chat`);

//   let mySockets = socketFactory({
//     ioSocket: chatSocket
//   });

//   return mySockets;
// }
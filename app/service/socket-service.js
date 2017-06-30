'use strict';

module.exports = ['$log', 'socketFactory', socketService];

function socketService($log, socketFactory){
  $log.debug('SocketService');

  let chatSocket = io.connect(`${__API_URL__}/chat`);

  let mySockets = socketFactory({
    ioSocket: chatSocket
  });

  return mySockets;
}
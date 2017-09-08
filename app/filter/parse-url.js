'use strict';

module.exports  = () => (str) => {
  console.log('str\n',str);
  let urlReg = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  let imgReg = /\.(?:jpe?g|gif|png)$/i;
  return str.replace(urlReg, (match) => {
    console.log('match\n',match);
    return imgReg.test(match) ? '<img src="'+match+'" class="thumb" />' : '<a href="'+match+'" target="_blank">'+match+'</a>';
  });
};
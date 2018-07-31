'use strict';

module.exports = ($q) => (src) => {
  console.log('filter in progress', src);
  var deferred = $q.defer();
  var image = new Image();
  image.onerror = () =>  {
    deferred.resolve('http://via.placeholder.com/500x300');
  };
  image.onload = () =>  {
    deferred.resolve(src);
  };
  image.src = src;
  return deferred.promise;

};

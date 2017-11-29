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
  // let it = deferred.promise;
  console.log('IT',deferred.promise);
  // for( var prop in it) console.log(it[prop]);
  return deferred.promise;
  

  //  'http://via.placeholder.com/500x300';
};

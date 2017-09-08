'use strict';

module.exports  = ($sce) => (url) => {
  console.log('hahahahahaha', url);
  let getYT = function(str){
    console.log(str);
    let id = str.split('watch?v=')[1];
    let url = 'https://www.youtube.com/embed/'+ id;
    return url;
  };


  let getYT2 = (str) => {
    let id = str.split('youtu.be/')[1];
    let url = 'https://youtube.com/embed/'+ id;
    console.log(url);
    return url;
  };


  let getVimeo = function(str){
    let id = str.split('https://vimeo.com/')[1];
    let url = 'https://player.vimeo.com/video/' + id;
    console.log(url);
    return url;
  };

  let getImgur = (str) => {
    let id = str.split('/')[str.split('/').length -1];
    let url = 'https://i.imgur.com/'+ id + '.png';
    console.log(url);
    return url;
  };

  let embed = (str) =>  {
    let youtube = str.match(/youtube.com\/watch/);
    if( youtube) return getYT(str);
    let youtube2 = str.match(/youtu.be/);
    if(youtube2) return getYT2(str);
    let yt3 = str.match(/youtube.com\/embed/);
    if(yt3) return yt3.toString();
    let vimeo = str.match(/vimeo.com/);
    if(vimeo) return getVimeo(str);
    let imgur = str.match(/imgur.com/);
    if(imgur) return getImgur(str);
    return str;
  };
  let embeded = embed(url);
  return $sce.trustAsResourceUrl(embeded);

};
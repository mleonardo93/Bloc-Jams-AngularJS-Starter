(function() {
  function AlbumCtrl() {
    this.albumData = Object.assign({}, albumPicasso);
    this.songs = []
    // thinking about using a loop to fill an array with song data objects
    
  }

  angular
    .module("blocJams")
    .controller("AlbumCtrl", AlbumCtrl);
})();

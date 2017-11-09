(function() {
  function LandingCtrl() {
    this.heroTitle = "Turn the Music Up, Eleanor!";
  }

  angular
    .module("blocJams")
    .controller("LandingCtrl", LandingCtrl);
})();

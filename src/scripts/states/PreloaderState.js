///<reference path="../../reference.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DK;
(function (DK) {
    var PreloaderState = (function (_super) {
        __extends(PreloaderState, _super);
        function PreloaderState() {
            _super.apply(this, arguments);
        }
        PreloaderState.prototype.preload = function () {
            //  Set-up our preloader sprite
            this.preloadBar = new Phaser.Rectangle(0, 550, 800, 50);
            //this.load.setPreloadSprite(this.preloadBar);
            this.load.image('tile', 'images/tile.png');
        };
        PreloaderState.prototype.create = function () {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        };
        PreloaderState.prototype.startMainMenu = function () {
            this.game.state.start('Game', true, false);
        };
        return PreloaderState;
    })(Phaser.State);
    DK.PreloaderState = PreloaderState;
})(DK || (DK = {}));
//# sourceMappingURL=PreloaderState.js.map
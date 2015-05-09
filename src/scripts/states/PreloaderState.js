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
        PreloaderState.prototype.create = function () {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        };
        PreloaderState.prototype.preload = function () {
            this.preloadBar = new Phaser.Rectangle(0, 550, 800, 50);
            //this.load.setPreloadSprite(this.preloadBar);
            this.load.json('map-data', 'maps/test1.json');
            this.load.image('dirt-floor-1', 'images/tiles/dirt-floor.png');
            this.load.image('stone-floor-1', 'images/tiles/stone-floor.png');
            this.load.image('dirt-wall-1', 'images/tiles/dirt-wall.png');
        };
        PreloaderState.prototype.startMainMenu = function () {
            this.game.state.start('Game', true, false);
        };
        return PreloaderState;
    })(Phaser.State);
    DK.PreloaderState = PreloaderState;
})(DK || (DK = {}));
//# sourceMappingURL=PreloaderState.js.map
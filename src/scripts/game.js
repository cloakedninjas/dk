///<reference path="../reference.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DK;
(function (DK) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            var dpr = 1, width = 768 * dpr, height = 1024 * dpr;
            _super.call(this, width, height, Phaser.CANVAS, 'content', null);
            /*
             this.canvas.width *= window.devicePixelRatio;
             this.canvas.height *= window.devicePixelRatio;

             this.canvas.style.width = width + 'px';
             this.canvas.style.height = height + 'px';
             */
            this.state.add('Preloader', DK.PreloaderState, false);
            this.state.add('Game', DK.GameState, false);
            this.state.start('Preloader');
        }
        return Game;
    })(Phaser.Game);
    DK.Game = Game;
})(DK || (DK = {}));
var game;
//# sourceMappingURL=game.js.map
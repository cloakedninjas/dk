///<reference path="../../reference.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DK;
(function (DK) {
    var GameState = (function (_super) {
        __extends(GameState, _super);
        function GameState() {
            _super.apply(this, arguments);
        }
        GameState.prototype.create = function () {
            game.load.image('tile', '/images/tile.png');
            game.time.advancedTiming = true;
            // Add and enable the plug-in.
            game.plugins.add(new Phaser.Plugin.Isometric(game));
            // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
            // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
            game.iso.anchor.setTo(0.5, 0.2);
            //this.game.input.onDown.add(this.onInputDown, this);
            this.spawnTiles();
        };
        GameState.prototype.spawnTiles = function () {
            var isoGroup = game.add.group();
            var tile;
            for (var xx = 0; xx < 256; xx += 38) {
                for (var yy = 0; yy < 256; yy += 38) {
                    // Create a tile using the new game.add.isoSprite factory method at the specified position.
                    // The last parameter is the group you want to add it to (just like game.add.sprite)
                    tile = game.add.isoSprite(xx, yy, 0, 'tile', 0, isoGroup);
                    tile.anchor.set(0.5, 0);
                }
            }
        };
        return GameState;
    })(Phaser.State);
    DK.GameState = GameState;
})(DK || (DK = {}));
//# sourceMappingURL=GameState.js.map
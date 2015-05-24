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
            //game.time.advancedTiming = true;
            // Add and enable the plug-in.
            //game.plugins.add(new Phaser.Plugin.Isometric(game));
            //game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
            //game.iso.anchor.setTo(0.5, 0.1); // offset the camera
            //game.iso.projector = Phaser.Plugin.Isometric.ISOMETRIC;
            //this.game.input.onDown.add(this.onInputDown, this);
            this.spawnTiles();
        };
        GameState.prototype.spawnTiles = function () {
            var mapData = game.cache.getJSON('map-data');
            var tiles = mapData.layers[0];
            var tileLookup = {};
            var lastGid = 0;
            var index;
            var textureId;
            /**
             * @param tileset.firstgid
             */
            _.each(mapData.tilesets, function (tileset) {
                lastGid = tileset.firstgid;
                _.each(tileset.tileproperties, function (properties, tileId) {
                    tileLookup[lastGid + parseInt(tileId)] = properties.name;
                });
            });
            this.isoGroup = new DK.IsoWorld(this.game);
            this.isoGroup.setTiles(tiles, tileLookup);
        };
        GameState.prototype.render = function () {
            /*this.isoGroup.forEach(function (tile) {
                game.debug.body(tile, 'rgba(189, 221, 235, 0.6)', false);
            });*/
            game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
            // game.debug.text(Phaser.VERSION, 2, game.world.height - 2, "#ffff00");
        };
        return GameState;
    })(Phaser.State);
    DK.GameState = GameState;
})(DK || (DK = {}));
//# sourceMappingURL=GameState.js.map
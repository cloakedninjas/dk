///<reference path="../../reference.d.ts"/>

module DK {

    export class GameState extends Phaser.State {
        create() {
            game.time.advancedTiming = true;

            // Add and enable the plug-in.
            game.plugins.add(new Phaser.Plugin.Isometric(game));

            game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
            game.iso.anchor.setTo(0.5, 0.1); // offset the camera

            //game.iso.projector = Phaser.Plugin.Isometric.ISOMETRIC;

            //this.game.input.onDown.add(this.onInputDown, this);

            this.spawnTiles();
        }

        spawnTiles() {
            var isoGroup = game.add.group();
            isoGroup.enableBody = true;
            isoGroup.physicsBodyType = Phaser.Plugin.Isometric.ISOARCADE;

            var mapData = game.cache.getJSON('map-data');
            var tiles = mapData.layers[0];
            var tileLookup = {};
            var lastGid = 0;
            var index;
            var textureId;
            var vertAnchorPoints = {
                1: 32,
                2: 32,
                3: 128
            };

            var xx, yy;

            _.each(mapData.tilesets, function (tileset) {
                lastGid = tileset.firstgid;

                _.each(tileset.tileproperties, function (properties, tileId) {
                    tileLookup[lastGid + parseInt(tileId)] = properties.name;
                });

            });

            //console.log(tileLookup);

            var tile;
            for (var y = 0; y < tiles.height; y++) {
                for (var x = 0; x < tiles.width; x++) {

                    index = (y * tiles.width) + x;
                    textureId = tiles.data[index];

                    //console.log(index, textureId);

                    xx = x * 70;
                    yy = y * 70;

/*
                    if (textureId === 2) {
                        console.log(xx, yy);
                    }
*/

                    if (textureId !== 0) {
                        tile = game.add.isoSprite(xx, yy, 0, tileLookup[textureId], 0, isoGroup);
                        tile.anchor.set(0.5, 1);
                    }
                }
            }

            this.isoGroup = isoGroup;
        }

        render () {
            this.isoGroup.forEach(function (tile) {
                game.debug.body(tile, 'rgba(189, 221, 235, 0.6)', false);
            });

            game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
            // game.debug.text(Phaser.VERSION, 2, game.world.height - 2, "#ffff00");
        }



    }
}
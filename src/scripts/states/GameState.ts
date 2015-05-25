///<reference path="../../reference.d.ts"/>

module DK {

    export class GameState extends Phaser.State {
        isoGroup: IsoWorld;

        create() {
            //game.time.advancedTiming = true;

            // Add and enable the plug-in.
            //game.plugins.add(new Phaser.Plugin.Isometric(game));

            //game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
            //game.iso.anchor.setTo(0.5, 0.1); // offset the camera

            //game.iso.projector = Phaser.Plugin.Isometric.ISOMETRIC;

            //this.game.input.onDown.add(this.onInputDown, this);

            this.spawnTiles();
        }

        spawnTiles() {
            var mapData = game.cache.getJSON('map-data');
            var tiles = mapData.layers[0];
            var tileLookup = {};
            var lastGid = 0;

            /**
             * @param tileset.firstgid
             */
            _.each(mapData.tilesets, function (tileset: any) {
                lastGid = tileset.firstgid;

                _.each(tileset.tileproperties, function (properties: any, tileId: string) {
                    tileLookup[lastGid + parseInt(tileId)] = properties.name;
                });

            });

            this.isoGroup = new IsoWorld(this.game);
            this.isoGroup.setTiles(tiles, tileLookup);
        }


        render () {
            /*this.isoGroup.forEach(function (tile) {
                game.debug.body(tile, 'rgba(189, 221, 235, 0.6)', false);
            });*/

            game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
            // game.debug.text(Phaser.VERSION, 2, game.world.height - 2, "#ffff00");
        }



    }
}
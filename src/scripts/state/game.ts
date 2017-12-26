module DK.State {
    export class Game extends Phaser.State {
        isoGroup: IsoWorld;

        create() {
            // fps toggle
            this.game.time.advancedTiming = true;

            this.spawnTiles();

/*
            this.map = this.game.add.tilemap('test1');
            //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
            this.map.addTilesetImage('Floor', 'dirt-floor-1');
            //create layer
            this.backgroundlayer = this.map.createLayer('backgroundLayer');
*/

        }

        spawnTiles() {
            var mapData = this.game.cache.getJSON('map-data');
            var tiles = mapData.layers[0];
            var tileLookup = {};
            var lastGid = 0;

            /**
             * @param tileset.firstgid
             */
            mapData.tilesets.forEach(function (tileset: any) {
                lastGid = tileset.firstgid;

                for (var key in tileset.tileproperties) {
                    var properties = tileset.tileproperties[key];

                    tileLookup[lastGid + parseInt(key)] = properties.name;
                }
            });

            this.isoGroup = new IsoWorld(this.game);
            this.isoGroup.setTiles(tiles, tileLookup);
        }


        render () {
            /*this.isoGroup.forEach(function (tile) {
                game.debug.body(tile, 'rgba(189, 221, 235, 0.6)', false);
            });*/

            this.game.debug.text(this.game.time.fps.toString(), 2, 14, "#a7aebe");
            this.game.debug.cameraInfo(this.game.camera, 32, 32);
            // game.debug.text(Phaser.VERSION, 2, game.world.height - 2, "#ffff00");
        }
    }
}
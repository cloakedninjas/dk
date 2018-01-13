module TDG.State {
    export class Game extends Phaser.State {
        isoGroup: IsoWorld;
        enemyPath: Array<Phaser.Point>;
        truck: Entity.Truck;

        create() {
            // fps toggle
            this.game.time.advancedTiming = true;
            this.spawnTiles();

            let path = [
                [4,9],
                [4,2],
                [9,2],
                [9,5],
                [14,5],
                [14,1],
                [18,1],
                [18,4],
                [19,4]
            ];

            this.enemyPath = [];

            path.forEach(function (coords) {
               this.enemyPath.push(new Phaser.Point(coords[0], coords[1]));
            }, this);

            //this.truck = new Entity.Truck(this.game, this.isoGroup, path[0][0], path[0][1]);
            this.truck = new Entity.Truck(this.game, this.isoGroup, 6, 7);
            this.isoGroup.add(this.truck);
        }

        spawnTiles() {
            let map = this.game.cache.getTilemapData('level1').data;

            let tiles = map.layers[0];
            let tileLookup = {};
            let lastGid = 0;

            /*map.tilesets.forEach(function (tileset: any) {
                lastGid = tileset.firstgid;

                for (var key in tileset.tileproperties) {
                    var properties = tileset.tileproperties[key];

                    tileLookup[lastGid + parseInt(key)] = properties.name;
                }
            });*/

            this.isoGroup = new IsoWorld(this.game, map.tilewidth, map.tileheight);
            this.isoGroup.setTiles(tiles);
        }

        render () {
            this.game.debug.text(this.game.time.fps.toString(), 2, 14, "#a7aebe");
            //this.game.debug.cameraInfo(this.game.camera, 32, 32);
        }
    }
}
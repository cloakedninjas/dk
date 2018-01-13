module TDG.State {
    export class Preloader extends Phaser.State {
        static TILESET_KEY:string = 'landscape-tiles';

        loadingBar:Entity.PreloadBar;

        preload() {
            this.loadingBar = new Entity.PreloadBar(this.game);
            this.load.tilemap('level1', 'assets/maps/test.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.json(Preloader.TILESET_KEY, 'assets/images/tiles/landscape.json');

            this.load.image('truck-ne', 'assets/images/units/garbage_NE.png');
            this.load.image('truck-nw', 'assets/images/units/garbage_NW.png');
            this.load.image('truck-se', 'assets/images/units/garbage_SE.png');
            this.load.image('truck-sw', 'assets/images/units/garbage_SW.png');

            this.load.onFileComplete.add(this.loadAssets, this);
        }

        create() {
            this.loadingBar.setFillPercent(100);
            var tween = this.game.add.tween(this.loadingBar).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        }

        loadAssets(progress, fileKey) {
            if (fileKey === Preloader.TILESET_KEY) {
                var json = this.cache.getJSON('landscape-tiles');

                for (var tileId in json.tiles) {
                    var parsedTileId = parseInt(tileId) + 1;
                    var tile = json.tiles[tileId];

                    this.load.image(Preloader.TILESET_KEY + parsedTileId, 'assets/images/tiles/' + tile.image);
                }
            }
        }

        startGame() {
            this.game.state.start('game', true);
        }

        loadUpdate() {
            this.loadingBar.setFillPercent(this.load.progress);
        }
    }
}
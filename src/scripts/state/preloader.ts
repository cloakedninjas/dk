module DK.State {
    export class Preloader extends Phaser.State {
        loadingBar:Entity.PreloadBar;

        preload() {
            this.loadingBar = new Entity.PreloadBar(this.game);

            this.load.json('map-data', 'assets/maps/test1.json');
            //this.load.tilemap('level1', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);

            this.load.image('dirt-floor-1', 'assets/images/tiles/dirt-floor.png');
            this.load.image('stone-floor-1', 'assets/images/tiles/stone-floor.png');

            this.load.image('dirt-wall-1', 'assets/images/tiles/dirt-wall.png');
        }

        create() {
            this.loadingBar.setFillPercent(100);
            var tween = this.game.add.tween(this.loadingBar).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        }

        startGame() {
            this.game.state.start('game', true);
        }

        loadUpdate() {
            this.loadingBar.setFillPercent(this.load.progress);
        }
    }
}
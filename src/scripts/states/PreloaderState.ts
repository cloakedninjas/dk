///<reference path="../../reference.d.ts"/>

module DK {

    export class PreloaderState extends Phaser.State {

        preloadBar: Phaser.Rectangle;

        create() {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        }

        preload() {
            this.preloadBar = new Phaser.Rectangle(0, 550, 800, 50);
            //this.load.setPreloadSprite(this.preloadBar);

            this.load.json('map-data', 'maps/test1.json');
            //this.load.tilemap('level1', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);


            this.load.image('dirt-floor-1', 'images/tiles/dirt-floor.png');
            this.load.image('stone-floor-1', 'images/tiles/stone-floor.png');

            this.load.image('dirt-wall-1', 'images/tiles/dirt-wall.png');
        }

        startMainMenu() {
            this.game.state.start('Game', true, false);
        }
    }
}
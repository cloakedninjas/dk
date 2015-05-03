///<reference path="../../reference.d.ts"/>

module DK {

    export class PreloaderState extends Phaser.State {

        preloadBar: Phaser.Rectangle;

        preload() {
            //  Set-up our preloader sprite
            this.preloadBar = new Phaser.Rectangle(0, 550, 800, 50);
            //this.load.setPreloadSprite(this.preloadBar);

            this.load.image('tile', 'images/tile.png');
        }

        create() {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        }

        startMainMenu() {
            this.game.state.start('Game', true, false);
        }
    }
}
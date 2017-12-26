/// <reference path="../refs.d.ts" />

module DK {
    export class Game extends Phaser.Game {

        constructor() {
            super();

            this.state.add('preloader', State.Preloader, true);
            this.state.add('game', State.Game);
        }
    }
}

// export Game to window
var Game = DK.Game;


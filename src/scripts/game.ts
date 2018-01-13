/// <reference path="../refs.d.ts" />

module TDG {
    export class Game extends Phaser.Game {

        constructor() {
            super(window.innerWidth, window.innerHeight);

            this.state.add('preloader', State.Preloader, true);
            this.state.add('game', State.Game);
        }
    }
}

// export Game to window
var Game = TDG.Game;


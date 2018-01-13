module TDG.Entity {
    export class Truck extends TDG.IsoSprite {
        game:Game;
        velocity: any;

        constructor(game, isoWorld, x, y) {
            super(game, isoWorld, x, y, 'truck-ne');

            this.y -= isoWorld.halfTileSize.height;
            this.z = 1;
            this.anchor.x = 0.5;
            this.anchor.y = 0.5;

            this.velocity = {
                x: 0,
                y: 0
            }
        }

        update() {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
        }

    }
}
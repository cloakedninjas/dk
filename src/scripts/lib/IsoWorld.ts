///<reference path="../../reference.d.ts"/>

module DK {
    export class IsoWorld extends Phaser.Group {

        anchor: Phaser.Point;
        tileSize: Object;
        cursors: Phaser.CursorKeys;

        constructor (game: Phaser.Game, parent?: PIXI.DisplayObjectContainer, name?: string, addToStage?: boolean, enableBody?: boolean, physicsBodyType?: number) {
            super(game, parent, name, addToStage, enableBody, physicsBodyType);

            this.tileSize = {
                width: 128,
                height: 64
            };

            this.cursors = game.input.keyboard.createCursorKeys();
            //this.game.camera.follow(this);
        }

        setTiles (tiles, tileLookup) {
            var tile;
            for (var y = 0; y < tiles.height; y++) {
                for (var x = 0; x < tiles.width; x++) {

                    index = (y * tiles.width) + x;
                    textureId = tiles.data[index];

                    if (textureId !== 0) {
                        tile = new IsoTile(this.game, x, y, tileLookup[textureId], 0);
                        this.add(tile);
                    }
                }
            }

            var xOffset = (tiles.width * this.tileSize.width) / 2,
                yOffset = 0; //(tiles.height * this.tileSize.height) / 2;

            //console.log(xOffset, yOffset);
            this.position.setTo(xOffset, yOffset);
            this.game.world.setBounds(0, 0, tiles.width * this.tileSize.width, tiles.height * this.tileSize.height);
        }

        update () {
            super.update();

            if (this.cursors.up.isDown) {
                this.position.add(0, 10);
            }
            else if (this.cursors.down.isDown) {
                this.position.add(0, -10);
            }

            if (this.cursors.left.isDown)  {
                this.position.add(10, 0);
            }
            else if (this.cursors.right.isDown) {
                this.position.add(-10, 0);
            }
        }

    }
}
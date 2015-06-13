///<reference path="../../reference.d.ts"/>

module DK {
    export class IsoWorld extends Phaser.Group {

        children: [IsoTile];
        anchor: Phaser.Point;
        tileSize: {
            width: number
            height: number
        };
        halfTileSize: {
            width: number
            height: number
        };
        cursors: Phaser.CursorKeys;

        plop: Phaser.Signal;

        constructor (game: Phaser.Game, parent?: PIXI.DisplayObjectContainer, name?: string, addToStage?: boolean, enableBody?: boolean, physicsBodyType?: number) {
            super(game, parent, name, addToStage, enableBody, physicsBodyType);

            this.tileSize = {
                width: 128,
                height: 64
            };

            this.halfTileSize = {
                width: this.tileSize.width / 2,
                height: this.tileSize.height / 2
            };

            // bind inputs
            this.cursors = game.input.keyboard.createCursorKeys();

            game.input.addMoveCallback(this.handleMouseMove, this);
        }

        setTiles (tiles, tileLookup) {
            var tile, index, textureId;

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

            this.position.setTo(xOffset, yOffset);
            this.game.world.setBounds(0, -this.tileSize.height / 2, tiles.width * this.tileSize.width, tiles.height * this.tileSize.height);

            this.add(this.children[5].getOutline());

            //this.add(this.children[21].getOutline());
        }

        update () {
            super.update();

            var scrollAmount = 10;

            if (this.cursors.up.isDown) {
                this.game.camera.y -= scrollAmount
            }
            else if (this.cursors.down.isDown) {
                this.game.camera.y += scrollAmount;
            }

            if (this.cursors.left.isDown)  {
                this.game.camera.x -= scrollAmount;
            }
            else if (this.cursors.right.isDown) {
                this.game.camera.x +=scrollAmount;
            }


        }

        handleMouseMove (e) {
            var isoCoords = this.screenToIso(e.screenX, e.screenY);
            //console.log(isoCoords);
        }

        screenToIso (x, y) {
            //var isoX = (x / (this.halfTileSize.width) + y / (this.halfTileSize.width) / 2);

            // adjust for camera position
            x += this.game.camera.position.x;
            y += this.game.camera.position.y;

            var isoX = y / this.tileSize.height + x / (2 * this.tileSize.width);
            var isoY = y / this.tileSize.height - x / (2 * this.tileSize.width);

            return [isoX, isoY];
        }

    }
}
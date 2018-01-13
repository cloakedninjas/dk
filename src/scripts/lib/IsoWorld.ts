module TDG {
    import Graphics = Phaser.Graphics;
    export class IsoWorld extends Phaser.Group {

        children: [IsoSprite];
        tileSize: {
            width: number
            height: number
        };
        halfTileSize: {
            width: number
            height: number
        };
        worldSize: {
            width: number
            height: number
        };
        cursors: Phaser.CursorKeys;
        activeTileMaker: Graphics;

        constructor (game: Phaser.Game, tileWidth:number, tileHeight:number, parent?: PIXI.DisplayObjectContainer, name?: string, addToStage?: boolean, enableBody?: boolean, physicsBodyType?: number) {
            super(game, parent, name, addToStage, enableBody, physicsBodyType);

            this.tileSize = {
                width: tileWidth,
                height: tileHeight
            };

            this.halfTileSize = {
                width: this.tileSize.width / 2,
                height: this.tileSize.height / 2
            };

            // bind inputs
            this.cursors = game.input.keyboard.createCursorKeys();
            //game.input.addMoveCallback(this.handleMouseMove, this);
        }

        setTiles (tiles) {
            let tile, index, textureId;

            for (let y = 0; y < tiles.height; y++) {
                for (let x = 0; x < tiles.width; x++) {

                    index = (y * tiles.width) + x;
                    textureId = tiles.data[index];

                    if (textureId !== 0) {
                        tile = new IsoSprite(this.game, this, x, y, State.Preloader.TILESET_KEY + textureId, 0);
                        this.add(tile, undefined, undefined, false);
                    }
                }
            }

            this.worldSize = {
                width: tiles.width,
                height: tiles.height
            };

            let boundsTopLeftX = this.isoToScreen(0, (tiles.height - 1)).x - this.halfTileSize.width,
                boundsTopLeftY = -this.children[0].height,
                boundsBottomRightX = this.isoToScreen((tiles.width - 1), 0).x + this.halfTileSize.width,
                boundsBottomRightY = this.isoToScreen((tiles.width - 1), (tiles.height - 1)).y + this.halfTileSize.height,

                boundsWidth = Math.abs(boundsTopLeftX) + boundsBottomRightX,
                boundsHeight = Math.abs(boundsTopLeftY) + boundsBottomRightY;

            this.game.world.setBounds(boundsTopLeftX, boundsTopLeftY, boundsWidth, boundsHeight);

            //this.add(this.children[2].getOutline());
            //this.add(this.children[3].getOutline());
            //this.add(this.children[5].getOutline());
        }

        update () {
            super.update();

            let scrollAmount = 10;

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

            let isoCoords = this.screenToIso(this.game.input.mousePointer.x, this.game.input.mousePointer.y);

            //this.game.debug.text(this.game.input.mousePointer.x + ', ' + this.game.input.mousePointer.y, 2, 14, "#a7aebe");
            this.game.debug.text(isoCoords[0] + ', ' + isoCoords[1], 2, 28, "#a7aebe");

            this.children.forEach(function (child) {
                child.update();
            });
        }

        handleMouseMove (e) {
            /*let isoCoords = this.screenToIso(e.clientX, e.clientY);

            if (isoCoords[0] >= 0 && isoCoords[1] >= 0) {
                // get tile from index
                let activeTile = this.getTileAt(isoCoords[0], isoCoords[1]);

                if (activeTile !== this.hoveredTile) {
                    if (this.hoveredTile) {
                        this.hoveredTile.setHiglight(false);
                    }

                    this.hoveredTile = activeTile;
                    this.hoveredTile.setHiglight(true);

                    if (this.tileHighlight) {
                        this.remove(this.tileHighlight);
                    }

                    this.tileHighlight = tile.getOutline();
                    this.add(this.tileHighlight);
                }
            }*/
        }

        screenToIso (x, y) {
            // adjust for camera position
            x += this.game.camera.position.x;
            y += this.game.camera.position.y;

            // adjust for tile height
            y -= this.halfTileSize.height;

            //let x2 = (x / this.halfTileSize.width + (y / this.halfTileSize.height)) / 2;
            //let y2 = (y / this.halfTileSize.height - (y / this.halfTileSize.width)) / 2;

            let x2 = Math.round(x / this.tileSize.width + y / this.tileSize.height) + 1;
            let y2 = Math.round(y / this.tileSize.height - x / this.tileSize.width) + 1;

            return [x2, y2];
        }

        isoToScreen (x, y) {
            let posX = (x - y) * this.halfTileSize.width;
            let posY = (x + y) * this.halfTileSize.height;

            return new Phaser.Point(posX, posY);
        }

        getTileAt (x, y): IsoSprite {
            if (y === 0) {
                return this.children[x];
            }

            return this.children[(y * this.worldSize.width) + x];
        }

        add(child, silent?, index?, resort?: boolean) {
            let c = super.add(child, silent, index);

            if (resort !== false) {
                this.depthSort();
            }

            return c;
        }

        depthSort() {
            this.children.sort(function (a, b) {
               if (a.isoPosition.y > b.isoPosition.y) {
                   return 1;
               } else if (a.isoPosition.y < b.isoPosition.y) {
                   return -1;
               } else if (a.isoPosition.x > b.isoPosition.x) {
                   return 1;
               } else if (a.isoPosition.x < b.isoPosition.x) {
                   return -1;
               } else if (a.z > b.z) {
                   return -1;
               }

               return 0;
            });
        }
    }
}
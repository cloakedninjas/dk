module TDG {
    export class IsoSprite extends Phaser.Sprite {
        isoWorld: IsoWorld;
        isoPosition: Phaser.Point;
        isoBounds: any;
        wallHeight: number; // 0 if a floor tile
        z: number;

        constructor(game, isoWorld, x, y, key?, frame?) {
            super(game, x, y, key, frame);
            this.isoWorld = isoWorld;
            this.z = 0;
            this.isoPosition = new Phaser.Point(x, y);
            this.position = this.isoToScreen();

            // set anchor point based on texture
            this.wallHeight = this.texture.height - this.isoWorld.tileSize.height;

            let h = this.wallHeight + (this.isoWorld.halfTileSize.height);
            this.anchor.set(0.5, h / this.texture.height);
        }

        isoToScreen () {
            let posX = (this.isoPosition.x - this.isoPosition.y) * this.isoWorld.halfTileSize.width;
            let posY = (this.isoPosition.x + this.isoPosition.y) * this.isoWorld.halfTileSize.height;

            return new Phaser.Point(posX, posY);
        }

        screenToIso (x, y) {
            let halfWidth = this.width / 2,
                halfHeight = this.height / 2;

            let isoX = (x / halfWidth + y / halfHeight) / 2;
            let isoY = (y / halfHeight -(x / halfWidth)) / 2;

            return new Phaser.Point(isoX, isoY);
        }

        private setIsoBounds () {
            this.isoBounds = {};
            let halfWidth = this.width / 2,
                tileFaceHeight = this.width / 4;

            this.isoBounds.face = [
                new Phaser.Point(0, tileFaceHeight - this.wallHeight), // bottom
                new Phaser.Point(-halfWidth, -this.wallHeight),
                new Phaser.Point(0, -tileFaceHeight - this.wallHeight),
                new Phaser.Point(halfWidth, -this.wallHeight)
            ];

            if (this.wallHeight > 0) {
                this.isoBounds.rightWall = [
                    new Phaser.Point(0, tileFaceHeight),
                    new Phaser.Point(halfWidth, 0),
                    new Phaser.Point(halfWidth, -this.wallHeight)
                ];

                this.isoBounds.leftWall = [
                    new Phaser.Point(0, tileFaceHeight),
                    new Phaser.Point(-halfWidth, 0),
                    new Phaser.Point(-halfWidth, -this.wallHeight)
                ];
            }
        }

        getOutline () {
            if (!this.isoBounds) {
                this.setIsoBounds();
            }

            let points = this.isoBounds.face.map(function (p) {
                p.x -= this.game.camera.x;
                p.y -= this.game.camera.y;
                return p;
            }, this);

            let graphics = new Phaser.Graphics(this.game, this.x, this.y);

            graphics.clear();
            graphics.lineStyle(2, 0xffffff);

            graphics.moveTo(points[0].x, points[0].y);
            graphics.lineTo(points[1].x, points[1].y);
            graphics.lineTo(points[2].x, points[2].y);
            graphics.lineTo(points[3].x, points[3].y);
            graphics.lineTo(points[0].x, points[0].y);

            if (this.isoBounds.rightWall) {
                let pointsWall = this.isoBounds.rightWall.map(function (p) {
                    p.x -= this.game.camera.x;
                    p.y -= this.game.camera.y;
                    return p;
                }, this);

                graphics.lineTo(pointsWall[0].x, pointsWall[0].y);
                graphics.lineTo(pointsWall[1].x, pointsWall[1].y);
                graphics.lineTo(pointsWall[2].x, pointsWall[2].y);

                graphics.moveTo(points[0].x, points[0].y);
            }

            if (this.isoBounds.leftWall) {
                let pointsWall = this.isoBounds.leftWall.map(function (p) {
                    p.x -= this.game.camera.x;
                    p.y -= this.game.camera.y;
                    return p;
                }, this);

                graphics.lineTo(pointsWall[0].x, pointsWall[0].y);
                graphics.lineTo(pointsWall[1].x, pointsWall[1].y);
                graphics.lineTo(pointsWall[2].x, pointsWall[2].y);

                graphics.moveTo(points[0].x, points[0].y);
            }

            return graphics;
        }
    }
}
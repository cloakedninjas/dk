module DK {
    export class IsoTile extends Phaser.Sprite {

        tileWidth: number;
        tileHeight: number;
        isoPosition: Phaser.Point;
        isoBounds: any;

        /**
         * The height of the wall, 0 if a floor tile
         */
        wallHeight: number;

        constructor(game, x, y, key, frame) {
            super(game, x, y, key, frame);

            // TODO: move out
            this.tileWidth = 128;
            this.tileHeight = 64;

            this.isoPosition = new Phaser.Point(x, y);
            this.position = this.isoToScreen();

            // set anchor point based on texture
            this.wallHeight = this.texture.height - this.tileHeight;

            var h = this.wallHeight + (this.tileHeight / 2);
            this.anchor.set(0.5, h / this.texture.height);
        }

        isoToScreen () {
            var posX = (this.x - this.y) * this.tileWidth / 2;
            var posY = (this.x + this.y) * this.tileHeight / 2;

            return new Phaser.Point(posX, posY);
        }

        screenToIso (x, y) {
            var halfWidth = this.width / 2,
                halfHeight = this.height / 2;

            var isoX = (x / halfWidth + y / halfHeight) / 2;
            var isoY = (y / halfHeight -(x / halfWidth)) / 2;

            return new Phaser.Point(isoX, isoY);
        }

        private setIsoBounds () {
            this.isoBounds = {};
            var halfWidth = this.width / 2,
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

            console.log(this.isoBounds, tileFaceHeight);
        }

        getOutline () {
            if (!this.isoBounds) {
                this.setIsoBounds();
            }

            var points = this.isoBounds.face.map(function (p) {
                p.x -= this.game.camera.x;
                p.y -= this.game.camera.y;
                return p;
            }, this);

            var graphics = new Phaser.Graphics(this.game, this.x, this.y);

            graphics.clear();
            graphics.lineStyle(2, 0xffffff);

            graphics.moveTo(points[0].x, points[0].y);
            graphics.lineTo(points[1].x, points[1].y);
            graphics.lineTo(points[2].x, points[2].y);
            graphics.lineTo(points[3].x, points[3].y);
            graphics.lineTo(points[0].x, points[0].y);

            if (this.isoBounds.rightWall) {
                var pointsWall = this.isoBounds.rightWall.map(function (p) {
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
                var pointsWall = this.isoBounds.leftWall.map(function (p) {
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
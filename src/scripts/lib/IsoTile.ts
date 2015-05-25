///<reference path="../../reference.d.ts"/>

module DK {
    export class IsoTile extends Phaser.Sprite {

        tileWidth: number;
        tileHeight: number;
        isoPosition: Phaser.Point;
        isoBounds: [Phaser.Point];

        constructor(game, x, y, key, frame) {
            super(game, x, y, key, frame);

            // TODO: move out
            this.tileWidth = 128;
            this.tileHeight = 64;

            this.isoPosition = new Phaser.Point(x, y);
            this.position = this.isoToScreen();

            // set anchor point based on texture
            var h = (this.texture.height - this.tileHeight) + (this.tileHeight / 2);
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
            this.isoBounds = [
                new Phaser.Plugin.Isometric.Point3(this.x, this.y, this.z),
                new Phaser.Plugin.Isometric.Point3(this.x, this.y, this.z + this.height),
                new Phaser.Plugin.Isometric.Point3(this.x, this.y + this.widthY, this.z),
                new Phaser.Plugin.Isometric.Point3(this.x, this.y + this.widthY, this.z + this.height),
                new Phaser.Plugin.Isometric.Point3(this.x + this.widthX, this.y, this.z),
                new Phaser.Plugin.Isometric.Point3(this.x + this.widthX, this.y, this.z + this.height),
                new Phaser.Plugin.Isometric.Point3(this.x + this.widthX, this.y + this.widthY, this.z),
                new Phaser.Plugin.Isometric.Point3(this.x + this.widthX, this.y + this.widthY, this.z + this.height)
            ];
        }

        getOutline () {
            if (!this.isoBounds) {
                var halfWidth = this.width / 2,
                    halfHeight = this.height / 2;

                console.log(this.x, this.y);

                this.isoBounds = [
                    new Phaser.Point(this.x, this.y - halfHeight),
                    new Phaser.Point(this.x + halfWidth, this.y),
                    new Phaser.Point(this.x, this.y + halfHeight),
                    new Phaser.Point(this.x - halfWidth, this.y)
                ];

                console.log(this.isoBounds);
            }

            var camX = -this.game.camera.x;
            var camY = -this.game.camera.y;

            var points = this.isoBounds.map(function (p) {
                p.x += camX;
                p.y += camY;
                return p;
            }, this);

            //console.log(points);

            var graphics = new Phaser.Graphics(this.game, points[0].x, points[0].y);

            graphics.clear();
            graphics.lineStyle(2, 0xffffff);

            graphics.moveTo(points[0].x, points[0].y);
            graphics.lineTo(points[1].x, points[1].y);
            graphics.lineTo(points[2].x, points[2].y);
            graphics.lineTo(points[3].x, points[3].y);
            graphics.lineTo(points[0].x, points[0].y);

            return graphics;
        }
    }
}
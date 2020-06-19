class Camera {
    constructor(map = null, width = 0, height = 0, tileSize = 60) {
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.tileSize = tileSize;
        this.lastChange = 0;

        var _ESPACAMENTO = 300;
        this._X2_THRESHOLD = window.innerWidth - _ESPACAMENTO;
        this._X1_THRESHOLD = _ESPACAMENTO;
    }

    mover(player, x = 0, y = 0) {

        this.lastChange -= player.vx;
        // if (this.x < 0) {
        //     this.lastChange += player.vx;
        //     this.x = 0;
        // }

        if (this.lastChange > this.tileSize) {
            this.x += this.tileSize;
            this.lastChange = 0;
        }
        else if (this.lastChange < 0) {
            this.x -= this.tileSize;
            this.lastChange = this.tileSize;
        }
    }

}


export default Camera;
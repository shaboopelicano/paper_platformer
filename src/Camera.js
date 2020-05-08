class Camera {
    constructor(map = null, width = 0, height = 0, tileSize = 150) {
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.tileSize = tileSize;

        var _ESPACAMENTO = 300;
        this._X2_THRESHOLD = window.innerWidth - _ESPACAMENTO;
        this._X1_THRESHOLD = _ESPACAMENTO;
    }

    mover(player, x = 0, y = 0) {

        if (player.x >= this._X2_THRESHOLD || player.x < this._X1_THRESHOLD)
            this.x = this.x - player.vx;
    }

}


export default Camera;
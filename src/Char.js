import Assets from './Assets';

var Char = {
    _VELOCIDADE_X: 5,
    _VELOCIDADE_Y: 5,
    _VELOCIDADE_PULO: -15,
    image: Assets.imgs['Player'],
    facingLeft: false,
    x: 400,
    y: 0,
    vx: 0,
    vy: 5,
    sx: 1,
    sy: 9,
    sw: 7,
    sh: 7,
    update: function (input) {
        if (input.estado.andandoDireita) {
            this.vx = +this._VELOCIDADE_X;
            this.facingLeft = false;
        }
        else if (input.estado.andandoEsquerda) {
            this.vx = -this._VELOCIDADE_X;
            this.facingLeft = true;
        }
        else
            this.vx = 0;

        if (input.estado.pulando) {
            this.vy = this._VELOCIDADE_PULO;
            input.estado.pulando = false;
        }
    },
    move: function (input) {
        this.x += this.vx;
    },
    cair: function () {
        if (this.vy < this._VELOCIDADE_Y)
            this.vy += .8;
        this.y += this.vy;
    },
    checkCollisionX: function (mapa, larguraTileAtual, alturaTileAtual) {
        var xAtual = Math.floor(parseInt(this.x / larguraTileAtual));
        var yAtual = Math.floor(parseInt(this.y / alturaTileAtual));
        var map = mapa.map;

        var xDirecao;
        if (this.vx > 0)
            xDirecao = Math.floor(parseInt((this.x + (larguraTileAtual / 2)) / larguraTileAtual));
        else if (this.vx < 0) {
            xDirecao = Math.floor(parseInt((this.x - (larguraTileAtual / 2)) / larguraTileAtual));
        }

        try {
            if (map[yAtual][xDirecao] == 1 || map[yAtual][xDirecao] === undefined) {
                return true;
            }
            else
                return false;
        }
        catch (e) {

        }
    },
    checkCollisionY: function (mapa, larguraTileAtual, alturaTileAtual) {
        var xAtual = Math.floor(parseInt(this.x / larguraTileAtual));
        var yAtual = Math.floor(parseInt(this.y / alturaTileAtual));

        var map = mapa.map;

        var yDirecao;
        if (this.vy > 0)
            yDirecao = Math.floor(parseInt((this.y + alturaTileAtual) / alturaTileAtual));
        else if (this.vy < 0)
            yDirecao = Math.floor(parseInt(this.y / alturaTileAtual));

        try {
            if (map[yDirecao][xAtual] == 1 || map[yDirecao][xAtual] === undefined) {
                if(this.vy < 0){
                    this.vy = 0;
                    // this.y += 1;
                }else{
                    return true;
                }
            }

            return false;
        }
        catch (e) {

        }
    }
}

export default Char;
import Assets from './Assets';

var Char = {
    _VELOCIDADE_X: 5,
    _VELOCIDADE_ADICIONAL_X: 3,
    _VELOCIDADE_Y: 5,
    _VELOCIDADE_PULO: -15,
    _MAX_BULLETS: 3,
    _BULLET_SPEED: 10,
    image: Assets.imgs['Player'],
    facingLeft: false,
    currentAnimationCicle: 'IDLE',
    currentAnimationFrame: 0,
    lastAnimationUpdate: 0,
    maxFrameTime: 100,
    bullets: [],
    animationFrames: {
        IDLE: [
            { x: 1, y: 57 },
            { x: 9, y: 57 },
            { x: 17, y: 57 },
            { x: 25, y: 57 },
        ],
        WALKING: [
            { x: 1, y: 32 },
            { x: 9, y: 32 },
            { x: 17, y: 32 },
            { x: 25, y: 32 },
            { x: 32, y: 32 },
            { x: 40, y: 32 },
        ],
        RUNNING: [
            { x: 0, y: 151 }
        ],
        JUMP: [
            { x: 0, y: 151 }
        ],
        HIT: [
            { x: 0, y: 151 }
        ],
    },
    x: 400,
    y: 0,
    xTela: 400,
    yTela: 0,
    vx: 0,
    vy: 5,
    sx: 1,
    sy: 9,
    sw: 7,
    sh: 7,
    update: function (input) {
        if (input.estado.andandoDireita) {
            this.vx = +this._VELOCIDADE_X + (input.estado.correndo ? this._VELOCIDADE_ADICIONAL_X : 0);
            this.facingLeft = false;
            this.currentAnimationCicle = 'WALKING';
        }
        else if (input.estado.andandoEsquerda) {
            this.vx = -(this._VELOCIDADE_X + (input.estado.correndo ? this._VELOCIDADE_ADICIONAL_X : 0));
            this.facingLeft = true;
            this.currentAnimationCicle = 'WALKING';
        }
        else {
            this.vx = 0;
            this.currentAnimationCicle = 'IDLE';
        }

        if (input.estado.pulando) {
            this.vy = this._VELOCIDADE_PULO;
            input.estado.pulando = false;
        }

        if (input.estado.atirando) {
            input.estado.atirando = false;
            this.atirar();
        }

        this.animate(input);
        this.updateBullets();
    },
    animate: function (input) {
        var now = Date.now();
        if (now - this.lastAnimationUpdate > this.maxFrameTime) {
            this.lastAnimationUpdate = now;
            var maxFrames = this.animationFrames[this.currentAnimationCicle].length - 1;
            if (this.currentAnimationFrame < maxFrames) {
                this.currentAnimationFrame++;
                this.sx = this.animationFrames[this.currentAnimationCicle][this.currentAnimationFrame].x;
                this.sy = this.animationFrames[this.currentAnimationCicle][this.currentAnimationFrame].y;
            }
            else
                this.currentAnimationFrame = 0;
        }
    },
    move: function (input) {

        this.x += this.vx;
        this.xTela += this.vx;

        if (this.xTela >= window.innerWidth) {
            this.xTela = window.innerWidth;
            this.x = window.innerWidth;
        }
        else if (this.xTela <= 0) {
            this.xTela = 0;
            this.x = 0;
        }

    },
    cair: function () {
        if (this.vy < this._VELOCIDADE_Y)
            this.vy += .8;
        this.y += this.vy;
        this.yTela += this.vy;
    },
    atirar: function () {
        if (this.bullets.length < this._MAX_BULLETS) {
            this.bullets.push({ x: this.x, y: this.y + 30, vx: this.facingLeft ? -this._BULLET_SPEED : this._BULLET_SPEED  });
        }
    },
    updateBullets: function () {
        this.bullets.forEach(b=>{
            b.x += b.vx;
            if(b.x < 0 || b.x > window.innerWidth){
                this.bullets.shift();
            }
        });
    },
    checkCollisionX: function (camera, mapa, larguraTileAtual, alturaTileAtual) {

        var centroTile = {
            x: parseInt((this.x + larguraTileAtual / 2) - camera.x),
            y: parseInt(this.y + alturaTileAtual / 2),
        }

        // Coordenadas atuais no mapa
        var xAtual = Math.floor(centroTile.x / larguraTileAtual);
        var yAtual = Math.floor(centroTile.y / alturaTileAtual);
        var map = mapa.map;

        var xDirecao = xAtual;
        if (this.vx > 0)
            xDirecao = Math.floor(parseInt((centroTile.x + (larguraTileAtual / 2)) / larguraTileAtual));
        else if (this.vx < 0) {
            xDirecao = Math.floor(parseInt((centroTile.x - (larguraTileAtual / 2)) / larguraTileAtual));
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
    checkCollisionY: function (camera, mapa, larguraTileAtual, alturaTileAtual) {

        var centroTile = {
            x: parseInt((this.x + larguraTileAtual / 2) - camera.x),
            y: parseInt(this.y + alturaTileAtual / 2),
        }

        // Coordenadas atuais no mapa
        var xAtual = Math.floor(centroTile.x / larguraTileAtual);
        var yAtual = Math.floor(centroTile.y / alturaTileAtual);

        var map = mapa.map;

        var yDirecao = yAtual;
        if (this.vy > 0)
            yDirecao = Math.floor(parseInt((this.y + alturaTileAtual) / alturaTileAtual));
        else if (this.vy < 0)
            yDirecao = Math.floor(parseInt(this.y / alturaTileAtual));

        try {
            if (map[yDirecao][xAtual] == 1 || map[yDirecao][xAtual] === undefined) {
                if (this.vy < 0) {
                    this.vy = 0;
                    // this.y += 1;
                } else {
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
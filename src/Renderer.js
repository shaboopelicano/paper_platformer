import Assets from './Assets';
import Tile from './Tile';

class Renderer {
    constructor(ctx, Game = null) {
        this.ctx = ctx;
        this.Game = Game;
        this.larguraTileAtual;
        this.alturaTileAtual;
        this.tileGrama = new Tile();
        this.currentLevel = Game.levels[Game.currentLevelIndex];

        const auxCanvas = document.createElement('canvas');
        auxCanvas.width = window.innerWidth;
        auxCanvas.height = window.innerHeight;
        auxCanvas.style.zIndex = -1;
        auxCanvas.style.position = 'absolute';
        this.auxCtx = auxCanvas.getContext('2d');
        this.auxCtx.imageSmoothingEnabled = false;
        document.body.appendChild(auxCanvas);

        this.auxCanvas = auxCanvas;
        this.x = 0;

    }

    draw(level) {
        this.ctx.globalAlpha = 1;
        this.drawBG(level);
        this.drawObjects(level);
        this.drawPlayer(level);
    }

    drawObjects(level = null) {

        var mapa = level.mapa;
        var camera = level.camera;

        var larguraTile = camera.tileSize;
        var alturaTile = camera.tileSize;

        // var larguraTile = parseInt(Math.ceil(window.innerWidth / mapa.larguraMapa));
        // var alturaTile = parseInt(Math.ceil(window.innerHeight / mapa.alturaMapa));

        this.larguraTileAtual = larguraTile;
        this.alturaTileAtual = alturaTile;

        for (var i = 0; i < mapa.alturaMapa; i++) {
            for (var j = 0; j < mapa.larguraMapa; j++) {
                try {
                    if (mapa.map[i][j] != 0) {

                        this.auxCtx.drawImage(
                            Assets.imgs['Tiles'],
                            0, 152,
                            8, 8,
                            larguraTile * j + camera.x, alturaTile * i + camera.y,
                            larguraTile, alturaTile
                        );
                    }
                }
                catch (e) {
                    console.error(e);
                    console.log(i, j);
                    console.log(mapa.map[i][j]);
                    console.log(mapa);
                }
            }
        }

        this.ctx.drawImage(this.auxCanvas, this.x, 0);

    }

    drawBG(level) {

        var mapa = level.mapa;

        var larguraTile = parseInt(Math.ceil(window.innerWidth / mapa.larguraMapa));
        var alturaTile = parseInt(Math.ceil(window.innerHeight / mapa.alturaMapa));

        this.larguraTileAtual = larguraTile;
        this.alturaTileAtual = alturaTile;

        for (var i = 0; i < mapa.alturaMapa; i++) {
            for (var j = 0; j < mapa.larguraMapa; j++) {
                this.auxCtx.drawImage(
                    Assets.imgs['bg'],
                    larguraTile * j, alturaTile * i,
                    larguraTile, alturaTile
                );
            }
        }

        this.ctx.drawImage(this.auxCanvas, this.x, 0);

    }

    drawPlayer(level = null) {

        var player = level.player;
        var camera = level.camera;

        if (player.facingLeft) {
            this.ctx.save();
            this.ctx.translate(player.xTela, player.yTela);
            this.ctx.scale(-1, 1);

            this.ctx.drawImage(
                Assets.imgs['Player'],
                player.sx,
                player.sy,
                player.sw,
                player.sh,
                0 - camera.tileSize,
                0,
                this.larguraTileAtual,
                this.alturaTileAtual,
            );

            this.ctx.restore();
        }
        else {
            this.ctx.drawImage(
                Assets.imgs['Player'],
                player.sx,
                player.sy,
                player.sw,
                player.sh,
                player.xTela,
                player.yTela,
                this.larguraTileAtual,
                this.alturaTileAtual,
            );
        }

        this.drawBullets(player.bullets);
    }

    drawBullets(bullets) {
        this.ctx.fillStyle = 0xFF0000;
        if (bullets.length > 0)
            bullets.forEach(b => {
                this.ctx.fillRect(
                    b.x,
                    b.y,
                    10,
                    10,
                );
            });
    }

    clear() {
        this.ctx.fillStyle = this.Game.CONSTANTES.CLEAR_COLOR;
        this.ctx.fillRect(0, 0, this.Game.CONSTANTES.LARGURA, this.Game.CONSTANTES.ALTURA);
    }
}

function getImage(numero) {
    switch (parseInt(numero)) {
        case 0: return Assets.imgs['bg'];
        case 1: return Assets.imgs['Tiles'];
    }
}

export default Renderer;
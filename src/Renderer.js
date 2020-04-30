import Assets from './Assets';
import Tile from './Tile';

class Renderer {
    constructor(ctx, Game = null) {
        this.ctx = ctx;
        this.Game = Game;
        this.larguraTileAtual;
        this.alturaTileAtual;
        this.tileGrama = new Tile();

    }
    draw(objetos) {
        this.drawBG(objetos.mapaAtual);
        this.drawObjects(objetos.mapaAtual);
        this.drawPlayer(objetos.player);
    }

    drawObjects(mapa = null) {

        var larguraTile = parseInt(Math.ceil(window.innerWidth / mapa.larguraMapa));
        var alturaTile = parseInt(Math.ceil(window.innerHeight / mapa.alturaMapa));

        this.larguraTileAtual = larguraTile;
        this.alturaTileAtual = alturaTile;

        for (var i = 0; i < mapa.alturaMapa; i++) {
            for (var j = 0; j < mapa.larguraMapa; j++) {
                try {
                    if (mapa.map[i][j] != 0) {
                        this.ctx.drawImage(
                            Assets.imgs['Tiles'],
                            0, 152,
                            8, 8,
                            larguraTile * j, alturaTile * i,
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
    }

    drawBG(mapa = null) {

        var larguraTile = parseInt(Math.ceil(window.innerWidth / mapa.larguraMapa));
        var alturaTile = parseInt(Math.ceil(window.innerHeight / mapa.alturaMapa));

        this.larguraTileAtual = larguraTile;
        this.alturaTileAtual = alturaTile;

        for (var i = 0; i < mapa.alturaMapa; i++) {
            for (var j = 0; j < mapa.larguraMapa; j++) {
                this.ctx.drawImage(
                    Assets.imgs['bg'],
                    larguraTile * j, alturaTile * i,
                    larguraTile, alturaTile
                );
            }
        }
    }

    drawPlayer(player = null) {

        if (player.facingLeft) {
            this.ctx.save();
            this.ctx.translate(player.x,player.y);
            this.ctx.scale(-1,1);

            this.ctx.drawImage(
                Assets.imgs['Player'],
                player.sx,
                player.sy,
                player.sw,
                player.sh,
                0,
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
                player.x,
                player.y,
                this.larguraTileAtual,
                this.alturaTileAtual,
            );
        }
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
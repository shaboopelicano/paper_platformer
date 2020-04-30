import Renderer from './Renderer';
import Input from './Input';
import Char from './Char';
import Map from './Map';
import map1 from './maps/map1.js';

var Game = {
    CONSTANTES: {
        LARGURA: window.innerWidth,
        ALTURA: window.innerHeight,
        CLEAR_COLOR: 0x000000,
        TILE_SIZE: 40,
    },
    objetos: [],
    iniciarTudo: function () {
        this.iniciarCanvas();
        this.iniciarObjetos();
        this.renderer = new Renderer(this.ctx, this);
        this.input = Input;
        this.input.iniciarInput();
    },
    iniciarCanvas: function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.CONSTANTES.LARGURA;
        canvas.height = this.CONSTANTES.ALTURA;
        document.body.appendChild(canvas);
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
    },
    iniciarObjetos: function () {
        this.objetos.mapaAtual = new Map(map1);
        this.objetos.player = Char
    },
    update: function () {
        this.objetos.player.update(this.input);
        if (!this.objetos.player.checkCollisionX(this.objetos.mapaAtual, this.renderer.larguraTileAtual, this.renderer.alturaTileAtual)){
            this.objetos.player.move(this.input);
        }
        if (!this.objetos.player.checkCollisionY(this.objetos.mapaAtual, this.renderer.larguraTileAtual, this.renderer.alturaTileAtual)){
            this.objetos.player.cair();
        }
        
    },
    loop: function () {
        this.update();
        this.renderer.clear();
        this.renderer.draw(this.objetos);
        requestAnimationFrame(function () { this.loop() }.bind(this));
    }

}


export default Game;
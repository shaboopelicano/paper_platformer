import Renderer from './Renderer';
import Input from './Input';
import Level from './Level';
import Debugger from './Debugger';
import Animation from './Animation';

var Game = {
    CONSTANTES: {
        LARGURA: window.innerWidth,
        ALTURA: window.innerHeight,
        CLEAR_COLOR: 0x000000,
        TILE_SIZE: 40,
    },
    Estados: {
        INTRO: 0,
        MENU: 1,
        ANIMACAO: 2,
        PAUSADO: 3,
        RUNNING: 4
    },
    currentAlpha: 1.0,
    estadoGameAtual: 2,
    levels: [],
    currentLevelIndex: 0,
    currentAnimation: null,
    debug: true,
    iniciarTudo: function () {
        this.iniciarLevels();
        this.iniciarCanvas();
        this.renderer = new Renderer(this.ctx, this);
        this.input = Input;
        this.input.iniciarInput();
        this.currentAnimation = new Animation(this.ctx, 'introAnimation');
    },
    iniciarLevels() {
        this.levels.push(new Level(1));
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
    update: function () {
        var levelAtual = this.levels[this.currentLevelIndex];

        levelAtual.player.update(this.input);
        if (!levelAtual.player.checkCollisionX(levelAtual.camera, levelAtual.mapa, this.renderer.larguraTileAtual, this.renderer.alturaTileAtual)) {
            levelAtual.player.move(this.input);
            levelAtual.camera.mover(levelAtual.player);
        }
        if (!levelAtual.player.checkCollisionY(levelAtual.camera, levelAtual.mapa, this.renderer.larguraTileAtual, this.renderer.alturaTileAtual)) {
            levelAtual.player.cair();
        }

    },
    loop: function () {
        switch (this.estadoGameAtual) {
            case Game.Estados.ANIMACAO: this.animationLoop(); break;
            case Game.Estados.PAUSADO: this.pausedLoop(); break;
            case Game.Estados.RUNNING: this.mainLoop(); break;
        }
        requestAnimationFrame(function () { this.loop() }.bind(this));
    },
    animationLoop: function () {
        if (!this.currentAnimation) {
            this.estadoGameAtual = this.Estados.RUNNING;
        }
        else {
            if (!this.currentAnimation.hasStarted) {
                this.currentAnimation.startAnimation();
            }
            else {
                if (this.currentAnimation.isRunning)
                    this.currentAnimation.resumeAnimation();
            }
        }
    },
    pausedLoop: function () {
        if (this.currentAlpha > .5) {
            this.currentAlpha -= .01;
            this.ctx.globalAlpha = this.currentAlpha;
        }
        this.ctx.fillStyle = "#6F8B6E";
        this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    },
    mainLoop: function () {
        this.update();
        this.renderer.clear();
        this.renderer.draw(this.levels[this.currentLevelIndex]);

        /* Rodar debug visual */
        if (this.debug) Debugger.debugAll(this);
    }


}


export default Game;
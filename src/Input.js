import Game from './Game';

var Input = {
    iniciarInput: function () {
        window.onkeydown = function (e) {
            this.tratarInput(e);
        }.bind(this);
        window.onkeyup = function (e) {
            this.tratarInput(e);
        }.bind(this);
    },
    tratarInput: function (e) {
        switch (Game.estadoGameAtual) {
            case Game.Estados.PAUSADO:
                switch (e.type) {
                    case 'keydown': this.keyDownPausado(e.key); break;
                    case 'keyup': this.keyUpPausado(e.key); break;
                }
                break;
            case Game.Estados.RUNNING:
                switch (e.type) {
                    case 'keydown': this.keyDownRunning(e.key); break;
                    case 'keyup': this.keyUpRunning(e.key); break;
                }
                break;
        }
    },
    keyUpPausado: function (key) {
        
    },
    keyDownPausado: function (key) {
        switch (key) {
            case 'Escape':
                Game.estadoGameAtual = Game.Estados.RUNNING;
                break;
        }
    },
    keyUpRunning: function (key) {
        switch (key) {
            case 'a':
                this.estado.andandoEsquerda = false;
                this.estado.parado = true;
                break;
            case 'd':
                this.estado.andandoDireita = false;
                this.estado.parado = true;
                break;
            case 'Control':
                this.estado.atirando = false;
                break;
            case 'Shift':
                this.estado.correndo = false;
                break;
        }
    },
    keyDownRunning: function (key) {
        switch (key) {
            case 'a':
                this.estado.andandoEsquerda = true;
                this.estado.andandoDireita = false;
                this.estado.parado = false;
                break;
            case 'd':
                this.estado.andandoEsquerda = false;
                this.estado.andandoDireita = true;
                this.estado.parado = false;
                break;
            case 'w':
                if (!this.estado.pulando)
                    this.estado.pulando = true;
                break;
            case 'Control':
                this.estado.atirando = true;
                break;
            case 'Shift':
                this.estado.correndo = true;
                break;
            case 'Escape':
                Game.estadoGameAtual = Game.Estados.PAUSADO;
                break;
        }
    },
    estado: {
        andandoDireita: false,
        andandoEsquerda: false,
        parado: true,
        pulando: false,
        correndo: false,
    }
}

export default Input;
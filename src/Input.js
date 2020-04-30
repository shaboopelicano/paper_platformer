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
        switch (e.type) {
            case 'keyup': this.keyUp(e.key); break;
            case 'keydown': this.keyDown(e.key); break;
        }
    },
    keyUp: function (key) {
        switch (key) {
            case 'a':
                this.estado.andandoEsquerda = false;
                this.estado.parado = true;
                break;
            case 'd':
                this.estado.andandoDireita = false;
                this.estado.parado = true;
                break;
        }
    },
    keyDown: function (key) {
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

        }
    },
    estado: {
        andandoDireita: false,
        andandoEsquerda: false,
        parado: true,
        pulando: false,
    }
}

export default Input;

export default class Map {
    constructor(mapSource) {
        this.mapSource = mapSource;
        this.map = [];
        this.larguraMapa = 0;
        this.alturaMapa = 0;
        this.montarMapa();
    }

    montarMapa() {
        var _INICIO = "#INICIO#\n";
        var _FIM = "#FIM#";
        var inicio = this.mapSource.indexOf(_INICIO) + _INICIO.length - 1;
        var fim = this.mapSource.indexOf(_FIM);
        
        this.larguraMapa = this.mapSource.indexOf('x',inicio) - inicio - 1;
        this.alturaMapa = this.mapSource.substring(inicio,fim - 1).match(/x/g,'').length;
        console.log(this.larguraMapa);
        

        var linha = [];
        for (var i = inicio + 1 ; i < fim; i++) {
            if (isNumber(this.mapSource[i])) {
                linha.push(this.mapSource[i]);
            }
            else if(this.mapSource[i] === 'x'){
                this.map.push(linha);
                linha = [];
            }
        }
    }

    
}

function isNumber(char) {
    if (char === '0') return true;
    else if (char === '1') return true;
    else if (char === '2') return true;
    else if (char === '3') return true;
    else if (char === '4') return true;
    else if (char === '5') return true;
    else if (char === '6') return true;
    else if (char === '7') return true;
    else if (char === '8') return true;
    else if (char === '9') return true;
}


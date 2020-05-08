import Map from './map';
import Camera from './Camera';
import maps from './maps';
import Char from './Char';

class Level{
    constructor(index=0){
        this.player = Char;
        this.objetos = [];
        this.camera = new Camera(maps[index]);
        this.mapa = new Map(maps[index]);
    }
}


export default Level;
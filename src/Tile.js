import Assets from './Assets';

class Tile{
    constructor(){
        this.image = Assets.imgs['Tiles'];
        this.x = 0;
        this.y = 0;
        this.sx = 0;
        this.sy = 152;
        this.sw = 8;
        this.sh = 8;
    }
}

export default Tile;
import enemiesBg from './assets/Enemies-bg.png';
import enemies from './assets/Enemies.png';
import playerBg from './assets/Player-bg.png';
import player from './assets/Player.png';
import tilesBg from './assets/Tiles-bg.png';
import tiles from './assets/Tiles.png';
import bg from './assets/bg.png';

var Assets = {
    imgsSrcs: [enemiesBg, enemies, playerBg, player, tilesBg, tiles,bg],
    imgs: {},
    carregarAssets: function (callback) {
        var numeroImagens = this.imgsSrcs.length;
        var imagensCarregadas = 0;

        var onload = function (e) {
            imagensCarregadas++;
            if (imagensCarregadas === numeroImagens - 1)
                callback();
        }

        for (var i = numeroImagens - 1, j = 0; i >= 0; i--, j++) {
            var nomeImagem = this.imgsSrcs[j].replace(/\.(.*)/,'').replace('/','');
            this.imgs[nomeImagem] = new Image();
            this.imgs[nomeImagem].src = this.imgsSrcs[j];
            this.imgs[nomeImagem].onload = onload;
        }
    }

}



export default Assets;
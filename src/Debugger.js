export default {
    debugLineColor: '#FF000055',
    tiles: false,
    position: false,
    map:false,
    debugAll: function (game) {
        var currentLevel = game.levels[game.currentLevelIndex];
        if (this.tiles) this.debugTiles(game.renderer, currentLevel.camera, game.CONSTANTES.LARGURA, game.CONSTANTES.ALTURA);
        if (this.position) this.debugPosition(currentLevel);
        if(this.map) this.debugMap(currentLevel);
    },
    debugTiles: function (renderer, camera, w, h) {
        var tileSize = camera.tileSize;
        var ctx = renderer.ctx;
        for (var i = 0; i < w; i += tileSize) {
            ctx.strokeStyle = this.debugLineColor;
            ctx.beginPath()
            ctx.moveTo(i, 0);
            ctx.lineTo(i, h);
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(w, i);
            ctx.stroke();
            ctx.closePath();
        }
    },
    debugPosition: function (level) {
        var p = level.player;
        var larguraTileAtual,alturaTileAtual;
        larguraTileAtual = alturaTileAtual = level.camera.tileSize;
        var xAtual = Math.floor(parseInt((p.x +larguraTileAtual / 2) / larguraTileAtual));
        var yAtual = Math.floor(parseInt((p.y + alturaTileAtual / 2) / alturaTileAtual));
        console.log(`### DEBUG POSITION - tela(${p.x},${p.y}) mapa(${xAtual},${yAtual})`);
    },
    debugMap(level){
        console.log(level.mapa);
    }

}
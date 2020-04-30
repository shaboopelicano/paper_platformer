import "./styles.css";
import Assets from './Assets';
import Game from './Game';


Assets.carregarAssets(function () {
  Game.iniciarTudo();
  Game.loop();
});


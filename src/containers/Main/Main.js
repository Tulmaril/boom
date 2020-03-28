import React, { Component } from 'react';

import classes from './Main.css';

import Menu from '../../components/Menu/Menu';
import Gamescreen from '../Gamescreen/Gamescreen';
import Looser from '../../components/Looser/Looser';
import Rules from '../../components/Rules/Rules';
import Registration from '../../components/Registration/Registration';
import Overlay from '../../components/Overlay/Overlay';

import explosion from '../../sounds/explosion.mp3';
import tik from '../../sounds/tik.mp3';

class Main extends Component {
  state = {
    menuItems: [
      { text: 'Новая игра', id: 'to-game' },
      { text: 'Правила', id: 'rules' }
    ],
    displayMenu: true,
    players: [{ name: '' }],
    cards: [
      'ле',
      'там',
      'мас',
      'лов',
      'пит',
      'ран',
      'ак',
      'от',
      'лом',
      'тор',
      'ра',
      'ин',
      'ход',
      'тел',
      'ск',
      'ва',
      'изм',
      'аз',
      'рез',
      'хо',
      'мет',
      'ник',
      'на',
      'но',
      'со',
      'ти',
      'кол',
      'фон',
      'ру',
      'те',
      'ант',
      'не',
      'век',
      'за',
      'ка',
      'он',
      'бол',
      'га',
      'ист',
      'ик',
      'вар',
      'вик',
      'рог',
      'уб',
      'да',
      'лов',
      'то',
      'ан',
      'лог',
      'вох',
      'ро',
      'ад',
      'уз',
      'во',
      'ар',
      'лю',
      'акт',
      'ал',
      'дел',
      'док',
      'мас',
      'вод',
      'ус',
      'коп',
      'дик',
      'са',
      'ласт',
      'ки',
      'инт',
      'од',
      'суда',
      'ин',
      'ди',
      'ла',
      'ам',
      'ба',
      'аст',
      'ас',
      'ит',
      'ко',
      'тик',
      'ли',
      'ил',
      'ке',
      'мо',
      'ат',
      'ом',
      'ром',
      'та',
      'вед',
      'ов',
      'па',
      'сон',
      'род',
      'ок',
      'ор',
      'жу',
      'ло',
      'пан',
      'ун',
      'хоз',
      'кин',
      'метр',
      'ук',
      'по',
      'ев',
      'ма',
      'лос',
      'ост',
      'му',
      'ча',
      'мат',
      'мер'
    ],
    timer: null,
    timerMin: 5,
    timerMax: 20,
    stage: '',
    position: '',
    positionSelected: false,
    overlay: false,
    gameLength: ''
  };

  shuffle = a => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  addName = (name, i) => {
    const players = [...this.state.players];

    if (i !== this.state.players.length - 1) {
      if (name === '') {
        players.splice(i, 1);
      } else {
        players[i].name = name;
      }
    } else {
      if (name !== '') {
        players.push({ name: '' });
      }
    }

    this.setState({ players: players });
  };

  writeName = (letter, i) => {
    const players = [...this.state.players];
    players[i].name = letter;

    this.setState({ players: players });
  };

  writeLength = (letter, i) => {
    if (parseInt(letter) > 0) {
      this.setState({ gameLength: letter });
    }
  };

  menuClick = id => {
    this.setState({ stage: id });
    this.setState({ displayMenu: false });
    if (id === 'to-game') {
      this.refreshGame();
    }
  };
  closeMenu = () => {
    this.setState({ displayMenu: false });
    this.explosion.play();
  };

  register = () => {
    const players = [...this.state.players];
    const cards = [...this.state.cards];

    if (this.state.gameLength > 0) {
      cards.length = this.state.gameLength;
    }

    players.pop();
    this.setState({ players: players });
    this.setState({ stage: 'finish-register' });
    this.setState({ cards: cards });
  };

  selectLooser = name => {
    const players = [...this.state.players];
    const cards = [...this.state.cards];
    cards.shift();
    players[name].score ? players[name].score++ : (players[name].score = 1);
    this.setState({ players: players });
    this.setState({ cards: cards });
    if (this.state.cards.length === 1) {
      this.setState({ stage: 'finish-game' });
    } else {
      this.setState({ stage: 'finish-register' });
    }
  };

  tik = new Audio(tik);
  explosion = new Audio(explosion);

  doExplosion = () => {
    this.explosion.play();

    setTimeout(() => {
      this.setState({ stage: 'select-looser' });
      this.setState({ overlay: false });
    }, 3000);

    this.setState({ overlay: true });

    this.setState({ timer: 0 });

    this.setState({ position: 'Брость кубик' });
  };

  selectPosition = () => {
    let positions = ['__XXXXXX', 'XXXXXX__', 'XXXXXXX'];
    this.setState({ positionSelected: false });

    let pos = setInterval(() => {
      let min = 0,
        max = 2;
      let rand = Math.floor(Math.random() * (max - min + 1) + min);
      this.setState({ position: positions[rand] });
    }, 50);

    setTimeout(() => {
      clearInterval(pos);
      this.setState({ positionSelected: true });
    }, 2000);
  };

  startTimer = () => {
    if (!this.state.positionSelected) return;
    this.setState({ positionSelected: false });
    this.setState({ timer: 1 });

    this.tik.play();
    let rand = Math.floor(
      Math.random() * (this.state.timerMax - this.state.timerMin + 1) + this.state.timerMin
    );
    setTimeout(() => {
      this.tik.pause();
      this.tik.currentTime = 0;
    }, rand * 1000);
    setTimeout(this.doExplosion, (rand - 0.5) * 1000);
  };

  refreshGame = () => {
    const cards = [...this.state.cards];
    this.shuffle(cards);
    this.setState({
      players: [{ name: '' }],
      cards: cards,
      timer: null,
      position: '',
      positionSelected: false
    });
  };

  render() {
    let register, gamescreen, looser, overlay, menu, rules;

    overlay = this.state.overlay ? <Overlay /> : '';
    menu = this.state.displayMenu ? (
      <Menu closeMenu={this.closeMenu} items={this.state.menuItems} menuClick={this.menuClick} />
    ) : (
      <div
        onClick={() => {
          this.setState({ displayMenu: true });
        }}
        className={classes.Burger}
      ></div>
    );

    switch (this.state.stage) {
      case '0':
        register = '';
        gamescreen = '';
        looser = '';
        rules = '';
        break;
      case 'to-game':
        register = (
          <Registration
            writeName={this.writeName}
            writeLength={this.writeLength}
            addLength={this.addLength}
            addName={this.addName}
            register={this.register}
            gameLength={this.gameLength}
            items={this.state.players}
          />
        );
        break;
      case 'finish-register':
        gamescreen = (
          <Gamescreen
            selectPosition={this.selectPosition}
            startTimer={this.startTimer}
            position={this.state.position}
            timer={this.state.timer}
            card={this.state.cards[0]}
          />
        );
        break;
      case 'select-looser':
        looser = <Looser selectLooser={this.selectLooser} items={this.state.players} />;
        break;
      case 'finish-game':
        looser = (
          <Looser fin={this.state.cards} selectLooser={() => true} items={this.state.players} />
        );
        break;
      case 'rules':
        rules = <Rules />;
        break;
      default:
    }

    return (
      <div className={classes.Main}>
        {overlay}
        {menu}
        {register}
        {gamescreen}
        {looser}
        {rules}
      </div>
    );
  }
}

export default Main;

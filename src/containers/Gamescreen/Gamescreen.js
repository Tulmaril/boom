import React from 'react';

import Timer from '../../components/Timer/Timer';
import Dice from '../../components/Dice/Dice';

import classes from './Gamescreen.css';

function Gamescreen(props) {
  return (
    <div className={classes.Gamescreen}>
      <Timer startTimer={props.startTimer} active={props.timer} />
      <Dice selectPosition={props.selectPosition} position={props.position} />
      <div className={classes.Gamescreen__card}>{props.card}</div>
    </div>
  );
}

export default Gamescreen;

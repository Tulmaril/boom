import React from 'react';

import classes from './Timer.css';

import bomb from '../../images/bomb.png';

function Timer(props) {
  let img = props.active === 1 ? <img src={bomb} alt="" /> : '';
  return (
    <div className={classes.Timer} onClick={props.startTimer}>
      {props.active ? '' : 'start'}
      {img}
    </div>
  );
}

export default Timer;

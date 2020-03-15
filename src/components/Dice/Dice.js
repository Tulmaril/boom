import React from 'react';

import classes from './Dice.css';

function Dice(props) {
  return (
    <div onClick={props.selectPosition} className={classes.Dice}>
      {props.position ? props.position : 'Брость кубик'}
    </div>
  );
}

export default Dice;

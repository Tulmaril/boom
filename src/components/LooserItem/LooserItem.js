import React from 'react';

import classes from './LooserItem.css';

function LooserItem(props) {
  let fin = props.fin ? classes.LooserItem__fin : '';

  return (
    <div
      className={classes.LooserItem + ' ' + fin}
      id={props.item.text}
      onClick={() => props.selectLooser(props.index)}
    >
      <span>{props.item.name}</span>
      <span>{props.item.score}</span>
    </div>
  );
}

export default LooserItem;

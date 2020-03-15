import React from 'react';

import classes from './MenuItem.css';

function MenuItem(props) {
  return (
    <div className={classes.MenuItem} id={props.item.text} onClick={() => props.menuClick(props.item.id)}>
      {props.item.text}
    </div>
  );
}

export default MenuItem;

import React from 'react';

import MenuItem from '../MenuItem/MenuItem';

import classes from './Menu.css';

function Menu(props) {
  return (
    <div className={classes.Menu}>
      <div onClick={props.closeMenu} className={classes.Menu__close}></div>
      {props.items.map((item, i) => {
        return <MenuItem key={i} menuClick={props.menuClick} item={item} />;
      })}
    </div>
  );
}

export default Menu;

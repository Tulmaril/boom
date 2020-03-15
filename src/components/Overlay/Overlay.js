import React from 'react';

import classes from './Overlay.css';
import explosion from '../../images/explosion.gif';

function Overlay() {
  return (
    <div className={classes.Overlay}>
      <img src={explosion} alt="" />
    </div>
  );
}

export default Overlay;

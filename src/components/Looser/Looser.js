import React from 'react';

import LooserItem from '../LooserItem/LooserItem';

import classes from './Looser.css';

function Looser(props) {
  let fin = props.fin ? classes.Looser__fin : '';

  return (
    <div className={classes.Looser + ' ' + fin}>
      {props.items.map((item, i) => {
        return (
          <LooserItem
            fin={props.fin}
            key={i}
            selectLooser={props.selectLooser}
            index={i}
            item={item}
          />
        );
      })}
    </div>
  );
}

export default Looser;

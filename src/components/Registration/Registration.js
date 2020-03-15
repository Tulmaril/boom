import React from 'react';

import classes from './Registration.css';

function Registration(props) {
  return (
    <div className={classes.Reg}>
      <div className={classes.Reg__list}>
        <input
          className={classes.Reg__input}
          placeholder="Количество карточек"
          onChange={event => props.writeLength(event.target.value)}
          value={props.gameLength}
          type="text"
        />
        {props.items.map((item, i) => {
          return (
            <input
              className={classes.Reg__input}
              placeholder="Имя"
              key={i}
              onChange={event => props.writeName(event.target.value, i)}
              onBlur={event => props.addName(event.target.value, i)}
              value={item.name}
              type="text"
            />
          );
        })}
      </div>
      <button
        className={classes.Reg__button}
        disabled={props.items[0].name === ''}
        onClick={props.register}
      >
        Далее
      </button>
    </div>
  );
}

export default Registration;

import React from 'react';

import classes from './RadioButton.module.scss';

type Props = {
  id: string;
  text: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  value: string;
  color?: string;
};

const RadioButton: React.FC<Props> = ({ text, color, id, name, value, onChange, checked }) => {

  return (
    <div className={classes.component}>
      <label className={classes.radioLabel}>
        <input
          type="radio"
          className={classes.radioInput}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          checked={checked}
        />
        <span className={classes.radioCustom}></span>
        <div className={classes.labelContent}>
          {color ? <div className={classes.circle} style={{ backgroundColor: color }}></div> : null}
          {text}
        </div>
      </label>
    </div>
  );
};

export default RadioButton;

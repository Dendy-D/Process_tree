import React, { useState } from 'react';

import Arrow from '../../assets/icons/arrowForSelect.svg?react';
import RadioButton from '../ui/RadioButton';
import classes from './CreateProcessForm.module.scss';

type Props = {
  levelOfProcess: string;
  onClose: () => void;
};

const CreateProcessForm: React.FC<Props> = ({ levelOfProcess, onClose }) => {
  const [processStatus, setProcessStatus] = useState('main');

  const hangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProcessStatus(e.target.value);
  };

  const isChecked = (value: string) => processStatus === value;

  const createProcess = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className={classes.component} onSubmit={(e) => createProcess(e)} >
      <input
        type="text"
        className={classes.nameOfProcess}
        placeholder={`Название бизнес-процесса ${levelOfProcess} уровня`}
        autoFocus 
      />
      <hr />
      <div className={classes.wrapper}>
        <div className={classes.inputWrapper}>
          <div className={classes.formGroup}>
            <label htmlFor="endOfProcess">Выход из процесса, ВД</label>
            <input type="text" id="endOfProcess" />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="linkToVD">Ссылка на ВД</label>
            <input type="text" id="linkToVD" />
          </div>
        </div>
        <div className={classes.chooseStatus}>
          <span className={classes.processStatus}>Cтатус процесса</span>
          <RadioButton
            text='Основной'
            id='main'
            name='main'
            value='main'
            onChange={hangeChange}
            checked={isChecked('main')}
            color='black'
          />
          <RadioButton
            text='Поддерживающий'
            id='supporting'
            name='supporting'
            value='supporting'
            onChange={hangeChange}
            checked={isChecked('supporting')}
            color='#F26427'
          />
          <RadioButton
            text='Управляющий'
            id='administering'
            name='administering'
            value='administering'
            onChange={hangeChange}
            checked={isChecked('administering')}
            color='#3A44A0'
          />
        </div>
      </div>
      <div className={classes.formGroup}>
        <label htmlFor="processOwner">Владелец процесса</label>
        <select name="processOwner" id="processOwner">
          <option value="someOption">Some option</option>
          <option value="otherOption">Other option</option>
          <option value="someOption">Some option</option>
          <option value="otherOption">Other option</option>
          <option value="someOption">Some option</option>
          <option value="otherOption">Other option</option>
        </select>
      </div>
      <div className={classes.formGroup}>
        <label htmlFor="businessAnalyst">Бизнес-аналитик</label>
        <select name="businessAnalyst" id="businessAnalyst"></select>
      </div>
      <div className={classes.buttonGroup}>
        <button className={classes.cancelButton} onClick={onClose}>Отмена</button>
        <button className={classes.okButton}>Ок</button>
      </div>
    </form>
  );
};

export default CreateProcessForm;

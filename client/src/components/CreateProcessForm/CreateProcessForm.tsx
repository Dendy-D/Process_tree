import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';

import employeesStore from '../../stores/employeesStore';
import processesStore from '../../stores/processesStore';
import { useKeyboardEvents } from '../../hooks/useKeyboardEvents';
import { useFormValidation } from '../../hooks/useFormValidation';
import RadioButton from '../ui/RadioButton';
import classes from './CreateProcessForm.module.scss';

type Props = {
  levelOfProcess: string;
  onClose: () => void;
  isChildProcess: boolean;
  processId: number;
};

const CreateProcessForm: React.FC<Props> = observer(({ levelOfProcess, onClose, processId, isChildProcess }) => {
  const { fetchAllEmployees, analystEmployees, employees, isLoading } = employeesStore;
  const { createFirstLevelProcess, createChildProcess } = processesStore;

  const { isValid, isChecked, formData, handleChange, handleChangeProcessStatus } = useFormValidation({
    name: '',
    exitFromProcess: '',
    VDlink: '',
    status: 'main',
    processOwnerId: undefined,
    analystId: undefined,
  });

  const formRef = useRef<HTMLFormElement>(null);

  const createProcess = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!isValid()) return;
    onClose();
    console.log(isChildProcess)
    if (isChildProcess) {
      createChildProcess(processId, formData);
    } else {
      createFirstLevelProcess(formData);
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (isValid()) {
        createProcess();
      } else {
        formRef.current?.reportValidity();
      }
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useKeyboardEvents(handleKeyPress, onClose);

  const handleCancel = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClose();
  }

  useEffect(() => {
    fetchAllEmployees();
  }, [fetchAllEmployees]);

  return (
    <form
      className={classes.component}
      onSubmit={(e) => createProcess(e)}
      ref={formRef}
    >
      <input
        type="text"
        className={classes.nameOfProcess}
        placeholder={`Название бизнес-процесса ${levelOfProcess} уровня`}
        name="name"
        value={formData.name}
        onChange={handleChange}
        autoFocus
        required
      />
      <hr />
      <div className={classes.wrapper}>
        <div className={classes.inputWrapper}>
          <div className={classes.formGroup}>
            <label htmlFor="exitFromProcess">Выход из процесса, ВД</label>
            <input
              type="text"
              id="exitFromProcess"
              name="exitFromProcess"
              value={formData.exitFromProcess}
              onChange={handleChange}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="VDlink">Ссылка на ВД</label>
            <input
              type="text"
              id="VDlink"
              name="VDlink"
              value={formData.VDlink}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={classes.chooseStatus}>
          <span className={classes.processStatus}>Cтатус процесса</span>
          <RadioButton
            text='Основной'
            id='main'
            name='main'
            value='main'
            onChange={handleChangeProcessStatus}
            checked={isChecked('main')}
            color='black'
          />
          <RadioButton
            text='Поддерживающий'
            id='supporting'
            name='supporting'
            value='supporting'
            onChange={handleChangeProcessStatus}
            checked={isChecked('supporting')}
            color='#F26427'
          />
          <RadioButton
            text='Управляющий'
            id='administering'
            name='administering'
            value='administering'
            onChange={handleChangeProcessStatus}
            checked={isChecked('administering')}
            color='#3A44A0'
          />
        </div>
      </div>
      <div className={classes.formGroup}>
        <label htmlFor="processOwnerId">Владелец процесса</label>
        <select name="processOwnerId" id="processOwnerId" value={formData.processOwnerId} onChange={handleChange}>
          {isLoading ? (
            <option>Loading...</option>
          ) : (
            <>
              <option value=""></option>
              {employees.map(({id, name}) => (
                <option key={id} value={id}>{name}</option>
              ))} 
            </>
          )}
        </select>
      </div>
      <div className={classes.formGroup}>
        <label htmlFor="analystId">Бизнес-аналитик</label>
        <select name="analystId" id="analystId" value={formData.analystId} onChange={handleChange}>
          {isLoading ? (
            <option>Loading...</option>
          ) : (
            <>
              <option value=""></option>
              {analystEmployees.map(({id, name}) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </>
          )}
        </select>
      </div>
      <div className={classes.buttonGroup}>
        <button className={classes.cancelButton} onClick={handleCancel}>Отмена</button>
        <button className={classes.okButton}>Ок</button>
      </div>
    </form>
  );
});

export default CreateProcessForm;

import { useState } from 'react';

import { useKeyboardEvents } from '../../hooks/useKeyboardEvents';
import { Process, ProcessStatus } from '../../types';
import RadioButton from '../ui/RadioButton';
import classes from './Change.module.scss';

type Props = {
  onClose: () => void;
  handleChangeProcessStatus: (e: React.ChangeEvent<HTMLInputElement>) => void;
  process: Process;
};

const ChangeStatus: React.FC<Props> = ({ onClose, handleChangeProcessStatus, process }) => {
  const [selectedStatus, setSelectedStatus] = useState(process.status);

  const isChecked = (value: string) => selectedStatus === value;

  const handleStatusChange = (status: ProcessStatus) => {
    setSelectedStatus(status);
  };

  const convertToChangeEvent = (status: ProcessStatus | undefined): React.ChangeEvent<HTMLInputElement> => {
    return {
      target: {
        name: status,
      },
    } as React.ChangeEvent<HTMLInputElement>;
  };

  const handleOk = () => {
    console.log(convertToChangeEvent(selectedStatus))
    handleChangeProcessStatus(convertToChangeEvent(selectedStatus));
    onClose();
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleChangeProcessStatus(convertToChangeEvent(selectedStatus));
      onClose();
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useKeyboardEvents(handleKeyPress, onClose);

  return (
    <div className={classes.modal}>
      <div className={classes.chooseStatus}>
        <RadioButton
          text='Основной'
          id='main'
          name='main'
          value='main'
          onChange={() => handleStatusChange('main')}
          checked={isChecked('main')}
          color='black'
        />
        <RadioButton
          text='Поддерживающий'
          id='supporting'
          name='supporting'
          value='supporting'
          onChange={() => handleStatusChange('supporting')}
          checked={isChecked('supporting')}
          color='#F26427'
        />
        <RadioButton
          text='Управляющий'
          id='administering'
          name='administering'
          value='administering'
          onChange={() => handleStatusChange('administering')}
          checked={isChecked('administering')}
          color='#3A44A0'
        />
      </div>
      <div className={classes.buttonGroup}>
        <button className={classes.cancelButton} onClick={onClose}>Отмена</button>
        <button className={classes.okButton} onClick={handleOk} type="submit">Ок</button>
      </div>
    </div>
  );
};

export default ChangeStatus;

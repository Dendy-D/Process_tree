import { observer } from 'mobx-react';

import processesStore from '../../stores/processesStore';
import { useKeyboardEvents } from '../../hooks/useKeyboardEvents';
import classes from './DeleteProcessForm.module.scss';

type Props = {
  processId: number;
  onClose: () => void;
}

const DeleteProcessForm: React.FC<Props> = observer(({ processId, onClose }) => {
  const { deleteProcess } = processesStore;

  const handleDeleteProcess = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    deleteProcess(processId);
    onClose();
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleDeleteProcess();
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

  return (
    <form
      className={classes.component}
      onSubmit={handleDeleteProcess}
    >
      <p>Вы уверены что хотите удалить процесс?</p>
      <div className={classes.buttonGroup}>
        <button className={classes.okButton} onClick={handleCancel}>Отмена</button>
        <button className={classes.cancelButton} type="submit">Удалить</button>
      </div>
    </form>
  );
});

export default DeleteProcessForm;

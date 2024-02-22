// import { useFormValidation } from '../../hooks/useFormValidation';
import RadioButton from '../ui/RadioButton';
import classes from './Change.module.scss';

type Props = {
  onClose: () => void;
  handleChangeProcessStatus: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked: (value: string) => boolean;
};

const ChangeStatus: React.FC<Props> = ({ onClose, isChecked, handleChangeProcessStatus }) => {
  // const { isValid, isChecked, formData, handleChange, handleChangeProcessStatus, setFormData } = useFormValidation({
  //   name: '',
  //   exitFromProcess: '',
  //   VDlink: '',
  //   status: 'main',
  //   processOwnerId: undefined,
  //   analystId: undefined,
  // });

  return (
    <div className={classes.modal}>
      <div className={classes.chooseStatus}>
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
      <div className={classes.buttonGroup}>
        <button className={classes.cancelButton} onClick={onClose}>Отмена</button>
        <button className={classes.okButton} type="submit">Ок</button>
      </div>
    </div>
  );
};

export default ChangeStatus;

import { useState } from 'react';

import Modal from '../ui/Modal';
import CreateProcessForm from '../CreateProcessForm';
// import filter from '../../assets/icons/filter.svg';
import classes from './Table.module.scss';

const Table: React.FC = () => {
  const [isCreateProcessModalOpen, setCreateProcessModalOpen] = useState(false);

  return (
    <div className={classes.component}>
      <table>
        <thead>
          <tr>
            <th>Бизнес-процесс</th>
            <th>Выход из процесса, ВД</th>
            <th>Ссылка на ВД</th>
            <th>Владелец процесса</th>
            <th>Бизнес-аналитик</th>
          </tr>
        </thead>
        <tbody>
          <tr className={classes.tableRow}>
            <td>Название</td>
            <td>Текст</td>
            <td>Текст</td>
            <td>Минкевеч</td>
            <td>Даржанов</td>
          </tr>
        </tbody>
      </table>
      <button
        className={classes.addFirstLevelProcess}
        onClick={() => setCreateProcessModalOpen(true)}
      >
        <span>+</span>
        Процесс первого уровня
      </button>
      <Modal isOpen={isCreateProcessModalOpen} onClose={() => setCreateProcessModalOpen(false)}>
        <CreateProcessForm levelOfProcess='первого' onClose={() => setCreateProcessModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default Table;

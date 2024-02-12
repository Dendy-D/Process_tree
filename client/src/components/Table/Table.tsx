import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import processesStore from '../../stores/processesStore';
import { Process } from '../../types';
import Modal from '../ui/Modal';
import CreateProcessForm from '../CreateProcessForm';
import EditProccesForm from '../EditProcessForm';
import Add from '../../assets/icons/add.svg?react';
import Edit from '../../assets/icons/edit.svg?react';
import TrashBin from '../../assets/icons/trashBin.svg?react';
// import filter from '../../assets/icons/filter.svg';
import classes from './Table.module.scss';

const Table: React.FC = observer(() => {
  const [isCreateProcessModalOpen, setCreateProcessModalOpen] = useState(false);
  const [isEditProcessModalOpen, setEditProcessModalOpen] = useState(false);
  const [editingProcessId, setEditingProcessId] = useState<number>();

  const handleEditProcess = (id: number) => {
    setEditProcessModalOpen(true);
    setEditingProcessId(id);
  }

  const { processes, fetchAllProcesses } = processesStore;
  
  useEffect(() => {
    fetchAllProcesses();
  }, [fetchAllProcesses]);

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
          {processes.map((process: Process) => (
            <tr key={process.id} className={classes.tableRow}>
              <td className={classes.processName}>
                <div className={classes.processNameContent}>
                  {/* <div></div> */}
                  <div>{process.name}</div>
                  <div className={classes.icons}>
                    <Add />
                    <Edit onClick={() => handleEditProcess(process.id)}/>
                    <TrashBin />
                  </div>
                </div>
              </td>
              <td>{process.exitFromProcess}</td>
              <td>{process.VDlink}</td>
              <td>{process.processOwner?.name}</td>
              <td>{process.analyst?.name}</td>
            </tr>
          ))}
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
      <Modal isOpen={isEditProcessModalOpen} onClose={() => setEditProcessModalOpen(false)}>
         <EditProccesForm onClose={() => setEditProcessModalOpen(false)} editingProcessId={editingProcessId} />
      </Modal>
    </div>
  );
});

export default Table;

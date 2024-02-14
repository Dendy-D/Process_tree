import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import processesStore from '../../stores/processesStore';
import employeesStore from '../../stores/employeesStore';
import { Process, ProcessStatus } from '../../types';
import Modal from '../ui/Modal';
import CreateProcessForm from '../CreateProcessForm';
import EditProccesForm from '../EditProcessForm';
import DeleteProcessForm from '../DeleteProcessForm';
import Add from '../../assets/icons/add.svg?react';
import Edit from '../../assets/icons/edit.svg?react';
import TrashBin from '../../assets/icons/trashBin.svg?react';
// import filter from '../../assets/icons/filter.svg';
import classes from './Table.module.scss';

const Table: React.FC = observer(() => {
  const [isCreateProcessModalOpen, setCreateProcessModalOpen] = useState(false);
  const [isEditProcessModalOpen, setEditProcessModalOpen] = useState(false);
  const [isDeleteProcessModalOpen, setDeleteProcessModalOpen] = useState(false);
  const [processId, setProcessId] = useState<number>();

  const { fetchAllEmployees, analystEmployees, employees, isLoading } = employeesStore;

  const handleEditProcess = (id: number) => {
    setEditProcessModalOpen(true);
    setProcessId(id);
  };

  const handleDeleteProcess = (id: number) => {
    setDeleteProcessModalOpen(true);
    setProcessId(id);
  };

  const { processes, fetchAllProcesses } = processesStore;
  
  useEffect(() => {
    fetchAllProcesses();
    fetchAllEmployees();
  }, [fetchAllProcesses, fetchAllEmployees]);

  const statusColors: { [key in ProcessStatus]: string } = {
    [ProcessStatus.Main]: 'black',
    [ProcessStatus.Supporting]: 'red',
    [ProcessStatus.Administering]: 'blue',
  };

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
                  {process.status && (
                    <div
                      className={classes.circle}
                      style={{ backgroundColor: statusColors[process.status] }}
                    />
                  )}
                  <div>{process.name}</div>
                  <div className={classes.icons}>
                    <Add />
                    <Edit onClick={() => handleEditProcess(process.id)}/>
                    <TrashBin onClick={() => handleDeleteProcess(process.id)} />
                  </div>
                </div>
              </td>
              <td>{process.exitFromProcess}</td>
              <td>{process.VDlink}</td>
              <td>
                <select
                  name="analystId"
                  id="analystId"
                  value={process.analyst?.name}
                >
                  {analystEmployees.map(({id, name}) => (
                    <option key={id} value={id}>{name}</option>
                  ))}
                </select>
              </td>

              {/* <select name="analystId" id="analystId" value={formData.analystId} onChange={handleChange}>
                {isLoading ? (
                  <option>Loading...</option>
                ) : (
                  <>
                    <option value={undefined}></option>
                    {analystEmployees.map(({id, name}) => (
                      <option key={id} value={id}>{name}</option>
                    ))}
                  </>
                )}
              </select> */}
              {/* <td>{process.processOwner?.name}</td> */}
              {/* <td>{process.analyst?.name}</td> */}
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
         <EditProccesForm onClose={() => setEditProcessModalOpen(false)} processId={processId as number} />
      </Modal>
      <Modal isOpen={isDeleteProcessModalOpen} onClose={() => setDeleteProcessModalOpen(false)}>
         <DeleteProcessForm onClose={() => setDeleteProcessModalOpen(false)} processId={processId as number} />
      </Modal>
    </div>
  );
});

export default Table;

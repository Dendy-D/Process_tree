import { useEffect, useMemo, useState, useCallback } from 'react';
import { observer } from 'mobx-react';
import debounce from 'lodash/debounce';

import processesStore from '../../stores/processesStore';
import employeesStore from '../../stores/employeesStore';
import { Process, ProcessStatus, UpdateProcess } from '../../types';
import Modal from '../ui/Modal';
import CreateProcessForm from '../CreateProcessForm';
import EditProccesForm from '../EditProcessForm';
import DeleteProcessForm from '../DeleteProcessForm';
import ChangeStatus from '../ChangeStatus';
import { useKeyboardEvents } from '../../hooks/useKeyboardEvents';
import { useFormValidation } from '../../hooks/useFormValidation';
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
  const [isChildProcess, setIsChildProcess] = useState(false);

  const [editingFieldName, setEditingFieldName] = useState('');
  const [editingProcessId, setEditingProcessId] = useState<number | null>(null);
  const [editingProcessValue, setEditingProcessValue] = useState('');

  const [isStatusChangeOpen, setIsStatusChangeOpen] = useState(false);
  
  const { fetchAllEmployees, analystEmployees, employees, isLoading } = employeesStore;
  const { processes, fetchAllProcesses, updateProcess } = processesStore;

  // console.log(processes)

  const handleEditProcess = (id: number) => {
    setEditProcessModalOpen(true);
    setProcessId(id);
  };

  const handleDeleteProcess = (id: number) => {
    setDeleteProcessModalOpen(true);
    setProcessId(id);
  };

  const handleCreateChildProcess = (id: number) => {
    setCreateProcessModalOpen(true);
    setProcessId(id);
    setIsChildProcess(true);
  }
  
  useEffect(() => {
    fetchAllProcesses();
    fetchAllEmployees();
  }, [fetchAllProcesses, fetchAllEmployees]);

  const statusColors: { [key in ProcessStatus]: string } = {
    [ProcessStatus.Main]: 'black',
    [ProcessStatus.Supporting]: 'red',
    [ProcessStatus.Administering]: 'blue',
  };

  const handleEdit = (field: string, id: number, value: string) => {
    setEditingFieldName(field);
    setEditingProcessId(id);
    setEditingProcessValue(value);
  };

  const debouncedUpdateProcess = useMemo(
    () => debounce(updateProcess, 300),
    [updateProcess],
  );

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, processId: number, process: Process) => {
    const { value } = e.target;

    console.log(value);

    setEditingProcessValue(value);

    const updateProcessBody = {
      name: process.name,
      exitFromProcess: process.exitFromProcess,
      VDlink: process.VDlink,
      status: process.status,
      processOwner: process.processOwner?.id,
      analyst: process.analyst?.id,
    };

    debouncedUpdateProcess(processId, { ...updateProcessBody, [editingFieldName]: value });
  };

  const handleStatusChange = (id: number) => {
    setEditingProcessId(id);
    setIsStatusChangeOpen(true);
  };

  const onClose = () => {
    setIsStatusChangeOpen(false);
  };

  // const handleUpdateProcess = (e?: React.FormEvent<HTMLFormElement>) => {
  //   e?.preventDefault();
  //   if (!isValid()) return;
  //   onClose();
    // updateProcess(editingProcessId, formData);
  // };

  // const handleKeyPress = (e: KeyboardEvent) => {
  //   if (e.key === 'Enter') {
  //     e.preventDefault();
  //     if (isValid()) {
  //       handleUpdateProcess();
  //     } else {
  //       // formRef.current?.reportValidity();
  //     }
  //   }
  //   if (e.key === 'Escape') {
  //     onClose();
  //   }
  // };

  // useKeyboardEvents(handleKeyPress, onClose);

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
              <td className={classes.processNameTd}>
                <div className={classes.processNameContent}>
                  {process.status && (
                    <div
                      className={classes.circle}
                      style={{ backgroundColor: statusColors[process.status] }}
                      onClick={() => handleStatusChange(process.id)}
                    />
                  )}
                  {(isStatusChangeOpen && editingProcessId === process.id) && (
                    <div></div>
                      // <ChangeStatus onClose={onClose} handleChangeProcessStatus={handleChangeProcessStatus} isChecked={isChecked} />
                  )}
                  <div
                    onDoubleClick={() => handleEdit('name', process.id, process.name)}
                    className={classes.processName}
                    style={
                      editingFieldName === 'name' && process.id === editingProcessId
                        ? { textOverflow: 'unset', overflow: 'unset' }
                        : {}
                    }
                  >
                    {editingFieldName === 'name' && process.id === editingProcessId
                    ? (
                      <input
                        className={`${classes.editingField} ${classes.processNameField}`}
                        type="text"
                        style={{ backgroundColor: '#94CE87' }}
                        name="name"
                        value={editingProcessValue}
                        onChange={(e) => handleUpdate(e, process.id, process)}
                        autoFocus
                      />
                    ) : (
                      process.name
                    )}
                  </div>
                  <div className={classes.icons}>
                    <Add onClick={() => handleCreateChildProcess(process.id)} />
                    <Edit onClick={() => handleEditProcess(process.id)}/>
                    <TrashBin onClick={() => handleDeleteProcess(process.id)} />
                  </div>
                </div>
              </td>
              <td
                className={classes.tdWithInputField}
                onDoubleClick={() => handleEdit('exitFromProcess', process.id, process.exitFromProcess || '')}
                style={
                  editingFieldName === 'exitFromProcess' && process.id === editingProcessId
                    ? { textOverflow: 'unset', overflow: 'unset' }
                    : {}
                }
              >
                {editingFieldName === 'exitFromProcess' && process.id === editingProcessId
                ? (
                  <input
                    className={classes.editingField}
                    type="text"
                    name="exitFromProcess"
                    value={editingProcessValue}
                    onChange={(e) => handleUpdate(e, process.id, process)}
                    autoFocus
                  />
                ) : (
                  process.exitFromProcess
                )}
              </td>
              <td
                className={classes.tdWithInputField}
                onDoubleClick={() => handleEdit('VDlink', process.id, process.VDlink || '')}
                style={
                  editingFieldName === 'VDlink' && process.id === editingProcessId
                    ? { textOverflow: 'unset', overflow: 'unset' }
                    : {}
                }
              >
                {editingFieldName === 'VDlink' && process.id === editingProcessId
                ? (
                  <input
                    className={classes.editingField}
                    type="text"
                    name="VDlink"
                    value={editingProcessValue}
                    onChange={(e) => handleUpdate(e, process.id, process)}
                    autoFocus
                  />
                ) : (
                  process.VDlink
                )}
              </td>
              <td>
                <select
                  name="processOwnerId"
                  id="processOwnerId"
                  // value={process.analyst?.id}
                  value={process.processOwner?.id || undefined}
                  onChange={(e) => handleUpdate(e, process.id, process)}
                  // defaultValue={process.processOwner?.id}
                  // value={editingProcessValue}
                >
                  <option value={undefined}></option>
                  {employees.map(({id, name}) => (
                    <option key={id} value={id}>{name}</option>
                  ))} 
                </select>
              </td>
              <td>
                <select
                  name="analystId"
                  id="analystId"
                  // defaultValue={process.analyst?.id}
                  value={process.analyst?.id || undefined}
                  onChange={(e) => handleUpdate(e, process.id, process)}
                >
                  <option value={undefined}></option>
                  {analystEmployees.map(({id, name}) => (
                    <option key={id} value={id}>{name}</option>
                  ))}
                </select>
              </td>
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
        <CreateProcessForm
          isChildProcess={isChildProcess}
          levelOfProcess='первого'
          onClose={() => setCreateProcessModalOpen(false)}
          processId={processId as number}
        />
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

import Table from '../Table';
import logo from '../../assets/images/logo.png';
import freedom from '../../assets/images/freedom.png';
import folder from '../../assets/icons/folder.svg';
import folder1 from '../../assets/icons/folder1.svg';
import classes from './App.module.scss';

const App: React.FC = () => {
  return (
    <div className={classes.component}>
      <img src={logo} alt="logo" className={classes.logo} />
      <hr />
      <main>
        <div className={classes.content}>
          <div className={classes.description}>
            <div className={classes.leftSide}>
              <h1>Бизнес-процессы</h1>
              <p>в нашей компании выполняются по опредленному алгоритму</p>
            </div>
            <img src={freedom} alt="Freedom Telecom" />
          </div>
          <Table />
        </div>
        <div className={classes.structure}>
          <img src={folder} alt="folder" />
          <img src={folder1} alt="folder" />
        </div>
      </main>
    </div>
  );
};

export default App;

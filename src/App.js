import { useMemo, useState } from 'react';
import './App.css';

const getUserData = () => fetch('/user.json').then((resp) => resp.json());

const App = () => {
  const [info, setInfo] = useState({
    name: '',
    roles: [],
  });
  const roleList = useMemo(() => {
    return Object.keys(info.roles ?? {}).filter((k) => info.roles[k]);
  }, [info.roles]);

  const onLoadUser = async () => {
    const data = await getUserData();
    console.log('TCL: onLoadUser -> data', data);
    setInfo(data);
  };
  return (
    <div className="App">
      <div>Name: {JSON.stringify(info.name)}</div>
      <div>Roles: {JSON.stringify(info.roles)}</div>
      <div>Role List: {JSON.stringify(roleList)}</div>
      <div>
        <button onClick={onLoadUser}>Load</button>
      </div>
    </div>
  );
};
export default App;

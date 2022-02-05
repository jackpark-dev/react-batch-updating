import { useEffect, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import './App.css';

const getUserData = () => fetch('/user.json').then((resp) => resp.json());

const App = () => {
  const [name, setName] = useState();
  const [roles, setRoles] = useState();
  const [roleList, setRoleList] = useState();
  useEffect(() => {
    console.log(`userEffect ${name} ${roles}`);
    if (name) {
      setRoleList(Object.keys(roles ?? {}).filter((k) => roles[k]));
    }
  }, [name, roles]);

  /* const onLoadUser = () => {
    setName("Test User");
    setRoles({
      editor: true,
    });
  }; */
  const onLoadUser = async () => {
    const data = await getUserData();
    console.log('TCL: onLoadUser -> data', data);
    unstable_batchedUpdates(() => {
      setName(data.name);
      setRoles(data.roles);
    });
  };
  return (
    <div className="App">
      <div>Name: {JSON.stringify(name)}</div>
      <div>Roles: {JSON.stringify(roles)}</div>
      <div>Role List: {JSON.stringify(roleList)}</div>
      <div>
        <button onClick={onLoadUser}>Load</button>
      </div>
    </div>
  );
};
export default App;

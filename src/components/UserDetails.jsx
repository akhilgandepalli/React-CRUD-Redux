import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, userDeleted} from '../redux/userSlice';
import AddUser from './AddUser';
import EditUser from './EditUser';


const UserDetails = () => {
  const users = useSelector((state)=>state.users)
  const dispatch = useDispatch();
  const [action, setAction] = useState(true);
  const [form, setForm] = useState(false);
  const [editform, setEditForm] = useState(false);

  const showUsers = ()=>{
    setAction(!action);
  }
  useEffect(()=>{
    // dispatch(fetchUsers());
  },[])

  return (
    <main>
      <h2>Crud operations using Redux</h2>
      <div className='btns'><button disabled={users.users.length >0 ?true:false} onClick={()=>dispatch(fetchUsers())}>Get Users</button>
      <button onClick={showUsers}>{!action ? 'Show Users' :' Hide Users'}</button>
      <button onClick={()=>setForm(true)}>Add User</button>
      </div>
      <div>{users.loading && <p>...Loading</p>}</div>
    <table>
      <thead>
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Company</th>
            <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {!users.loading&& action && users.users.map((user)=>(
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.company.name}</td>
            <td>
              <button onClick={()=>setEditForm(true)}>Edit</button>{editform && <EditUser editForm={setEditForm} user={user}/>}
              <button onClick={()=>dispatch(userDeleted(user.id))}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
    <div>{!users.loading && users.error}</div>
    {form && <AddUser form={setForm}/>}
    </main>
  )
}

export default UserDetails
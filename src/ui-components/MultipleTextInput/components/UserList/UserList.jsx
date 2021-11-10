import React, { useState } from 'react';
import { Input } from 'ui-components';
import { emailVerifier } from '../../utils/functions';
import useForm from 'utils/hooks/useForm';
import '../../MultipleTextInput.scss';

const editUserFormInputs = [{
  name: 'name'
}, {
  name: 'email',
  verifier: emailVerifier
}];

const UserList = ({ users, setUsers }) => {
  const [editUserInputs, editUserInputErrors, onEditUserInputChange, verifyEditUserInputs, setEditUserInputs] = useForm(editUserFormInputs);
  const [editedIndex, setEditedIndex] = useState(null);

  const displayEditInputs = (ind, name, email) => () => {
    setEditUserInputs({ name, email });
    setEditedIndex(ind);
  };

  const editUser = ind => () => {
    if (verifyEditUserInputs()) {
      const newUsers = [...users];
      newUsers[ind] = { ...editUserInputs };
      setUsers(newUsers);
      setEditedIndex(null);
    };
  };

  const deleteUser = ind => () => {
    const newUsers = [...users];
    newUsers.splice(ind, 1);
    setUsers(newUsers);
  };
  
  return (
    <>
      {users.map(({ name, email }, ind) => (
        <React.Fragment key={ind}>
          <tr>
            <td>{ind !== editedIndex && <i class="bi bi-pencil-square" onClick={displayEditInputs(ind, name, email)}/>}</td>
            <td>
              {ind === editedIndex ?
                <Input
                  id="name-input"
                  onChange={onEditUserInputChange('name', event => event.target.value)}
                  value={editUserInputs.name}
                /> :
                name
              }
            </td>
            <td>
              {ind === editedIndex ?
                <Input
                  id="email-input"
                  onChange={onEditUserInputChange('email', event => event.target.value)}
                  value={editUserInputs.email}
                /> :
                email
              }  
            </td>
            <td>
              {ind === editedIndex ?
                <i class="bi bi-file-check" onClick={editUser(ind)} /> :
                <i class="bi bi-file-x" onClick={deleteUser(ind)} />
              }
            </td>
          </tr>
          {(editUserInputErrors.name || editUserInputErrors.email) &&
            <tr>
              <td></td>
              <td>{editUserInputErrors.name}</td>
              <td>{editUserInputErrors.email}</td>
            </tr>
          }
        </React.Fragment>
      ))}
    </>
  );
};

export default UserList;
import React from 'react';
import { Input } from 'ui-components';
import { emailVerifier } from '../../utils/functions';
import useForm from 'utils/hooks/useForm';
import '../../MultipleTextInput.scss';

const newUserFormInputs = [{
  name: 'name',
  defaultValue: ''
}, {
  name: 'email',
  defaultValue: '',
  verifier: emailVerifier
}];

const CreateNewUser = ({ users, setUsers }) => {
  const [newUserInputs, newUserInputErrors, onNewUserInputChange, verifyNewUserInputs, setNewUserInputs] = useForm(newUserFormInputs);

  const onAddUser = () => {
    if (verifyNewUserInputs()) {
      setUsers([...users, { ...newUserInputs }]);
      setNewUserInputs({ name: '', email: '' })
    };
  };

  return (
    <>
      <tr>
        <td>
          <i class="bi bi-plus-square" onClick={onAddUser}></i>
        </td>
        <td>
          <Input
            id="name-input" 
            onChange={onNewUserInputChange('name', event => event.target.value)}
            value={newUserInputs.name}
          />
        </td>
        <td>
          <Input
            id="email-input"
            onChange={onNewUserInputChange('email', event => event.target.value)}  
            value={newUserInputs.email}
          />
        </td>
      </tr>
      {(newUserInputErrors.name || newUserInputErrors.email) &&
        <tr>
          <td></td>
          <td>{newUserInputErrors.name}</td>
          <td>{newUserInputErrors.email}</td>
        </tr>
      }
    </>
  )
};

export default CreateNewUser;
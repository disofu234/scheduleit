import React from 'react';
import { Label } from 'ui-components';
import CreateNewUser from './components/CreateNewUser';
import UserList from './components/UserList/UserList';
import './MultipleTextInput.scss';

const MultipleTextInput = ({ users, setUsers, label, errorMessage }) =>
  <>
    <Label>{label}</Label>
    <table>
      <TableHeader />
      <UserList 
        users={users}
        setUsers={setUsers}
      />
      <CreateNewUser
        users={users}
        setUsers={setUsers}
      />
    </table>
    {errorMessage &&
      <p className="error-message">{errorMessage}</p>}
  </>

const TableHeader = () =>
  <tr>
    <td></td>
    <td className="name-input-wrapper">Name</td>
    <td className="email-input-wrapper">User emails</td>
    <td></td>
  </tr>

export default MultipleTextInput;
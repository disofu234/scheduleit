import React from 'react';
import './Input.scss';
import 'bootstrap.scss';
import { Label } from 'ui-components';

const Input = ({ label, type, errorMessage, value, onChange }) => 
  <div>
    <Label>{label}</Label>
    <input className="form-control input" type={type} value={value} onChange={onChange} />
    {errorMessage &&
      <p className="error-message">{errorMessage}</p>}
  </div>

export default Input
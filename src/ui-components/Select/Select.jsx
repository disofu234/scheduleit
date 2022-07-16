import React from 'react';
import { Label } from 'ui-components';
import './Select.scss';
import 'bootstrap.scss';

const Select = ({ label, onChange, state, placeholder, options, errorMessage, multiple, className }) =>
  <div className={className}>
    <Label>{label}</Label>
    <select onChange={onChange} className="form-select" id="select" multiple={multiple}>
      {placeholder && 
        <option value="" disabled selected={state === undefined}>{placeholder}</option>}
      {options.map(({ value, content }) => <option value={value} selected={value === state}>{content}</option>)}
    </select>
    {errorMessage &&
      <p className="error-message">{errorMessage}</p>}
  </div>

export default Select;
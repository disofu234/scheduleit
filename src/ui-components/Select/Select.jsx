import React from 'react';
import { Label } from 'ui-components';
import './Select.scss';
import 'bootstrap.scss';

const Select = ({ label, onChange, state, placeholder, options, errorMessage, multiple }) =>
  <div className="select-wrapper">
    <Label>{label}</Label>
    <select onChange={onChange} className="form-select" id="select" multiple={multiple}>
      {placeholder && 
        <option value="" disabled selected={state === undefined}>{placeholder}</option>}
      {options.map(({ value, content }) => <option value={value}>{content}</option>)}
    </select>
    {errorMessage &&
      <p className="error-message">{errorMessage}</p>}
  </div>

export default Select;
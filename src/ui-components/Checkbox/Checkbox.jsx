import React from 'react';
import 'bootstrap.scss';
import './Checkbox.scss';

const Checkbox = ({ label, checked, onChange }) => (
  <div className="form-check">
    <input className="form-check-input" type="checkbox" value="" id={label} checked={checked} onChange={onChange} />
    <label className="form-check-label checkbox-label" for={label}>{label}</label>
  </div>
)

export default Checkbox
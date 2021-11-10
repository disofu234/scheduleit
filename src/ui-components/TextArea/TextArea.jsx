import React from 'react';
import './TextArea.scss';
import 'bootstrap.scss';

const TextArea = ({ label, rows, onChange, placeholder, errorMessage }) =>
  <div className="textarea-wrapper">
    <label class="form-label">{label}</label>
    <textarea class="form-control" rows={rows} onChange={onChange} placeholder={placeholder}></textarea>
    {errorMessage &&
      <p className="error-message">{errorMessage}</p>}
  </div>

export default TextArea;
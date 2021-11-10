import React from 'react';
import './Button.scss';

const Button = ({ onClick, isDisabled, content }) =>
  <div className="button-wrapper">
    <button className="button" onClick={onClick} disabled={isDisabled}>{content}</button>
  </div>

export default Button;
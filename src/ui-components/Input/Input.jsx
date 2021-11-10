import React from 'react';
import './Input.scss';
import 'bootstrap.scss';

const Input = (props) => 
    <input className="form-control" {...props} />;

export default Input;
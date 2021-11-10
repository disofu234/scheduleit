import React from 'react';
import './Label.scss';

const Label = ({ children, ...props }) => 
  <label className="label" {...props}>{children}</label>;

export default Label;
import React from 'react';
import './Label.scss';

const Label = ({ children, className, ...props }) => 
  <label className={className ? "label " + className : "label"} {...props}>{children}</label>;

export default Label;
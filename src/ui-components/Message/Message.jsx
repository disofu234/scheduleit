import React from 'react';
import './Message.scss';

const Message = ({ children, className }) =>
  <b className={className ? "message " + className: "message"}>{children}</b>

export default Message;
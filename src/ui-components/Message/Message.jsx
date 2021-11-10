import React from 'react';
import './Message.scss';

const Message = ({ content }) =>
  <b className="message">{content}</b>

export default Message;
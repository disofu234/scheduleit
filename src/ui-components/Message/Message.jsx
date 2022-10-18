import React from 'react';
import './Message.scss';

const Message = ({ children, className, size = 'big' }) => {
  const messageClassNames = ['message', className]

  if (size === 'big') {
    messageClassNames.push('message-big')
  } else if (size === 'small') {
    messageClassNames.push('message-small')
  }

  return <div className={messageClassNames.join(' ')}>{children}</div>
}

export default Message;
import React from 'react';
import { CollapsedProvider, useCollapsedContext } from './utils/context/collapsedContext';
import './CollapsibleCard.scss';

const CollapsibleCard = ({ children }) => 
  <CollapsedProvider>
    <div className="card-wrapper">
      {children}
    </div>
  </CollapsedProvider>

const Header = ({ children }) => {
  const { toggleCollapsed } = useCollapsedContext();
  return (
    <div onClick={() => toggleCollapsed()}>
      {children}
    </div>
  );
};

const Body = ({ children }) => {
  const { isCollapsed } = useCollapsedContext();
  return (
    <div>
      {!isCollapsed && children}
    </div>
  );
};

CollapsibleCard.Header = Header;
CollapsibleCard.Body = Body;

export default CollapsibleCard;
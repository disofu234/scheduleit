import { createContext, useContext, useState } from 'react';

const CollapsedContext = createContext();

const CollapsedProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapsed = () => setIsCollapsed(!isCollapsed);

  const value = { isCollapsed, toggleCollapsed };

  return <CollapsedContext.Provider value={value}>{children}</CollapsedContext.Provider>;
};

const useCollapsedContext = () => {
  const context = useContext(CollapsedContext);

  if(context === undefined) {
    throw new Error('useCollapsibleCardContext')
  };

  return context;
};

export {CollapsedProvider, useCollapsedContext}
import { createContext, useContext } from 'react';

const TimePickerContext = createContext();

const useTimePickerContext = () => {
  const context = useContext(TimePickerContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  };
  return context;
}

export { TimePickerContext, useTimePickerContext };

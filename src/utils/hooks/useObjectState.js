import { useState } from "react";

const useObjectState = (obj) => {
  const [objState, setObjState] = useState(obj);

  const newSetObjState = (newObjState) => {
    setObjState({ ...objState, ...newObjState });
  };

  return [objState, newSetObjState];
};

export default useObjectState;
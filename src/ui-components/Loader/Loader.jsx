import React, { useState, useEffect } from 'react';
import {
  Spinner,
  Message
} from 'ui-components';

const Loader = ({ loadFunction, children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorCaught, setErrorCaught] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setErrorCaught(false);
    loadFunction().then(() => {
      setIsLoading(false);
    }).catch(error => {
      console.log(error);
      setErrorCaught(true);
    });
  }, []);

  return (
    <>
      {isLoading ? 
        <Spinner size='large'/>
        : errorCaught ?
          <Message content={'An error occurred'}/>
          : children
      }
    </>
  ); 
}

export default Loader;
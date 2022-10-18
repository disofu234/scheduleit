import React, { useState, useRef } from 'react';
import {
  Button,
  Spinner,
  Message
} from 'ui-components';
import './ButtonWithStatus.scss';

const FAILED_VERIFICATION_MESSAGE = "Verification failed."

const ButtonWithStatus = ({ 
  buttonContent, 
  asyncAction, 
  verifier = () => true,
  onSuccess = () => {},
  errorMessage, 
  successMessage 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const wasClicked = useRef(false);

  const onSuccessfulVerification = () => {
    wasClicked.current = true;
    setIsLoading(true);
    setError(false);
    asyncAction().then(() => {
      setIsLoading(false);
      onSuccess();
    }).catch(error => {
      setError(errorMessage);
      setIsLoading(false);
    });
  }

  const onClick = () => {
    if (verifier()) {
      onSuccessfulVerification();
    } else {
      setError(FAILED_VERIFICATION_MESSAGE);
    };
  };

  return (
    <>
      <div className="status-wrapper">
        {isLoading ?
          <Spinner size="small" /> :
          error ?
            <Message content={error}/> :
            wasClicked.current ?
              (successMessage && <Message content={successMessage} />) :
              null
        }
      </div>
      <Button
        onClick={onClick}
        isDisabled={isLoading}
        content={buttonContent}
      />
    </>
  );
};

export default ButtonWithStatus;
import React, { useState } from 'react'
import './Login.scss'
import { Input, ButtonWithStatus } from 'ui-components'
import useForm from 'utils/hooks/useForm'
import { createParticipant } from './requests'

const formInputs = [{ 
  name: 'username', 
}]

const Login = ({ setCurrentParticipant, eventId, loadEventData }) => {
  const [inputs, inputErrors, onInputChange, verifyInputs] = useForm(formInputs)

  const onLoginButtonClick = async () => {
    const username = inputs.username
    await createParticipant(eventId, username)
    setCurrentParticipant(username)
    await loadEventData()
  }

  return (
    <div>
      <div className="page-title">Login to event</div>
      <div className="input-container">
        <Input 
          label="Username" 
          value={inputs.username}
          onChange={onInputChange('username', e => e.target.value)}
          errorMessage={inputErrors.username}
        />
      </div>
      <div className="login-button-container">
        <ButtonWithStatus 
          buttonContent="Login"
          asyncAction={onLoginButtonClick}
          verifier={verifyInputs}
        />
      </div>
    </div> 
  )
}

export default Login
import React, { useEffect, useState } from 'react';
import {
  ButtonWithStatus,
  Select,
  MultipleTextInput,
  Redirects
} from 'ui-components';
import useForm from 'utils/hooks/useForm';
import {
  TIME_IN_DAY_OPTIONS,
  MINUTE_GRANULARITY_OPTIONS,
} from './utils/constants';
import {
  convertEventTargetValueToInteger,
  getListOfSelectedValues,
  getTenWeeksFromNow
} from './utils/functions';
import { createRoom } from './requests';
import './CreateRoom.scss';

const formInputs = [{ 
  name: 'firstHourInDay', 
}, {
  name: 'lastHourInDay',
}, { 
  name: 'minuteGranularity',
}, {
  name: 'weeks',
},{
  name: 'users',
  defaultValue: []
}];

const CreateRoom = () => {
  const [inputs, inputErrors, onInputChange, verifyInputs, setInputs] = useForm(formInputs);
  const [roomId, setRoomId] = useState('');

  useEffect(() => {
    if (inputs.firstHourInDay >= inputs.lastHourInDay) {
      setInputs({ lastHourInDay: undefined });
    };
  }, [inputs.firstHourInDay]);

  const onCreateRoomButtonClick = async () => {
    const newRoomId = await createRoom(inputs);
    setRoomId(newRoomId);
  };

  return (
    <Redirects to={`/room/${roomId}`} shouldRedirect={roomId}>
      <div className="form-wrapper">
        <PageTitle />
        <Select 
          label="First hour in day" 
          onChange={onInputChange('firstHourInDay', convertEventTargetValueToInteger)} 
          state={inputs.firstHourInDay} 
          placeholder="Select a time" 
          options={TIME_IN_DAY_OPTIONS.slice(0, TIME_IN_DAY_OPTIONS.length - 1)} 
          errorMessage={inputErrors.firstHourInDay}
        />
        <Select 
          label="Last hour in day" 
          onChange={onInputChange('lastHourInDay', convertEventTargetValueToInteger)} 
          state={inputs.lastHourInDay} 
          placeholder="Select a time" 
          options={TIME_IN_DAY_OPTIONS.slice(inputs.firstHourInDay + 1)}
          errorMessage={inputErrors.lastHourInDay}
        />
        <Select 
          label="Minute granularity" 
          onChange={onInputChange('minuteGranularity', convertEventTargetValueToInteger)} 
          state={inputs.minuteGranularity} 
          placeholder="Select a minute granularity" 
          options={MINUTE_GRANULARITY_OPTIONS}
          errorMessage={inputErrors.minuteGranularity}
        />
        <Select
          label="Weeks"
          multiple
          onChange={onInputChange('weeks', getListOfSelectedValues)}
          state={inputs.weeks}
          options={getTenWeeksFromNow().map(week => ({ value: week, content: week }))}
          errorMessage={inputErrors.weeks}
        />
        <MultipleTextInput
          users={inputs.users}
          setUsers={onInputChange('users')}
          label="Users"
          errorMessage={inputErrors.users}
        />
        <ButtonWithStatus 
          buttonContent="Create room"
          asyncAction={onCreateRoomButtonClick}
          verifier={verifyInputs}
          successMessage="Room was successfully created."
        />
      </div>
    </Redirects>
  );
};

const PageTitle = () => <h1 className="page-title">Create Room</h1>;

export default CreateRoom;
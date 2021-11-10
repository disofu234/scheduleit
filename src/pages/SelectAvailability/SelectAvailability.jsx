import React, { useState } from 'react';
import './SelectAvailability.scss';
import { 
  Loader,
  TimePicker,
  ButtonWithStatus,
} from 'ui-components';
import { 
  getRoomMetadata, 
  getAvailability,
  saveAvailability
} from './requests';
import { useParams } from 'react-router-dom';

const SelectAvailability = () => {
  const [roomMetadata, setRoomMetadata] = useState({});
  const [availability, setAvailability] = useState({});

  const { roomId, userId } = useParams();

  const loadData = async () => {
    const loadedRoomMetadata = await getRoomMetadata(roomId);
    const loadedAvailability = await getAvailability(roomId, userId);
    setRoomMetadata(loadedRoomMetadata);
    setAvailability(loadedAvailability);
  };

  return (
    <>
      <Instructions />
      <Loader loadFunction={loadData}>
        <TimePicker 
          selectedTimes={availability}
          setSelectedTimes={setAvailability}
          timeMetadata={roomMetadata}
        />
        <ButtonWithStatus
          buttonContent="Save"
          asyncAction={() => saveAvailability(availability, roomId, userId)}
          errorMessage="An error occurred."
          successMessage="Your availability was saved."
        />
      </Loader>
    </>
  );
};

const Instructions = () =>
  <div className="instructions-wrapper">
    <b className="instructions-text">Your availability has been requested! <br /> Select the times that you're available in the following weeks.</b>
  </div>

export default SelectAvailability;
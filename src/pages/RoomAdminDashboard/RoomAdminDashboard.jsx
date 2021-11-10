import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  Loader,
  CollapsibleCard,
  TimePicker
} from 'ui-components';
import { getRoom } from './requests';
import './RoomAdminDashboard.scss';

const RoomAdminDashboard = () => {
  const [room, setRoom] = useState({});
  const {
    users,
    ...roomMetadata
  } = room;

  const { roomId } = useParams();
  
  const loadRoom = async () => {
    const loadedRoom  = await getRoom(roomId);
    setRoom(loadedRoom);
  };

  return (
    <Loader loadFunction={loadRoom}>
      <UserCards users={users} roomMetadata={roomMetadata} roomId={roomId} />
    </Loader>
  );
};

const UserCards = ({ users, roomMetadata, roomId }) => 
  <>
    {users.map(({ name, email, availability, id }, ind) =>
      <CollapsibleCard key={ind}>
        <CollapsibleCard.Header>
          <h1 className="card-header">{name}</h1>
          <p className="card-text">{email}</p>
          <Link className="card-text" to={`/room/${roomId}/availability/${id}`}>Edit</Link>
        </CollapsibleCard.Header>
        <CollapsibleCard.Body>
          <TimePicker selectedTimes={availability} timeMetadata={roomMetadata} isDisabled/>
        </CollapsibleCard.Body>
      </CollapsibleCard>
    )}
  </>

export default RoomAdminDashboard;
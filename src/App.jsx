import React from 'react';
import 'App.scss';
import CreateRoom from 'pages/CreateRoom';
import SelectAvailability from 'pages/SelectAvailability';
import RoomAdminDashboard from 'pages/RoomAdminDashboard';
import {
  Switch,
  Route
} from 'react-router-dom';

const App = () => 
  <Switch>
    <Route path="/room/:roomId/availability/:userId">
      <SelectAvailability />
    </Route>
    <Route path="/room/:roomId">
      <RoomAdminDashboard />
    </Route>
    <Route path="/">
      <CreateRoom />
    </Route>
  </Switch>

export default App;

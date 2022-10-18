import React from 'react';
import 'App.scss';
import CreateRoom from './pages/CreateRoom';
import LoginAndDashboardEntry from 'pages/LoginAndDashboardEntry'

import {
  Route,
  Switch
} from 'react-router-dom'

const App = () =>
  <>
    <Switch>
      <Route path='/event/:eventId' component={LoginAndDashboardEntry}/>
      <Route path='/' component={CreateRoom}/>
    </Switch>
  </>
  
export default App;

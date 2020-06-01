import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import LoginRegister from './components/auth/LoginRegister';
import Alert from './components/layout/Alert';
import Schedule from './components/schedule/Schedule';
import Dashboard from './components/schedule/Dashboard';

import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';

//show to edit
import EditData from './components/edit-data/EditData';
import Games from './components/edit-data/games/Games';
import Clubs from './components/edit-data/clubs/Clubs';
import Leagues from './components/edit-data/leagues/Leagues';
import Players from './components/edit-data/players/Players';
import PlayersInClub from './components/edit-data/players/PlayersInClub';
// edit
import EditGame from './components/edit-data/games/EditGame';
import EditClub from './components/edit-data/clubs/EditClub';
import EditLeague from './components/edit-data/leagues/EditLeague';

import Game from './components/game/Game';
import Club from './components/club/Club';
import League from './components/league/League';
import Player from './components/player/Player';

import PrivateRoute from './components/routing/PrivateRoute';
import IsStaffRoute from './components/routing/IsStaffRoute';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/loginregister' component={LoginRegister} />
            <Route exact path='/schedule' component={Schedule} />

            <Route exact path='/game/:id' component={Game} />
            <Route exact path='/club/:id' component={Club} />
            <Route exact path='/league/:id' component={League} />
            <Route exact path='/player/:id' component={Player} />

            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/edit-profile' component={EditProfile} />
            <PrivateRoute
              exact
              path='/create-profile'
              component={CreateProfile}
            />

            <IsStaffRoute exact path='/edit-data' component={EditData} />
            <IsStaffRoute exact path='/edit-data/games' component={Games} />
            <IsStaffRoute exact path='/edit-data/clubs' component={Clubs} />
            <IsStaffRoute exact path='/edit-data/players' component={Players} />
            <IsStaffRoute
              exact
              path='/edit-data/playersInClub'
              component={PlayersInClub}
            />
            <IsStaffRoute exact path='/edit-data/leagues' component={Leagues} />
            <IsStaffRoute exact path='/edit-game' component={EditGame} />
            <IsStaffRoute exact path='/edit-club' component={EditClub} />
            <IsStaffRoute exact path='/edit-league' component={EditLeague} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;

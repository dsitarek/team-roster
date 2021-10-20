import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Roster from '../components/Roster';
import CreatePlayer from '../components/CreatePlayer';

export default function Router({
  players, setPlayers, playerObj, setEditItem,
}) {
  return (
    <Switch>
      <Route exact path="/">
        <Roster players={players} />
      </Route>
      <Route path="/addPlayer">
        <CreatePlayer player={playerObj} setPlayers={setPlayers} setEditItem={setEditItem} />
      </Route>
    </Switch>
  );
}

Router.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setPlayers: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
  playerObj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    position: PropTypes.string,
    imageURL: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};

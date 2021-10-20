import React from 'react';
import PropTypes from 'prop-types';
import Player from './Player';

export default function Roster({ players, setEditItem, setPlayers }) {
  return (
    <div className="roster">
      <h1>My Team Roster</h1>
      <div className="card-container">
        {players.map((player) => <Player key={player.firebaseKey} player={player} setEditItem={setEditItem} setPlayers={setPlayers} />)}
      </div>
    </div>
  );
}

Roster.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setEditItem: PropTypes.func.isRequired,
  setPlayers: PropTypes.func.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import Player from './Player';

export default function Roster({ players }) {
  return (
    <div className="roster">
      <h1>Team</h1>
      {players.map((player) => <Player key={player.firebaseKey} player={player} />)}
    </div>
  );
}

Roster.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

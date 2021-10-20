import React from 'react';
import PropTypes from 'prop-types';

export default function Player({ player }) {
  return (
    <div className="player-card">
      <img src={player.imageURL} className="player-img" alt={player.name} />
      <div className="card-body">
        <h5 className="card-title">{player.name}</h5>
        <h6 className="card-text">{player.position}</h6>
      </div>
    </div>
  );
}

Player.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    imageURL: PropTypes.string,
    position: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};

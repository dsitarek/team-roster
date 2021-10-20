import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { deletePlayer } from '../data/playerData';

export default function Player({ player, setEditItem, setPlayers }) {
  const history = useHistory();

  const handleUpdate = () => {
    setEditItem(player);
    history.push('/playerForm');
  };

  const handleDelete = () => {
    deletePlayer(player.firebaseKey, player.uid).then((players) => {
      setPlayers(players);
    });
  };

  return (
    <div className="player-card">
      <img src={player.imageURL} className="player-img" alt={player.name} />
      <div className="card-body">
        <h5 className="card-title">{player.name}</h5>
        <h6 className="card-text">{player.position}</h6>
        <button type="button" className="btn btn-success" onClick={handleUpdate}>Edit</button>
        <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
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
    firebaseKey: PropTypes.string,
  }).isRequired,
  setEditItem: PropTypes.func.isRequired,
  setPlayers: PropTypes.func.isRequired,
};

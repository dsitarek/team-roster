import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { deletePlayer } from '../data/playerData';
import { getStats } from '../data/nhlData';
import flip from '../assets/flip.png';

const initialState = {
  fullName: '',
  primaryNumber: '',
  birthCity: '',
  birthStateProvince: '',
  birthCountry: '',
  birthDate: '',
  height: '',
  weight: '',
  active: '',
  shootsCatches: '',
  primaryPosition: '',
  currentTeam: '',
  captain: '',
  alternateCaptain: '',
};

export default function Player({ player, setEditItem, setPlayers }) {
  const history = useHistory();
  const [stats, setStats] = useState(initialState);

  useEffect(() => {
    getStats(player.personId).then((data) => setStats(data));
  }, []);

  const handleUpdate = () => {
    setEditItem(player);
    history.push('/new');
  };

  const handleDelete = () => {
    deletePlayer(player.firebaseKey, player.uid).then((players) => {
      setPlayers(players);
    });
  };

  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="player-card">
          <img src={player.imageURL} className="player-img" alt={player.name} />
          <div className="card-body">
            <h5 className="card-title">{player.name}</h5>
            <h6 className="card-text">{player.position}</h6>
            <button type="button" className="btn btn-success" onClick={handleUpdate}>Edit</button>
            <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
            <img className="flip" src={flip} alt="flip" />
          </div>
        </div>
        <div className="player-card-back">
          <ul className="player-stats-list">
            <li><span className="stats-text">#{stats.primaryNumber}</span></li>
            <li><span className="stats-text">Name:</span> {stats.fullName}</li>
            <li><span className="stats-text">Birthdate:</span> {new Date(stats.birthDate).toLocaleDateString('en-US')}</li>
            <li><span className="stats-text">Origin:</span> {stats.birthCity}, {stats.birthStateProvince}{stats.birthStateProvince ? ', ' : ''}{stats.birthCountry}</li>
            <li><span className="stats-text">Height:</span> {stats.height}</li>
            <li><span className="stats-text">Weight:</span> {stats.weight}lbs</li>
            <li><span className="stats-text">Active:</span> {stats.active ? 'Yes' : 'No'}</li>
            <li><span className="stats-text">Shoots/Catches:</span> {(stats.shootsCatches).startsWith('R') ? 'Right' : 'Left'}</li>
            <li><span className="stats-text">Position:</span> {stats.primaryPosition.name}</li>
            <li><span className="stats-text">Team:</span> {stats.currentTeam.name}</li>
            <li>{stats.captain ? 'Captain' : ''}{stats.alternateCaptain ? 'Alternate' : ''}</li>
          </ul>
        </div>
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
    personId: PropTypes.string,
  }).isRequired,
  setEditItem: PropTypes.func.isRequired,
  setPlayers: PropTypes.func.isRequired,
};

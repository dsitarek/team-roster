import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPlayer, updatePlayer } from '../data/playerData';
import { getTeams, getRoster } from '../data/nhlData';

const initialState = {
  name: '',
  position: '',
  imageURL: '',
};

export default function CreatePlayer({
  player, setPlayers, uid, setEditItem,
}) {
  const [formInput, setFormInput] = useState(initialState);
  const [teams, setTeams] = useState([]);
  const [playerInput, setPlayerInput] = useState('');

  useEffect(() => {
    getTeams().then((data) => setTeams(data));
  }, []);

  useEffect(() => {
    if (player.firebaseKey) {
      setFormInput({
        name: `${player.name}-${player.personId}`,
        firebaseKey: player.firebaseKey,
        position: player.position,
        imageURL: player.imageURL,
        uid: player.uid,
        team: player.team,
      });
    }
  }, [player]);

  useEffect(async () => {
    if (formInput.team) {
      const people = await getRoster(formInput.team);
      setPlayerInput(people);
    }
  }, [formInput]);

  const handleChange = (e) => {
    setFormInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setFormInput(initialState);
    setEditItem(initialState);
  };

  const handleSubmit = (e) => {
    const objFbKey = (player.firebaseKey || '');
    const personId = (formInput.name).split('-')[1];
    const fbObj = {
      name: (formInput.name).split('-')[0],
      firebaseKey: objFbKey,
      position: formInput.position,
      imageURL: `https://nhl.bamcontent.com/images/headshots/current/168x168/${personId}.jpg`,
      uid,
      personId,
      team: formInput.team,
    };
    e.preventDefault();
    if (player.firebaseKey) {
      updatePlayer(player.firebaseKey, fbObj).then((players) => {
        setPlayers(players);
        resetForm();
      });
    } else {
      createPlayer(fbObj).then((players) => {
        setPlayers(players);
        resetForm();
      });
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="player-form">
        <label>Team:
          <select className="form-select" aria-label="Default select example" id="team" name="team" value={formInput.team} onChange={handleChange} required>
            <option value="">Select Team</option>
            {teams.map((team) => <option key={`team-${team.id}`} value={team.id || ''}>{team.name}</option>)}
          </select>
        </label>
        <label>Player Name:
          <select className="form-select" aria-label="Default select example" id="name" name="name" value={formInput.name} onChange={handleChange} disabled={!formInput.team} required>
            <option value="">Select Player</option>
            {playerInput ? playerInput.map((person) => <option key={`player-${person.id}`} value={`${person.name}-${person.id}` || ''}>{person.name}</option>) : ''}
          </select>
        </label>
        <label>Position:
          <select className="form-select" aria-label="Default select example" id="position" name="position" value={formInput.position || ''} onChange={handleChange} required>
            <option value="">Select Position</option>
            <option value="Center">Center</option>
            <option value="Left Wing">Left Wing</option>
            <option value="Right Wing">Right Wing</option>
            <option value="Defenseman">Defenseman</option>
            <option value="Goaltender">Goaltender</option>
          </select>
        </label>
        <button type="submit" className="btn btn-success">{player.firebaseKey ? 'Update' : 'Submit'}</button>
      </form>
    </div>
  );
}

CreatePlayer.defaultProps = { player: {} };

CreatePlayer.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    position: PropTypes.string,
    imageURL: PropTypes.string,
    uid: PropTypes.string,
    team: PropTypes.string,
    personId: PropTypes.string,
  }),
  setPlayers: PropTypes.func.isRequired,
  uid: PropTypes.string.isRequired,
  setEditItem: PropTypes.func.isRequired,
};

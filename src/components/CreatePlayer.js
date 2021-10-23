import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPlayer, updatePlayer } from '../data/playerData';
import { getTeams, getRoster } from '../data/nhlData';

const playerImgURL = 'https://nhl.bamcontent.com/images/headshots/current/168x168';

const initialState = {
  name: '',
  position: '',
  imageURL: '',
  playerId: '',
  team: '',
};

export default function CreatePlayer({
  player, setPlayers, uid, setEditItem,
}) {
  const [formInput, setFormInput] = useState(initialState);
  const [teams, setTeams] = useState([]);
  const [playerInput, setPlayerInput] = useState('');
  const [submitted, setSubmitted] = useState('');

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
    let people = [];
    if (formInput.team) {
      people = await getRoster(formInput.team);
      setPlayerInput(people);
    }
    if (formInput.name) {
      const playerInfo = people.find((playerObj) => (playerObj.id).toString() === ((formInput.name).split('-')[1]));
      setFormInput((prevState) => ({
        ...prevState, position: playerInfo.position, playerNumber: playerInfo.playerNumber, playerId: playerInfo.id,
      }));
    }
  }, [formInput]);

  const handleChange = (e) => {
    setFormInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setFormInput(initialState);
    setEditItem(initialState);
  };

  const handleSubmitMessage = () => {
    setSubmitted(player.firebaseKey ? 'Player Updated!' : 'Player added to roster!');
    setTimeout(() => (setSubmitted('')), 1500);
  };

  const handleSubmit = (e) => {
    const objFbKey = (player.firebaseKey || '');
    const personId = (formInput.name).split('-')[1];
    const fbObj = {
      name: (formInput.name).split('-')[0],
      firebaseKey: objFbKey,
      position: formInput.position,
      imageURL: `${playerImgURL}/${personId}.jpg`,
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
    handleSubmitMessage();
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="player-form">
        <div className="form-body">
          <div className="form-input-container">
            <span className="form-message">{submitted}</span>
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
            <button type="submit" className="btn btn-success">{player.firebaseKey ? 'Update' : 'Submit'}</button>
          </div>
          {formInput.playerId ? (
            <div className="player-form-info-container">
              <img src={`${playerImgURL}/${formInput.playerId}.jpg`} alt="player" />
              <h6>Position: {formInput.position} <br /> Player Number: {formInput.playerNumber}</h6>
            </div>
          ) : ''}
        </div>
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

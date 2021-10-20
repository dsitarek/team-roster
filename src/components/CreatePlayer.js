import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPlayer, updatePlayer } from '../api/data/playerData';

const initialState = {
  name: '',
  position: '',
  imageURL: '',
  uid: '',
};

export default function CreatePlayer({ player, setPlayers }) {
  const [formInput, setFormInput] = useState(initialState);

  useEffect(() => {
    if (player.firebaseKey) {
      setFormInput({
        name: player.name,
        firebaseKey: player.firebaseKey,
        position: player.position,
        imageURL: player.imageURL,
        uid: player.uid,
      });
    }
  }, [player]);

  const handleChange = (e) => {
    setFormInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setFormInput(initialState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (player.firebaseKey) {
      updatePlayer(player.firebaseKey, formInput).then((players) => {
        setPlayers(players);
        resetForm();
      });
    } else {
      createPlayer(formInput).then((players) => {
        setPlayers(players);
        resetForm();
      });
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="player-form">
        <label>Player Name:
          <input type="text" id="nameInput" name="name" value={formInput.name} onChange={handleChange} required />
        </label>
        <label>Image URL:
          <input type="text" id="ImageURL" name="imageURL" value={formInput.imageURL} onChange={handleChange} required />
        </label>
        <label>Position:
          <select className="form-select" aria-label="Default select example" id="position" name="position" value={formInput.position} onChange={handleChange} required>
            <option selected value={formInput.position || ''}>{formInput.position || 'Select Position'}</option>
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
  }),
  setPlayers: PropTypes.func.isRequired,
};

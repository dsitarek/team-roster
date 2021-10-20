import axios from 'axios';
import firebaseConfig from '../apiKeys';

const fbUrl = firebaseConfig.databaseURL;

const getPlayers = async () => {
  const players = await axios.get(`${fbUrl}/players.json`);
  const playerData = Object.values(players.data);
  return playerData;
};

const createPlayer = (playerObj) => new Promise((resolve, reject) => {
  axios.post(`${fbUrl}/players.json`, playerObj).then((obj) => {
    const fbKey = { firebaseKey: obj.data.name };
    axios.patch(`${fbUrl}/players/${obj.data.name}.json`, fbKey)
      .then(() => {
        getPlayers().then(resolve);
      });
  }).catch(reject);
});

const deletePlayer = (fbKey) => new Promise((resolve, reject) => {
  axios.delete(`${fbUrl}/players/${fbKey}.json`)
    .then(() => getPlayers().then(resolve))
    .catch(reject);
});

const updatePlayer = (fbKey, updateObj) => new Promise((resolve, reject) => {
  axios.patch(`${fbUrl}/players/${fbKey}.json`, updateObj)
    .then(() => getPlayers().then(resolve))
    .catch(reject);
});

export {
  getPlayers, updatePlayer, deletePlayer, createPlayer,
};

import axios from 'axios';

const nhlApi = 'https://statsapi.web.nhl.com/api/v1';

const getTeams = async () => {
  const teamArr = [];
  const teamData = await axios.get(`${nhlApi}/teams`);
  teamData.data.teams.forEach((team) => teamArr.push({
    name: team.name,
    id: team.id,
  }));
  return teamArr;
};

const getRoster = async (teamId) => {
  const playerArr = [];
  const team = await axios.get(`${nhlApi}/teams/${teamId}/roster`);
  team.data.roster.map((player) => playerArr.push({
    name: player.person.fullName,
    id: player.person.id,
    position: player.position.name,
    playerNumber: player.jerseyNumber,
  }));
  return playerArr;
};

const getStats = async (playerId) => {
  const stats = await axios.get(`${nhlApi}/people/${playerId}`);
  return (stats.data.people)[0];
};

export { getTeams, getRoster, getStats };

# Hockey Roster [![Netlify Status](https://api.netlify.com/api/v1/badges/1a52e6d7-b7e9-4539-ba6f-8ba57c467987/deploy-status)](https://app.netlify.com/sites/djs-hockey-roster/deploys)

[Deployed Site](https://djs-hockey-roster.netlify.app/)

## Features
- Login to your user specific roster
- Add players to your roster by clicking "Add Player to Roster" then selecting a team, then a player. The team and player information will be pulled in from NHL's API.
- On the "Home" page you can view the players on your roster and flip each player card to view player information by clicking and holding.
- Edit players on your roster by clicking "Edit" on that player
- Delete players from your roster by clicking "Delete" on that player

## Technical Flowchart
![Flowchart (2)](https://user-images.githubusercontent.com/82732748/138542052-d6d76b71-d87d-451f-8ec4-c55303caa8a6.jpg)

## Code Snippet
```
 useEffect(async () => {
    let people = [];
    if (formInput.team) {
      people = await getRoster(formInput.team);
      setPlayerInput(people);
    } if (formInput.name && formInput.team) {
      const playerInfo = people.find((playerObj) => (playerObj.id).toString() === ((formInput.name).split('-')[1])) || initialState;
      setFormInput((prevState) => ({
        ...prevState, position: playerInfo.position, playerNumber: playerInfo.playerNumber, playerId: playerInfo.id,
      }));
    }
  }, [formInput]);
  ```

## Images
![teamrosterwf](https://user-images.githubusercontent.com/82732748/138539067-8e6292a6-e8e0-4dc7-9858-cdf1fa9b4e5d.png)

![teamrosterwf2](https://user-images.githubusercontent.com/82732748/138539142-b851e1cc-b595-45e7-97c2-42b430381b86.png)

## Project Board
[Project Board](https://github.com/dsitarek/team-roster/projects/1)

## Contributors
[Daniel Sitarek](https://github.com/dsitarek)


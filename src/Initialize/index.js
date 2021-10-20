import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import SignIn from '../views/SignIn';
import 'firebase/auth';
import { getPlayers } from '../api/data/playerData';
import Router from '../routes';
import AppNavbar from '../components/Navbar';

function Initialize() {
  const [user, setUser] = useState(null);
  const [players, setPlayers] = useState([]);
  const [editItem, setEditItem] = useState({});

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userInfoObj = {
          fullName: authed.displayName,
          profileImage: authed.photoURL,
          uid: authed.uid,
          user: authed.email.split('@')[0],
        };
        setUser(userInfoObj);
        getPlayers().then(setPlayers);
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);

  return (
    <div className="App">
      {user ? (
        <>
          <AppNavbar user={user} />
          <Router players={players} setPlayers={setPlayers} playerObj={editItem} setEditItem={setEditItem} />
        </>
      ) : (<SignIn />)}
    </div>
  );
}

export default Initialize;

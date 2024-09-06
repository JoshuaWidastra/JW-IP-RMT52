import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import MoodJournal from '../components/MoodJournal';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.displayName}</h1>
      <MoodJournal />
    </div>
  );
}

export default Profile;
'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';

export function useHighscore(user: User | null) {
  const [reflexHighscore, setReflexHighscore] = useState<number>(0);
  const [sequenceHighscore, setSequenceHighscore] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchHighscores() {
      if (!user) {
        setReflexHighscore(0);
        setSequenceHighscore(0);
        return;
      }
      setLoading(true);
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setReflexHighscore(data.reflex_highscore || 0);
          setSequenceHighscore(data.sequence_highscore || 0);
        }
      } catch (err) {
        console.error("Failed to fetch highscores", err);
      } finally {
        setLoading(false);
      }
    }
    fetchHighscores();
  }, [user]);

  const updateReflexHighscore = async (newScore: number) => {
    if (!user) return false;
    if (newScore > reflexHighscore) {
      setReflexHighscore(newScore);
      try {
        const docRef = doc(db, 'users', user.uid);
        await setDoc(docRef, { reflex_highscore: newScore }, { merge: true });
        return true; 
      } catch (e) {
        console.error(e);
      }
    }
    return false;
  };

  const updateSequenceHighscore = async (newScore: number) => {
    if (!user) return false;
    if (newScore > sequenceHighscore) {
      setSequenceHighscore(newScore);
      try {
        const docRef = doc(db, 'users', user.uid);
        await setDoc(docRef, { sequence_highscore: newScore }, { merge: true });
        return true; 
      } catch (e) {
        console.error(e);
      }
    }
    return false;
  };

  return {
    reflexHighscore,
    sequenceHighscore,
    updateReflexHighscore,
    updateSequenceHighscore,
    loading
  };
}

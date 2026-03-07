import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { rtdb } from '../lib/firebase';

export const useRealtimeDB = (path, isList = false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!path) return;

    const dbRef = ref(rtdb, path);

    const unsubscribe = onValue(dbRef, (snapshot) => {
      try {
        const val = snapshot.val();
        
        if (isList && val) {
          const transformed = Object.entries(val).map(([id, values]) => ({
            id,
            ...(typeof values === 'object' ? values : { value: values })
          }));
          setData(transformed);
        } else {
          setData(val);
        }
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }, (err) => {
      setError(err.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [path, isList]);

  return { data, loading, error };
};
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Simple progress page: counts completed tasks and displays a fake point system.
export default function ProgressScreen() {
  const [completed, setCompleted] = useState(0);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const q = query(collection(db, 'tasks'));
    const unsub = onSnapshot(q, snapshot => {
      const tasks = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      const done = tasks.filter(t => t.done).length;
      setCompleted(done);
      setPoints(done * 10);
    });
    return () => unsub();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Progress</Text>
      <View style={styles.card}><Text style={styles.kpi}>{completed}</Text><Text>Tasks Done</Text></View>
      <View style={styles.card}><Text style={styles.kpi}>{points}</Text><Text>Points</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 48 },
  heading: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  card: { backgroundColor: 'white', padding: 18, borderRadius: 12, marginBottom: 12, alignItems: 'center' },
  kpi: { fontSize: 36, fontWeight: '800' }
});

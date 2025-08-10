import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function ReviewScreen() {
  const [doneCount, setDoneCount] = useState(0);
  const [timeFocused, setTimeFocused] = useState(0);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'tasks'), snapshot => {
      const tasks = snapshot.docs.map(d => d.data());
      const done = tasks.filter(t => t.done).length;
      const minutes = tasks.reduce((acc, t) => acc + (t.done ? (t.duration || 0) : 0), 0);
      setDoneCount(done);
      setTimeFocused(minutes);
    });
    return () => unsub();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Daily Review</Text>
      <View style={styles.panel}><Text style={styles.panelTitle}>Tasks Done</Text><Text style={styles.big}>{doneCount}</Text></View>
      <View style={styles.panel}><Text style={styles.panelTitle}>Time Focused</Text><Text style={styles.big}>{timeFocused} min</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 48 },
  heading: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  panel: { backgroundColor: 'white', padding: 18, borderRadius: 12, marginBottom: 12 },
  panelTitle: { fontSize: 14, color: '#6b7280' },
  big: { fontSize: 28, fontWeight: '800', marginTop: 8 }
});

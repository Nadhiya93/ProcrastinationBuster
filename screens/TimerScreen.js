import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import usePomodoro from '../utils/usePomodoro';

export default function TimerScreen() {
  const { secondsLeft, running, start, pause, reset, formatted } = usePomodoro(25 * 60);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Focus Timer</Text>
      <View style={styles.circle}>
        <Text style={styles.time}>{formatted}</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        {!running ? (
          <TouchableOpacity style={styles.btnPrimary} onPress={start}><Text style={{ color: 'white' }}>Start</Text></TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.btnAlt} onPress={pause}><Text>Pause</Text></TouchableOpacity>
        )}
        <TouchableOpacity style={[styles.btnAlt, { marginLeft: 12 }]} onPress={reset}><Text>Reset</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 48, alignItems: 'center' },
  heading: { fontSize: 22, fontWeight: '700' },
  circle: { width: 240, height: 240, borderRadius: 120, borderWidth: 6, borderColor: '#e5e7eb', justifyContent: 'center', alignItems: 'center', marginTop: 24 },
  time: { fontSize: 44, fontWeight: '700' },
  btnPrimary: { backgroundColor: '#4f46e5', padding: 12, borderRadius: 8 },
  btnAlt: { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#e5e7eb' }
});

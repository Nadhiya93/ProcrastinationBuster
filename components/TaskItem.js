import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={onToggle} style={[styles.checkbox, task.done && styles.checked]}>
        {task.done && <Text style={{ color: 'white' }}>✓</Text>}
      </TouchableOpacity>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={[styles.title, task.done && { textDecorationLine: 'line-through', color: '#6b7280' }]}>{task.title}</Text>
        <Text style={styles.meta}>{task.duration} min • {task.priority}</Text>
      </View>
      <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}><Text>🗑️</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', padding: 12, marginBottom: 8, backgroundColor: '#fff', borderRadius: 8, elevation: 1 },
  checkbox: { width: 28, height: 28, borderRadius: 6, borderWidth: 1, borderColor: '#9ca3af', alignItems: 'center', justifyContent: 'center' },
  checked: { backgroundColor: '#4f46e5', borderColor: '#4f46e5' },
  title: { fontSize: 16, fontWeight: '600' },
  meta: { fontSize: 12, color: '#6b7280' },
  deleteBtn: { padding: 8 }
});

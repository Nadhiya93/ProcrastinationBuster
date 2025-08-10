import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function AddTaskModal({ visible, onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('15');

  const submit = () => {
    if (!title.trim()) return;
    onSubmit(title.trim(), parseInt(duration || '15', 10));
    setTitle('');
    setDuration('15');
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <Text style={{ fontSize: 18, fontWeight: '700' }}>Add Task</Text>
          <TextInput placeholder="Task title" value={title} onChangeText={setTitle} style={styles.input} />
          <TextInput placeholder="Duration (minutes)" keyboardType="numeric" value={duration} onChangeText={setDuration} style={styles.input} />

          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TouchableOpacity onPress={onClose} style={styles.btnAlt}><Text>Cancel</Text></TouchableOpacity>
            <TouchableOpacity onPress={submit} style={styles.btn}><Text style={{ color: 'white' }}>Add</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)' },
  sheet: { backgroundColor: 'white', padding: 16, borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  input: { borderWidth: 1, borderColor: '#e5e7eb', padding: 10, borderRadius: 8, marginTop: 12 },
  btn: { backgroundColor: '#4f46e5', padding: 12, borderRadius: 8, marginLeft: 8 },
  btnAlt: { padding: 12, borderRadius: 8, marginRight: 8 }
});

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import { collection, addDoc, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import TaskItem from '../components/TaskItem';
import AddTaskModal from '../components/AddTaskModal';

export default function HomeScreen() {
  const [tasks, setTasks] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snapshot => {
      const arr = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(arr);
    });
    return () => unsub();
  }, []);

  const addTask = async (title, duration = 15, priority = 'Medium') => {
    try {
      await addDoc(collection(db, 'tasks'), {
        title,
        duration,
        priority,
        done: false,
        createdAt: new Date()
      });
      setShowAdd(false);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleDone = async (task) => {
    const ref = doc(db, 'tasks', task.id);
    await updateDoc(ref, { done: !task.done });
  };

  const removeTask = async (taskId) => {
    await deleteDoc(doc(db, 'tasks', taskId));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Today's Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={() => toggleDone(item)} onDelete={() => removeTask(item.id)} />
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No tasks yet — add one!</Text>}
      />
      <TouchableOpacity style={styles.addBtn} onPress={() => setShowAdd(true)}>
        <Text style={{ color: 'white', fontSize: 18 }}>＋</Text>
      </TouchableOpacity>

      <AddTaskModal visible={showAdd} onClose={() => setShowAdd(false)} onSubmit={addTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 48 },
  heading: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  addBtn: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  }
});

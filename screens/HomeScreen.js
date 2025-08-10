import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Alert } from 'react-native';
import { collection, addDoc, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import TaskItem from '../components/TaskItem';
import AddTaskModal from '../components/AddTaskModal';

export default function HomeScreen() {
  const [tasks, setTasks] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const [timeTracking, setTimeTracking] = useState({});

  useEffect(() => {
    const q = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snapshot => {
      const arr = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(arr);
    });
    return () => unsub();
  }, []);

  // Check for overdue tasks every minute
  useEffect(() => {
    const interval = setInterval(() => {
      checkOverdueTasks();
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [tasks]);

  const checkOverdueTasks = () => {
    const now = new Date();
    const overdueTasks = tasks.filter(task => {
      if (!task.endTime || task.done) return false;
      return new Date(task.endTime) < now;
    });

    overdueTasks.forEach(task => {
      if (!timeTracking[task.id]?.alerted) {
        Alert.alert(
          'Task Overdue!',
          `"${task.title}" was due at ${new Date(task.endTime).toLocaleTimeString()}. Where are you on this task?`,
          [
            { text: 'Still Working', onPress: () => extendTaskTime(task) },
            { text: 'Mark Complete', onPress: () => toggleDone(task) },
            { text: 'Dismiss', style: 'cancel' }
          ]
        );
        
        setTimeTracking(prev => ({
          ...prev,
          [task.id]: { ...prev[task.id], alerted: true }
        }));
      }
    });
  };

  const extendTaskTime = async (task) => {
    const newEndTime = new Date(Date.now() + 30 * 60000); // Add 30 minutes
    const ref = doc(db, 'tasks', task.id);
    await updateDoc(ref, { 
      endTime: newEndTime.toISOString(),
      extended: true 
    });
    
    Alert.alert('Time Extended', 'Task time has been extended by 30 minutes.');
  };

  const addTask = async (taskData) => {
    try {
      await addDoc(collection(db, 'tasks'), {
        ...taskData,
        done: false,
        createdAt: new Date(),
        extended: false
      });
      setShowAdd(false);
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Failed to add task. Please try again.');
    }
  };

  const toggleDone = async (task) => {
    const ref = doc(db, 'tasks', task.id);
    await updateDoc(ref, { done: !task.done });
    
    if (!task.done) {
      // Task completed
      setTimeTracking(prev => ({
        ...prev,
        [task.id]: { ...prev[task.id], completed: true }
      }));
    }
  };

  const removeTask = async (taskId) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            await deleteDoc(doc(db, 'tasks', taskId));
          }
        }
      ]
    );
  };

  const startTask = (task) => {
    setActiveTask(task);
    setTimeTracking(prev => ({
      ...prev,
      [task.id]: { 
        ...prev[task.id], 
        started: true, 
        startTime: Date.now() 
      }
    }));
    
    Alert.alert(
      'Task Started',
      `You're now working on "${task.title}". Stay focused!`,
      [{ text: 'Got it!' }]
    );
  };

  const getOverdueCount = () => {
    const now = new Date();
    return tasks.filter(task => {
      if (!task.endTime || task.done) return false;
      return new Date(task.endTime) < now;
    }).length;
  };

  const getUpcomingTasks = () => {
    const now = new Date();
    const inNextHour = new Date(now.getTime() + 60 * 60000);
    
    return tasks.filter(task => {
      if (!task.startTime || task.done) return false;
      const startTime = new Date(task.startTime);
      return startTime >= now && startTime <= inNextHour;
    });
  };

  const overdueCount = getOverdueCount();
  const upcomingTasks = getUpcomingTasks();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Today's Tasks</Text>
      
      {/* Status Summary */}
      <View style={styles.statusContainer}>
        {overdueCount > 0 && (
          <View style={styles.overdueAlert}>
            <Text style={styles.overdueText}>⚠️ {overdueCount} overdue task(s)</Text>
          </View>
        )}
        
        {upcomingTasks.length > 0 && (
          <View style={styles.upcomingAlert}>
            <Text style={styles.upcomingText}>⏰ {upcomingTasks.length} upcoming task(s)</Text>
          </View>
        )}
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TaskItem 
            task={item} 
            onToggle={() => toggleDone(item)} 
            onDelete={() => removeTask(item.id)}
            onStartTask={startTask}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tasks yet — add one!</Text>
        }
      />
      
      <TouchableOpacity style={styles.addBtn} onPress={() => setShowAdd(true)}>
        <Text style={{ color: 'white', fontSize: 18 }}>＋</Text>
      </TouchableOpacity>

      <AddTaskModal 
        visible={showAdd} 
        onClose={() => setShowAdd(false)} 
        onSubmit={addTask} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    paddingTop: 48 
  },
  heading: { 
    fontSize: 22, 
    fontWeight: '700', 
    marginBottom: 12 
  },
  statusContainer: {
    marginBottom: 16
  },
  overdueAlert: {
    backgroundColor: '#fee2e2',
    padding: 8,
    borderRadius: 6,
    marginBottom: 4
  },
  overdueText: {
    color: '#dc2626',
    fontSize: 14,
    fontWeight: '600'
  },
  upcomingAlert: {
    backgroundColor: '#dbeafe',
    padding: 8,
    borderRadius: 6
  },
  upcomingText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '600'
  },
  emptyText: { 
    textAlign: 'center', 
    marginTop: 20,
    color: '#6b7280',
    fontSize: 16
  },
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

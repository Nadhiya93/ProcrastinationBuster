import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function TaskItem({ task, onToggle, onDelete, onStartTask, onCompleteTask }) {
  const formatTime = (date) => {
    if (!date) return 'Not set';
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  };

  const isOverdue = () => {
    if (!task.endTime || task.done) return false;
    return new Date() > new Date(task.endTime);
  };

  const getTimeStatus = () => {
    if (!task.startTime || !task.endTime) return null;
    
    const now = new Date();
    const start = new Date(task.startTime);
    const end = new Date(task.endTime);
    
    if (now < start) {
      return { status: 'pending', text: 'Not started yet' };
    } else if (now >= start && now <= end) {
      return { status: 'active', text: 'In progress' };
    } else if (now > end && !task.done) {
      return { status: 'overdue', text: 'Overdue!' };
    } else if (task.done) {
      return { status: 'completed', text: 'Completed' };
    }
    return null;
  };

  const handleStartTask = () => {
    if (!task.startTime) {
      Alert.alert(
        'Set Start Time',
        'Please set a start time for this task first.',
        [{ text: 'OK' }]
      );
      return;
    }
    onStartTask(task);
  };

  const timeStatus = getTimeStatus();

  return (
    <View style={[styles.row, isOverdue() && styles.overdueRow]}>
      <TouchableOpacity onPress={onToggle} style={[styles.checkbox, task.done && styles.checked]}>
        {task.done && <Text style={{ color: 'white' }}>✓</Text>}
      </TouchableOpacity>
      
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={[styles.title, task.done && { textDecorationLine: 'line-through', color: '#6b7280' }]}>
          {task.title}
        </Text>
        
        <Text style={styles.meta}>
          {task.duration} min • {task.priority}
        </Text>
        
        {/* Time Information */}
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>
            Start: {formatTime(task.startTime)} {formatDate(task.startTime)}
          </Text>
          <Text style={styles.timeText}>
            End: {formatTime(task.endTime)} {formatDate(task.endTime)}
          </Text>
        </View>
        
        {/* Time Status */}
        {timeStatus && (
          <View style={[styles.statusBadge, styles[`status_${timeStatus.status}`]]}>
            <Text style={styles.statusText}>{timeStatus.text}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.actionButtons}>
        {!task.done && task.startTime && (
          <TouchableOpacity onPress={handleStartTask} style={styles.startBtn}>
            <Text style={styles.startBtnText}>▶</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
          <Text>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 12, 
    marginBottom: 8, 
    backgroundColor: '#fff', 
    borderRadius: 8, 
    elevation: 1 
  },
  overdueRow: {
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
    backgroundColor: '#fef2f2'
  },
  checkbox: { 
    width: 28, 
    height: 28, 
    borderRadius: 6, 
    borderWidth: 1, 
    borderColor: '#9ca3af', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  checked: { 
    backgroundColor: '#4f46e5', 
    borderColor: '#4f46e5' 
  },
  title: { 
    fontSize: 16, 
    fontWeight: '600' 
  },
  meta: { 
    fontSize: 12, 
    color: '#6b7280',
    marginTop: 2
  },
  timeContainer: {
    marginTop: 4
  },
  timeText: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 1
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginTop: 4,
    alignSelf: 'flex-start'
  },
  status_pending: {
    backgroundColor: '#fef3c7',
  },
  status_active: {
    backgroundColor: '#dbeafe',
  },
  status_overdue: {
    backgroundColor: '#fee2e2',
  },
  status_completed: {
    backgroundColor: '#d1fae5',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600'
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  startBtn: {
    padding: 8,
    marginRight: 4,
    backgroundColor: '#10b981',
    borderRadius: 6
  },
  startBtnText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
  },
  deleteBtn: { 
    padding: 8 
  }
});

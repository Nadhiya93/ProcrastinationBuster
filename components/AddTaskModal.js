import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddTaskModal({ visible, onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('15');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date(Date.now() + 15 * 60000)); // 15 minutes from now
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString();
  };

  const handleStartTimeChange = (event, selectedDate) => {
    setShowStartPicker(false);
    if (selectedDate) {
      setStartTime(selectedDate);
      // Auto-calculate end time based on duration
      const endDate = new Date(selectedDate.getTime() + parseInt(duration) * 60000);
      setEndTime(endDate);
    }
  };

  const handleEndTimeChange = (event, selectedDate) => {
    setShowEndPicker(false);
    if (selectedDate) {
      setEndTime(selectedDate);
    }
  };

  const handleDurationChange = (newDuration) => {
    setDuration(newDuration);
    // Recalculate end time based on new duration
    const endDate = new Date(startTime.getTime() + parseInt(newDuration) * 60000);
    setEndTime(endDate);
  };

  const submit = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    if (endTime <= startTime) {
      Alert.alert('Error', 'End time must be after start time');
      return;
    }

    const taskData = {
      title: title.trim(),
      duration: parseInt(duration || '15', 10),
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      priority: 'Medium'
    };

    onSubmit(taskData);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDuration('15');
    setStartTime(new Date());
    setEndTime(new Date(Date.now() + 15 * 60000));
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <ScrollView style={styles.sheet} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Add Task</Text>
          
          <TextInput 
            placeholder="Task title" 
            value={title} 
            onChangeText={setTitle} 
            style={styles.input} 
          />
          
          <TextInput 
            placeholder="Duration (minutes)" 
            keyboardType="numeric" 
            value={duration} 
            onChangeText={handleDurationChange} 
            style={styles.input} 
          />

          {/* Start Time Selection */}
          <View style={styles.timeSection}>
            <Text style={styles.timeLabel}>Start Time</Text>
            <TouchableOpacity 
              style={styles.timeButton} 
              onPress={() => setShowStartPicker(true)}
            >
              <Text style={styles.timeButtonText}>
                {formatDate(startTime)} at {formatTime(startTime)}
              </Text>
            </TouchableOpacity>
          </View>

          {/* End Time Selection */}
          <View style={styles.timeSection}>
            <Text style={styles.timeLabel}>End Time</Text>
            <TouchableOpacity 
              style={styles.timeButton} 
              onPress={() => setShowEndPicker(true)}
            >
              <Text style={styles.timeButtonText}>
                {formatDate(endTime)} at {formatTime(endTime)}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Time Duration Display */}
          <View style={styles.durationDisplay}>
            <Text style={styles.durationText}>
              Task Duration: {Math.round((endTime - startTime) / 60000)} minutes
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleClose} style={styles.btnAlt}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={submit} style={styles.btn}>
              <Text style={{ color: 'white' }}>Add</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Date/Time Pickers */}
        {showStartPicker && (
          <DateTimePicker
            value={startTime}
            mode="datetime"
            display="default"
            onChange={handleStartTimeChange}
            minimumDate={new Date()}
          />
        )}

        {showEndPicker && (
          <DateTimePicker
            value={endTime}
            mode="datetime"
            display="default"
            onChange={handleEndTimeChange}
            minimumDate={startTime}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { 
    flex: 1, 
    justifyContent: 'flex-end', 
    backgroundColor: 'rgba(0,0,0,0.3)' 
  },
  sheet: { 
    backgroundColor: 'white', 
    padding: 16, 
    borderTopLeftRadius: 12, 
    borderTopRightRadius: 12,
    maxHeight: '80%'
  },
  title: {
    fontSize: 18, 
    fontWeight: '700',
    marginBottom: 16
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#e5e7eb', 
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 12,
    fontSize: 16
  },
  timeSection: {
    marginBottom: 12
  },
  timeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6
  },
  timeButton: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f9fafb'
  },
  timeButtonText: {
    fontSize: 16,
    color: '#374151'
  },
  durationDisplay: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16
  },
  durationText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    fontWeight: '500'
  },
  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'flex-end',
    marginTop: 8
  },
  btn: { 
    backgroundColor: '#4f46e5', 
    padding: 12, 
    borderRadius: 8, 
    marginLeft: 8 
  },
  btnAlt: { 
    padding: 12, 
    borderRadius: 8, 
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb'
  }
});

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function ProgressScreen() {
  const [completed, setCompleted] = useState(0);
  const [points, setPoints] = useState(0);
  const [overdueTasks, setOverdueTasks] = useState(0);
  const [totalTimePlanned, setTotalTimePlanned] = useState(0);
  const [totalTimeCompleted, setTotalTimeCompleted] = useState(0);
  const [todayTasks, setTodayTasks] = useState(0);

  useEffect(() => {
    const q = query(collection(db, 'tasks'));
    const unsub = onSnapshot(q, snapshot => {
      const tasks = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      
      // Calculate statistics
      const done = tasks.filter(t => t.done).length;
      const overdue = tasks.filter(t => {
        if (!t.endTime || t.done) return false;
        return new Date(t.endTime) < new Date();
      }).length;
      
      const plannedTime = tasks.reduce((acc, t) => {
        if (!t.startTime || !t.endTime) return acc;
        const duration = (new Date(t.endTime) - new Date(t.startTime)) / 60000; // in minutes
        return acc + duration;
      }, 0);
      
      const completedTime = tasks.filter(t => t.done).reduce((acc, t) => {
        if (!t.startTime || !t.endTime) return acc;
        const duration = (new Date(t.endTime) - new Date(t.startTime)) / 60000;
        return acc + duration;
      }, 0);
      
      const today = tasks.filter(t => {
        if (!t.createdAt) return false;
        const taskDate = new Date(t.createdAt).toDateString();
        const todayDate = new Date().toDateString();
        return taskDate === todayDate;
      }).length;
      
      setCompleted(done);
      setPoints(done * 10);
      setOverdueTasks(overdue);
      setTotalTimePlanned(Math.round(plannedTime));
      setTotalTimeCompleted(Math.round(completedTime));
      setTodayTasks(today);
    });
    return () => unsub();
  }, []);

  const getCompletionRate = () => {
    if (todayTasks === 0) return 0;
    return Math.round((completed / todayTasks) * 100);
  };

  const getTimeEfficiency = () => {
    if (totalTimePlanned === 0) return 0;
    return Math.round((totalTimeCompleted / totalTimePlanned) * 100);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Progress Dashboard</Text>
      
      {/* Main Stats */}
      <View style={styles.statsGrid}>
        <View style={styles.card}>
          <Text style={styles.kpi}>{completed}</Text>
          <Text style={styles.label}>Tasks Done</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.kpi}>{points}</Text>
          <Text style={styles.label}>Points Earned</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.kpi}>{todayTasks}</Text>
          <Text style={styles.label}>Today's Tasks</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.kpi}>{getCompletionRate()}%</Text>
          <Text style={styles.label}>Completion Rate</Text>
        </View>
      </View>

      {/* Time Statistics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⏰ Time Management</Text>
        
        <View style={styles.timeCard}>
          <Text style={styles.timeLabel}>Total Time Planned</Text>
          <Text style={styles.timeValue}>{totalTimePlanned} minutes</Text>
        </View>
        
        <View style={styles.timeCard}>
          <Text style={styles.timeLabel}>Time Completed</Text>
          <Text style={styles.timeValue}>{totalTimeCompleted} minutes</Text>
        </View>
        
        <View style={styles.timeCard}>
          <Text style={styles.timeLabel}>Time Efficiency</Text>
          <Text style={styles.timeValue}>{getTimeEfficiency()}%</Text>
        </View>
      </View>

      {/* Alerts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚠️ Alerts</Text>
        
        {overdueTasks > 0 && (
          <View style={styles.alertCard}>
            <Text style={styles.alertTitle}>Overdue Tasks</Text>
            <Text style={styles.alertText}>{overdueTasks} task(s) are overdue</Text>
            <Text style={styles.alertSuggestion}>Consider extending time or marking as complete</Text>
          </View>
        )}
        
        {getCompletionRate() < 50 && todayTasks > 0 && (
          <View style={styles.alertCard}>
            <Text style={styles.alertTitle}>Low Completion Rate</Text>
            <Text style={styles.alertText}>Only {getCompletionRate()}% of today's tasks completed</Text>
            <Text style={styles.alertSuggestion}>Try breaking tasks into smaller chunks</Text>
          </View>
        )}
        
        {overdueTasks === 0 && getCompletionRate() >= 80 && (
          <View style={[styles.alertCard, styles.successCard]}>
            <Text style={styles.alertTitle}>Great Progress! 🎉</Text>
            <Text style={styles.alertText}>You're on track with your tasks</Text>
            <Text style={styles.alertSuggestion}>Keep up the good work!</Text>
          </View>
        )}
      </View>

      {/* Tips */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Productivity Tips</Text>
        
        <View style={styles.tipCard}>
          <Text style={styles.tipText}>• Use the Pomodoro technique: 25 minutes focused work, 5 minutes break</Text>
        </View>
        
        <View style={styles.tipCard}>
          <Text style={styles.tipText}>• Set realistic time estimates for your tasks</Text>
        </View>
        
        <View style={styles.tipCard}>
          <Text style={styles.tipText}>• Start with the most important tasks first</Text>
        </View>
        
        <View style={styles.tipCard}>
          <Text style={styles.tipText}>• Take breaks to maintain focus and productivity</Text>
        </View>
      </View>
    </ScrollView>
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
    marginBottom: 20 
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24
  },
  card: { 
    backgroundColor: 'white', 
    padding: 18, 
    borderRadius: 12, 
    marginBottom: 12, 
    alignItems: 'center',
    width: '48%',
    elevation: 2
  },
  kpi: { 
    fontSize: 32, 
    fontWeight: '800',
    color: '#4f46e5'
  },
  label: { 
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'center'
  },
  section: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#374151'
  },
  timeCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  timeLabel: {
    fontSize: 14,
    color: '#6b7280'
  },
  timeValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151'
  },
  alertCard: {
    backgroundColor: '#fee2e2',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8
  },
  successCard: {
    backgroundColor: '#d1fae5'
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc2626',
    marginBottom: 4
  },
  alertText: {
    fontSize: 14,
    color: '#dc2626',
    marginBottom: 4
  },
  alertSuggestion: {
    fontSize: 12,
    color: '#dc2626',
    fontStyle: 'italic'
  },
  tipCard: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8
  },
  tipText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20
  }
});

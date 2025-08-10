# Procrastination Buster (Expo)

## Prerequisites
- Node.js (LTS) and npm
- iOS: Xcode (optional if using Expo Go)
- Android: Android Studio (optional if using Expo Go)

## Setup
```bash
cd /Users/nadia/Downloads/ProcrastinationBuster
npm install
```

Edit `firebaseConfig.js` and paste your Firebase project config from the Firebase Console. Enable Firestore.

## Run
```bash
npx expo start
```
- Press `i` for iOS simulator, `a` for Android emulator, or scan the QR with the Expo Go app on your phone.

## Structure
- `App.js` entry with bottom tabs
- `screens/` Home, Timer, Progress, Review
- `components/` small UI components
- `utils/` `usePomodoro` hook

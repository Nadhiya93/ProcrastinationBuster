# 🔥 Firebase Setup Guide

This guide will help you set up Firebase for your ProcrastinationBuster app.

## 📋 Prerequisites

- A Google account
- Access to [Firebase Console](https://console.firebase.google.com/)

## 🚀 Step-by-Step Setup

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"** or **"Add project"**
3. Enter a project name: `procrastination-buster` (or your preferred name)
4. Choose whether to enable Google Analytics (recommended)
5. Click **"Create project"**

### 2. Enable Firestore Database

1. In your Firebase project dashboard, click **"Firestore Database"** in the left sidebar
2. Click **"Create database"**
3. Choose **"Start in test mode"** for development (you can secure it later)
4. Select a location close to your users
5. Click **"Done"**

### 3. Get Your Firebase Configuration

1. Click the **gear icon** (⚙️) next to "Project Overview" in the left sidebar
2. Select **"Project settings"**
3. Scroll down to the **"Your apps"** section
4. Click the **web icon** (</>) to add a web app
5. Enter app nickname: `ProcrastinationBuster Web`
6. Click **"Register app"**
7. Copy the configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

### 4. Update Your App Configuration

1. Open `firebaseConfig.js` in your project
2. Replace the placeholder values with your actual Firebase configuration:

```javascript
// Replace the config object with your Firebase project's config.
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'YOUR_ACTUAL_API_KEY',
  authDomain: 'YOUR_ACTUAL_AUTH_DOMAIN',
  projectId: 'YOUR_ACTUAL_PROJECT_ID',
  storageBucket: 'YOUR_ACTUAL_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_ACTUAL_MSG_SENDER_ID',
  appId: 'YOUR_ACTUAL_APP_ID'
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

### 5. Test Your Setup

1. Start your app: `npx expo start`
2. Try adding a task
3. Check your Firestore Database to see if data is being saved

## 🔒 Security Rules (Optional)

For production, you should set up proper security rules. In Firestore Database:

1. Go to **"Rules"** tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // For development only
    }
  }
}
```

**Note**: The above rules allow all access. For production, implement proper authentication and authorization.

## 🚨 Important Notes

- **Never commit your Firebase config** with real API keys to public repositories
- **Use environment variables** for production apps
- **Set up proper security rules** before deploying to production
- **Monitor your Firebase usage** to avoid unexpected charges

## 🆘 Troubleshooting

### Common Issues:

1. **"Firebase App named '[DEFAULT]' already exists"**
   - Make sure you're not initializing Firebase multiple times

2. **"Permission denied"**
   - Check your Firestore security rules
   - Ensure you're in test mode for development

3. **"Network error"**
   - Check your internet connection
   - Verify your Firebase project is active

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Pricing](https://firebase.google.com/pricing)

---

**Need help?** Open an issue on GitHub or check the Firebase documentation.

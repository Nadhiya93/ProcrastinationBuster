# 🚀 ProcrastinationBuster

A React Native productivity app designed to help users manage tasks and stay focused using the Pomodoro technique. Built with Expo, Firebase, and modern React Native practices.

## ✨ Features

- 📝 **Task Management**: Create, edit, and delete tasks with priority levels
- ⏱️ **Pomodoro Timer**: 25-minute focused work sessions with customizable durations
- 📊 **Progress Tracking**: Visual progress indicators and completion statistics
- 🔄 **Real-time Sync**: Firebase integration for cloud data storage
- 📱 **Cross-platform**: Works on iOS, Android, and Web
- 🎨 **Modern UI**: Clean, intuitive interface with smooth animations

## 🛠️ Tech Stack

- **React Native** 0.79.5
- **Expo SDK** 53.0.20
- **Firebase** 12.1.0 (Firestore)
- **React Navigation** 6.x
- **React** 19.0.0

## 📱 Screenshots

### Home Screen
![Home Screen](https://via.placeholder.com/300x600/4f46e5/ffffff?text=Home+Screen)

### Timer Screen
![Timer Screen](https://via.placeholder.com/300x600/10b981/ffffff?text=Timer+Screen)

### Progress Screen
![Progress Screen](https://via.placeholder.com/300x600/f59e0b/ffffff?text=Progress+Screen)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS) or Android Studio (for Android)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nadhiya93/ProcrastinationBuster.git
   cd ProcrastinationBuster
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database
   - Copy your Firebase config to `firebaseConfig.js`

4. **Start the development server**
   ```bash
   npx expo start
   ```

5. **Run on your preferred platform**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Press `w` for Web
   - Scan QR code with Expo Go app on your phone

## 🔧 Configuration

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database
4. Get your project configuration
5. Update `firebaseConfig.js`:

```javascript
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MSG_SENDER_ID',
  appId: 'YOUR_APP_ID'
};
```

## 📁 Project Structure

```
ProcrastinationBuster/
├── App.js                 # Main app component
├── app.json              # Expo configuration
├── firebaseConfig.js     # Firebase configuration
├── package.json          # Dependencies
├── components/           # Reusable components
│   ├── AddTaskModal.js
│   └── TaskItem.js
├── screens/              # App screens
│   ├── HomeScreen.js
│   ├── TimerScreen.js
│   ├── ProgressScreen.js
│   └── ReviewScreen.js
└── utils/                # Utility functions
    └── usePomodoro.js
```

## 🎯 How to Use

### Adding Tasks
1. Tap the "+" button on the Home screen
2. Enter task title and duration
3. Set priority level
4. Tap "Add" to save

### Using the Timer
1. Navigate to the Timer screen
2. Tap "Start" to begin a 25-minute Pomodoro session
3. Use "Pause" to pause and "Reset" to restart
4. Complete tasks during focused work sessions

### Tracking Progress
- View completed tasks count on Progress screen
- See total time focused on tasks
- Monitor daily productivity metrics

## 🔒 Security

This app has been updated with the latest security patches:
- ✅ All npm vulnerabilities resolved
- ✅ Latest dependency versions
- ✅ Secure Firebase configuration
- ✅ Proper .gitignore for sensitive files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev/)
- Powered by [Firebase](https://firebase.google.com/)
- Icons from [Expo Vector Icons](https://expo.github.io/vector-icons/)

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the maintainer.

---

**Made with ❤️ by Nadhiya93**

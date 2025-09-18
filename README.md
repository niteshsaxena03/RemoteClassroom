# 🎓 Remote Classroom

**A modern, beautiful online learning platform built with Next.js and Firebase**

![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss)

## ✨ Features

### 🎨 **Modern Design**

- **Glassmorphism UI**: Beautiful backdrop blur effects and transparency
- **Gradient Animations**: Dynamic color gradients throughout the interface
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Theme**: Sleek dark mode with vibrant accent colors

### 🔐 **Authentication System**

- **Firebase Auth Integration**: Secure email/password authentication
- **Context API State Management**: Global authentication state
- **Protected Routes**: Automatic redirection based on auth status
- **Beautiful Auth Pages**: Modern login and signup interfaces

### 📚 **Learning Modes**

- **Self-Paced Learning**: Learn at your own speed with flexible scheduling
- **AI Tutor**: (Coming Soon) AI-powered personalized tutoring
- **Mode Selection**: Choose your preferred learning style every session

### 🎯 **Dashboard Features**

- **Course Management**: Browse all courses and track your enrolled courses
- **Progress Tracking**: Visual progress bars and completion statistics
- **Beautiful Course Cards**: Engaging course previews with gradients and hover effects
- **Stats Overview**: Total courses, completed courses, and progress metrics

## 🚀 **Getting Started**

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd my-nextjs-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Firebase**

   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication with Email/Password
   - Update Firebase config in `src/lib/firebase.js` with your credentials

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ **Project Structure**

```
src/
├── app/                    # Next.js App Router
│   ├── dashboard/          # Dashboard page
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   ├── mode/              # Learning mode selection
│   ├── globals.css        # Global styles and animations
│   ├── layout.js          # Root layout component
│   └── page.js            # Landing page
├── contexts/              # React Context providers
│   └── AuthContext.js     # Authentication context
└── lib/                   # Utilities and configurations
    └── firebase.js        # Firebase configuration
```

## 🎨 **Design System**

### **Color Palette**

- **Primary**: Blue to Teal gradients (`#3B82F6` → `#14B8A6`)
- **Secondary**: Green to Emerald gradients (`#10B981` → `#059669`)
- **Accent**: Purple to Pink gradients (`#8B5CF6` → `#EC4899`)
- **Background**: Dark grays with transparency (`#1F2937/80`)

### **Typography**

- **Primary Font**: Geist Sans
- **Monospace**: Geist Mono
- **Gradient Text**: Multi-color gradient text effects

### **Components**

- **Buttons**: Gradient backgrounds with hover animations
- **Cards**: Glass morphism with backdrop blur
- **Forms**: Modern inputs with icons and focus states
- **Navigation**: Smooth transitions and micro-interactions

## 🔧 **Technologies Used**

### **Frontend**

- **Next.js 15.5.3**: React framework with App Router
- **React 19.1.0**: Component-based UI library
- **Tailwind CSS 4**: Utility-first CSS framework
- **Context API**: State management for authentication

### **Backend & Database**

- **Firebase Auth**: User authentication and management
- **localStorage**: Client-side data persistence (no Firestore costs!)

### **Development Tools**

- **ESLint**: Code linting and formatting
- **PostCSS**: CSS preprocessing
- **Turbopack**: Fast development builds

## 📱 **User Flow**

1. **Landing Page** → Beautiful welcome page with feature highlights
2. **Authentication** → Modern login/signup with Firebase
3. **Mode Selection** → Choose between Self-Paced or AI Tutor (every session)
4. **Dashboard** → Course management and progress tracking

## 🎯 **Key Features Explained**

### **Authentication Flow**

- Users must choose learning mode every time they log in (no persistence)
- Automatic redirection based on authentication state
- Secure Firebase authentication with error handling

### **Learning Modes**

- **Self-Paced**: Functional course browsing and enrollment
- **AI Tutor**: Placeholder for future AI integration

### **Course Management**

- **All Courses**: Browse available courses with pricing and details
- **My Courses**: Track enrolled courses with progress indicators
- Sample courses with realistic data and progress tracking

## 🚀 **Deployment**

### **Vercel (Recommended)**

```bash
npm run build
# Deploy to Vercel through their dashboard or CLI
```

### **Other Platforms**

```bash
npm run build
npm start
```

## 🔒 **Security Features**

- **Firebase Authentication**: Industry-standard security
- **Protected Routes**: Automatic redirection for unauthorized access
- **Input Validation**: Form validation and error handling
- **Secure Data Storage**: Client-side localStorage (no server costs)

## 🎨 **Design Philosophy**

- **User-Centric**: Every design decision prioritizes user experience
- **Modern Aesthetics**: Contemporary design with smooth animations
- **Performance**: Optimized for fast loading and smooth interactions
- **Accessibility**: Proper contrast ratios and semantic HTML

## 📄 **License**

This project is built for educational purposes. Feel free to use and modify as needed.

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 **Support**

For questions or support, please open an issue in the repository.

---

**Built with ❤️ using Next.js, React, and Firebase**

_Transform your learning journey with Remote Classroom - where education meets modern design._

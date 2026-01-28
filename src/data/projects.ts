export interface Project {
  id: string;
  title: string;
  date: string;
  summary: string;
  details: string[];
  techStack: string[];
  role?: string;
}

export const projects: Project[] = [
  {
    id: "sagit",
    title: "SAGIT: Semantic Source-Code Analysis Tool",
    date: "2025",
    role: "Project Lead - Research under HOD, Dept. of IT",
    summary: "A lightweight CLI tool that extends Git with semantic change analysis and automated documentation.",
    details: [
      "Engineered a lightweight CLI tool that extends Git with semantic change analysis, achieving sub-second commit overhead through optimized Java AST parsing.",
      "Accomplished a 40% reduction in manual documentation time by automating Conventional Commit message drafting via integrated Git hooks (prepare-commit-msg).",
      "Ensured 100% data integrity across history by building a local-first JSONL metadata engine that handles complex rename and copy events.",
    ],
    techStack: ["Java", "JGit", "Picocli", "AST Parsing"],
  },
  {
    id: "assessment-platform",
    title: "Multi-Tenant Distributed Fault-Tolerant Assessment Platform",
    date: "2025",
    role: "Project Lead",
    summary: "A scalable SaaS platform supporting 1,000+ concurrent users with 100% exam resume success rate.",
    details: [
      "Engineered a scalable SaaS platform supporting 1,000+ concurrent users by architecting a sharded Firebase backend with Firestore transactions and optimized React listeners.",
      "Accomplished a 100% exam resume success rate by building a fault-tolerant runtime that eliminated data loss through a dual-layer persistence strategy (Server Sync + Local Storage).",
      "Enforced strict data isolation as measured by zero unauthorized access incidents by implementing Row Level Security (RLS) via complex Firestore Security Rules.",
    ],
    techStack: ["React", "Firebase", "Firestore", "Shadcn/UI", "TypeScript"],
  },
  {
    id: "hotel-saas",
    title: "Cross-Platform SaaS Food Order and Room Booking System",
    date: "Jun 2025",
    role: "Project Lead (Freelance)",
    summary: "Mobile SaaS solution for real-time hotel bookings and food ordering across multi-branch operations.",
    details: [
      "Engineered a mobile SaaS solution for real-time hotel bookings and food ordering, achieving 100% data synchronization across multi-branch branches via a Firestore backend.",
      "Accomplished a zero-error booking rate by building a custom admin CRUD panel and integrating Google Maps API for automated delivery location verification.",
      "Designed a fault-tolerant, offline-friendly architecture using AsyncStorage and TypeScript, ensuring data persistence during intermittent network connectivity.",
    ],
    techStack: ["React Native", "Firebase", "Expo", "Google Maps API", "TypeScript"],
  },
  {
    id: "classprez",
    title: "ClassPrez – Smart Attendance Tracking & Internship Platform",
    date: "Aug 2025",
    role: "Developer",
    summary: "Cross-platform student productivity app with premium license system and real-time attendance tracking.",
    details: [
      "Built a cross-platform mobile application using React Native (Expo) and Firebase to help university students manage class attendance, academic tasks, and discover internship opportunities.",
      "Implemented a freemium licensing system with secure license key validation (expiry, max usage tracking) stored in Firestore.",
      "Integrated Firebase Auth (Email/Password + Phone OTP signup) with real-time premium status verification on login.",
      "Developed a bulk internship uploader using Firebase Admin SDK for faster content management.",
    ],
    techStack: ["React Native", "Expo", "Firebase", "Tailwind CSS", "Context API"],
  },
  {
    id: "twitter-sentiment",
    title: "Twitter Sentiment Analysis using Machine Learning",
    date: "Jul 2025",
    summary: "ML model to classify tweets as Positive or Negative using the Sentiment140 dataset.",
    details: [
      "Built a machine learning model to classify tweets as Positive or Negative using the Sentiment140 dataset (1.6 million tweets).",
      "Preprocessed data with tokenization, stemming, and stopword removal using NLTK.",
      "Applied TF-IDF vectorization and trained a Logistic Regression classifier, achieving 77.6% accuracy on unseen data.",
      "Saved the trained model using pickle for deployment.",
    ],
    techStack: ["Python", "Scikit-learn", "NLTK", "TF-IDF", "Logistic Regression"],
  },
  {
    id: "mathtrial",
    title: "MathTrial: Complete Online Test/Exam Platform",
    date: "Jun 2024 - Jul 2024",
    summary: "Comprehensive online examination platform for coaching centers with full student and teacher features.",
    details: [
      "Built a platform enabling students to register, attempt tests, track performance, view report cards, and access teacher-shared solutions.",
      "Implemented teacher features: course/test creation, question management with image support, custom test links, student records, leaderboard, and test scheduling.",
      "Designed specifically for subjects like mathematics where complex equations and diagrams are common.",
    ],
    techStack: ["PHP", "phpMyAdmin", "SQL", "HTML", "CSS", "JavaScript", "Git"],
  },
];

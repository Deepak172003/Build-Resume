// src/config.js

// Base API URL
export const BASE_URL = "http://localhost:4000"; 
// 👆 replace with your backend API base URL

// API Paths
export const API_PATHS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/signup", // renamed for consistency
  },
  USER: {
    PROFILE: "/user/profile",
  },
};

// Dummy resume data for testing (optional, can remove later)
export const DUMMY_RESUME_DATA = {
  name: "John Doe",
  title: "Software Engineer",
  email: "john.doe@example.com",
  phone: "+91-9876543210",
  summary:
    "Passionate software engineer with experience in building scalable web applications.",
  skills: ["JavaScript", "React", "Node.js", "Express", "MongoDB"],
  experience: [
    {
      company: "Tech Corp",
      role: "Frontend Developer",
      duration: "2021 - Present",
      details: [
        "Built responsive UI with React and TailwindCSS",
        "Integrated REST APIs using Axios",
      ],
    },
  ],
  education: [
    {
      institution: "ABC University",
      degree: "B.Tech in Computer Science",
      year: "2020",
    },
  ],
};

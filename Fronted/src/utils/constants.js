// src/utils/constants.js

// Example API Paths (you can extend this as needed)
export const API_PATHS = {
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  PROFILE: "/user/profile",
};

// Dummy resume data for testing
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

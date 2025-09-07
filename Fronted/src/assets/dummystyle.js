// src/assets/dummystyle.js

// 🌐 Landing Page Styles
export const landingPageStyles = {
  container: "min-h-screen flex flex-col items-center justify-center bg-gray-50",
  header: "text-4xl font-bold mb-6 text-gray-800",
  subText: "text-lg text-gray-600 mb-4",
  button: "px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition",
};

// 📊 Dashboard Styles
export const dashboardStyles = {
  container: "p-6 bg-white shadow-lg rounded-xl",
  title: "text-2xl font-semibold text-gray-900 mb-4",
  cardGrid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
};

// 🃏 Card Styles
export const cardStyles = {
  container: "p-4 border rounded-lg shadow hover:shadow-md transition bg-white",
  title: "text-lg font-bold text-gray-800 mb-2",
  description: "text-sm text-gray-600",
};

// 🔑 Auth Pages (Login / Signup)
export const authStyles = {
  signupContainer: "flex flex-col items-center justify-center min-h-screen bg-gray-50",
  headerWrapper: "text-center mb-6",
  signupTitle: "text-3xl font-semibold text-gray-800",
  signupSubtitle: "text-gray-600 mt-2",
  singUpForm: "flex flex-col w-full max-w-md space-y-4 bg-white p-6 rounded-xl shadow-md",
  errorMessage: "text-red-500 text-sm mt-2",
  signupSubmit: "w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition",
  switchText: "text-gray-600 mt-4 text-center",
  signupSwitchButton: "text-blue-600 hover:underline ml-1",
};

// 💡 Shimmer Loading Effect
export const shimmerStyle = {
  container: "animate-pulse space-y-4 p-4",
  line: "h-4 bg-gray-300 rounded",
};

// 🎨 Common Styles
export const commonStyles = {
  sectionTitle: "text-xl font-semibold text-gray-800 mb-3",
  input: "w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400",
  label: "block text-sm font-medium text-gray-700 mb-1",
};

// 📌 Additional Info Section
export const additionalInfoStyles = {
  container: "p-4 bg-gray-50 rounded-lg shadow",
  text: "text-gray-700 text-sm",
};

// 🎓 Education Details
export const educationDetailsStyles = {
  container: "p-4 border rounded-lg mb-3",
  institution: "font-semibold text-gray-800",
  degree: "text-gray-600 text-sm",
  year: "text-gray-500 text-xs",
};

// 👤 Profile Info
export const profileInfoStyles = {
  container: "flex items-center space-x-4",
  avatar: "w-16 h-16 rounded-full object-cover",
  name: "text-lg font-bold text-gray-800",
  title: "text-gray-600 text-sm",
};

// 📂 Project Details
export const projectDetailStyles = {
  container: "p-4 border rounded-lg bg-white shadow-sm",
  title: "font-semibold text-gray-800 mb-1",
  description: "text-gray-600 text-sm",
};

// 🛠 Skills Info
export const skillsInfoStyles = {
  container: "flex flex-wrap gap-2",
  skill: "px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm",
};

// 💼 Work Experience
export const workExperienceStyles = {
  container: "p-4 border rounded-lg shadow mb-3 bg-white",
  company: "font-bold text-gray-800",
  role: "text-sm text-gray-600",
  duration: "text-xs text-gray-500",
};

// 📞 Contact Info
export const contactInfoStyles = {
  container: "p-4 bg-gray-50 rounded-lg",
  label: "text-sm font-medium text-gray-700",
  value: "text-sm text-gray-600",
};

// 🎖 Certification Info
export const certificationInfoStyles = {
  container: "p-4 border rounded-lg mb-3",
  certName: "font-semibold text-gray-800",
  issuer: "text-gray-600 text-sm",
  year: "text-gray-500 text-xs",
};

// 🧩 Container Layouts
export const containerStyles = {
  flexCenter: "flex items-center justify-center",
  card: "bg-white shadow rounded-lg p-4",
};

// 🔘 Button Styles
export const buttonStyles = {
  primary: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition",
  secondary: "px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition",
};

// ✅ Status Badges
export const statusStyles = {
  success: "px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs",
  warning: "px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs",
  error: "px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs",
};

// 🎯 Icon Styles
export const iconStyles = {
  small: "w-4 h-4",
  medium: "w-6 h-6",
  large: "w-8 h-8",
};

// ✏ Input Styles
export const inputStyles = {
  base: "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none",
  error: "border-red-500 text-red-600",
};

// 📷 Photo Selector
export const photoSelectorStyles = {
  container: "flex items-center space-x-3",
  preview: "w-20 h-20 object-cover rounded-full",
  uploadButton: "px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600",
};

// 📝 Title Input
export const titleInputStyles = {
  input: "text-2xl font-semibold text-gray-800 border-b focus:outline-none focus:border-blue-500",
};

// 🪟 Modal Styles
export const modalStyles = {
  overlay: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
  content: "bg-white p-6 rounded-lg shadow-lg max-w-lg w-full",
};

// ℹ Info Box
export const infoStyles = {
  box: "p-4 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg",
};

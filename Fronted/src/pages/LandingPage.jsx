import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutTemplate, Menu, X, Zap } from "lucide-react";
import { landingPageStyles as styles } from "../assets/dummystyle";
import { UserContext } from "../context/UserContext";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import Modal from "../components/Modal";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      setOpenAuthModal(true);
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 shadow-md">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <LayoutTemplate size={20} />
          ResumeBuilder
        </h1>
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <nav className="hidden md:flex gap-6">
          <button
            onClick={handleCTA}
            className="text-sm font-medium hover:text-blue-600"
          >
            {user ? "Go to Dashboard" : "Login / Sign Up"}
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <h2 className={styles.header}>Craft Your Resume in Minutes</h2>
        <p className={styles.subText}>
          Build a professional resume with smart templates and real-time
          suggestions.
        </p>
        <button onClick={handleCTA} className={styles.button}>
          <Zap size={18} />
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-6 px-6 py-12 bg-gray-50">
        <div className="p-4 border rounded shadow-sm">
          <h3 className="font-semibold text-lg mb-2">Smart Templates</h3>
          <p className="text-sm text-gray-600">
            Choose from modern, ATS-friendly designs.
          </p>
        </div>
        <div className="p-4 border rounded shadow-sm">
          <h3 className="font-semibold text-lg mb-2">AI Suggestions</h3>
          <p className="text-sm text-gray-600">
            Get tailored content recommendations instantly.
          </p>
        </div>
        <div className="p-4 border rounded shadow-sm">
          <h3 className="font-semibold text-lg mb-2">PDF Export</h3>
          <p className="text-sm text-gray-600">
            Download your resume in high-quality format.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} ResumeBuilder. All rights reserved.
      </footer>

      {/* Auth Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div className="p-4">
          {currentPage === "login" && (
            <Login setCurrentPage={setCurrentPage} />
          )}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authStyles as styles } from "../assets/dummystyle";
import { UserContext } from "../context/UserContext";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance"; // ✅ fixed import
import { API_PATHS } from "../utils/constants";

const SignUp = ({ setCurrentPage }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    // ✅ Validation
    if (!fullName) return setError("Please enter Full Name");
    if (!validateEmail(email))
      return setError("Please enter a valid email address");
    if (!password) return setError("Please enter a password");

    try {
      setLoading(true);
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.headerWrapper}>
        <h3 className={styles.signupTitle}>Create Account</h3>
        <p className={styles.signupSubtitle}>
          Join thousands of professionals today
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSignUp} className={styles.singUpForm}>
        <input
          value={fullName}
          onChange={({ target }) => setFullName(target.value)}
          placeholder="John Doe"
          type="text"
        />

        <input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          placeholder="email@example.com"
          type="email"
        />

        <input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          placeholder="Min 8 characters"
          type="password" // ✅ fixed casing
        />

        {error && <div className={styles.errorMessage}>{error}</div>}

        <button type="submit" className={styles.signupSubmit} disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>

        {/* Footer */}
        <p className={styles.switchText}>
          Already have an account?{" "}
          <button
            onClick={() => setCurrentPage("login")}
            type="button"
            className={styles.signupSwitchButton}
          >
            Sign In
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;

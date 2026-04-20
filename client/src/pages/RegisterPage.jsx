import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../services/api";

function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!name.trim()) {
      setMessage("Name is required");
      return;
    }

    if (!email.trim()) {
      setMessage("Email is required");
      return;
    }

    if (!password) {
      setMessage("Password is required");
      return;
    }

    try {
      const data = await authApi.register({ name, email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/admin");
    } catch (error) {
      setMessage(error.message || "Registration failed");
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-visual">
        <div className="auth-visual-content">
          <h2>Product Manager</h2>
        </div>
      </div>
      <div className="auth-form-container">
        <form className="auth-card" onSubmit={handleRegister}>
          <div className="auth-header">
            <h1>Create Account</h1>
            <p>Sign up to get started.</p>
          </div>

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your full name"
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a password"
            />
          </div>

          <button type="submit" className="primary-btn">Sign Up</button>
          {message && <div className="message-box error">{message}</div>}
          
          <p className="auth-footer">
            Already have an account? <Link to="/login">Sign in instead</Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default RegisterPage;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../services/api";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!email.trim()) {
      setMessage("Email is required");
      return;
    }

    if (!password) {
      setMessage("Password is required");
      return;
    }

    try {
      const data = await authApi.login({ email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/admin");
    } catch (error) {
      setMessage(error.message || "Login failed");
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
        <form className="auth-card" onSubmit={handleLogin}>
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Please enter your details to sign in.</p>
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
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="primary-btn">Sign In</button>
          {message && <div className="message-box error">{message}</div>}
          
          <p className="auth-footer">
            Don't have an account? <Link to="/register">Create one now</Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;

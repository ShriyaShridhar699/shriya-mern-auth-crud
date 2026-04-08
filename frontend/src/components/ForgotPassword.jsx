import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPasswordUser } from "../api/authApi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setResetToken("");
    setError("");
    setLoading(true);

    try {
      const res = await forgotPasswordUser({ email });
      setMessage(res.data.message);
      setResetToken(res.data.resetToken || "");
    } catch (err) {
      setError(err.response?.data?.message || "Forgot password failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <form className="card" onSubmit={handleForgotPassword}>
        <h1 className="title">Forgot Password</h1>

        {message && <div className="alert-success">{message}</div>}
        {error && <div className="alert-error">{error}</div>}

        <input
          className="input"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="button" disabled={loading}>
          {loading ? "Sending..." : "Generate Reset Token"}
        </button>

        {resetToken && (
          <div className="alert-success" style={{ marginTop: "12px" }}>
            <strong>Reset Token:</strong> {resetToken}
          </div>
        )}

        <div style={{ marginTop: "12px" }}>
          <Link className="link" to="/reset-password">Go to Reset Password</Link>
          <Link className="link" to="/login">Back to Login</Link>
        </div>
      </form>
    </div>
  );
}
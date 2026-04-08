import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { resetPasswordUser } from "../api/authApi";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    token: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await resetPasswordUser({
        token: formData.token,
        password: formData.password,
      });

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Reset password failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <form className="card" onSubmit={handleResetPassword}>
        <h1 className="title">Reset Password</h1>

        {message && <div className="alert-success">{message}</div>}
        {error && <div className="alert-error">{error}</div>}

        <input
          className="input"
          type="text"
          name="token"
          placeholder="Enter reset token"
          value={formData.token}
          onChange={handleChange}
        />

        <input
          className="input"
          type="password"
          name="password"
          placeholder="New password"
          value={formData.password}
          onChange={handleChange}
        />

        <input
          className="input"
          type="password"
          name="confirmPassword"
          placeholder="Confirm new password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <button className="button" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        <div style={{ marginTop: "12px" }}>
          <Link className="link" to="/forgot-password">Back to Forgot Password</Link>
          <Link className="link" to="/login">Back to Login</Link>
        </div>
      </form>
    </div>
  );
}
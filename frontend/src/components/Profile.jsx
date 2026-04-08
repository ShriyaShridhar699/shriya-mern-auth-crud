import { useEffect, useState } from "react";
import { updateProfileUser } from "../api/authApi";

export default function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (storedUser) {
      setFormData({
        name: storedUser.name || "",
        phone: storedUser.phone || "",
        email: storedUser.email || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await updateProfileUser({
        name: formData.name,
        phone: formData.phone,
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMessage("Profile updated successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="page">
      <form className="card" onSubmit={handleUpdate}>
        <h1 className="title">Profile</h1>

        {message && <div className="alert-success">{message}</div>}
        {error && <div className="alert-error">{error}</div>}

        <input
          className="input"
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          className="input"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          disabled
        />

        <input
          className="input"
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <button className="button">Update Profile</button>
      </form>
    </div>
  );
}
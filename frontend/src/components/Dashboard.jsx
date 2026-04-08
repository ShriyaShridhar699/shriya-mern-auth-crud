import { useEffect, useMemo, useState } from "react";
import { getItems, createItem, updateItem, deleteItem, getStats } from "../api/itemApi";

export default function Dashboard() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    completed: 0,
  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "active",
  });

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const fetchDashboardData = async () => {
    try {
      const itemsRes = await getItems();
      const statsRes = await getStats();

      setItems(itemsRes.data);
      setStats(statsRes.data);
    } catch (err) {
      setError("Failed to load dashboard data");
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      status: "active",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      if (editingId) {
        await updateItem(editingId, formData);
        setMessage("Item updated successfully");
      } else {
        await createItem(formData);
        setMessage("Item created successfully");
      }

      resetForm();
      fetchDashboardData();
    } catch (err) {
      setError("Failed to save item");
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      description: item.description || "",
      status: item.status,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (!confirmed) return;

    try {
      await deleteItem(id);
      setMessage("Item deleted successfully");
      fetchDashboardData();
    } catch (err) {
      setError("Failed to delete item");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const exportToCSV = () => {
    const headers = ["Title", "Description", "Status"];
    const rows = filteredItems.map((item) => [
      item.title,
      item.description || "",
      item.status,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((value) => `"${value}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "items.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        (item.description || "").toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        filterStatus === "all" ? true : item.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [items, search, filterStatus]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterStatus]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div
      style={{
        padding: "24px",
        minHeight: "100vh",
        background: darkMode ? "#111827" : "#f5f7fb",
        color: darkMode ? "white" : "black",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>Dashboard</h1>
          <p style={{ margin: "6px 0 0 0" }}>
            Welcome, {storedUser?.name || "User"}
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            className="button"
            style={{ width: "auto", padding: "10px 18px" }}
            onClick={() => (window.location.href = "/profile")}
          >
            Profile
          </button>

          <button
            className="button"
            style={{ width: "auto", padding: "10px 18px" }}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          <button
            className="button"
            style={{ width: "auto", padding: "10px 18px" }}
            onClick={exportToCSV}
          >
            Export CSV
          </button>

          <button
            className="button"
            style={{ width: "auto", padding: "10px 18px" }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {message && <div className="alert-success">{message}</div>}
      {error && <div className="alert-error">{error}</div>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div className="card" style={{ maxWidth: "100%" }}>
          <h3>Total Items</h3>
          <p>{stats.total}</p>
        </div>
        <div className="card" style={{ maxWidth: "100%" }}>
          <h3>Active</h3>
          <p>{stats.active}</p>
        </div>
        <div className="card" style={{ maxWidth: "100%" }}>
          <h3>Pending</h3>
          <p>{stats.pending}</p>
        </div>
        <div className="card" style={{ maxWidth: "100%" }}>
          <h3>Completed</h3>
          <p>{stats.completed}</p>
        </div>
      </div>

      <form
        className="card"
        style={{ maxWidth: "100%", marginBottom: "24px" }}
        onSubmit={handleSubmit}
      >
        <h2>{editingId ? "Edit Item" : "Add New Item"}</h2>

        <input
          className="input"
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          className="input"
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <select
          className="input"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="active">active</option>
          <option value="pending">pending</option>
          <option value="completed">completed</option>
        </select>

        <button className="button">
          {editingId ? "Update Item" : "Add Item"}
        </button>
      </form>

      <div className="card" style={{ maxWidth: "100%", marginBottom: "24px" }}>
        <h2>Search & Filter</h2>

        <input
          className="input"
          type="text"
          placeholder="Search by title or description"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="input"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="card" style={{ maxWidth: "100%" }}>
        <h2>Your Items</h2>

        {currentItems.length === 0 ? (
          <p>No items found.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "10px" }}>Title</th>
                <th style={{ textAlign: "left", padding: "10px" }}>Description</th>
                <th style={{ textAlign: "left", padding: "10px" }}>Status</th>
                <th style={{ textAlign: "left", padding: "10px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td style={{ padding: "10px" }}>{item.title}</td>
                  <td style={{ padding: "10px" }}>{item.description}</td>
                  <td style={{ padding: "10px" }}>{item.status}</td>
                  <td style={{ padding: "10px" }}>
                    <button
                      onClick={() => handleEdit(item)}
                      style={{
                        marginRight: "8px",
                        padding: "8px 12px",
                        background: "#f59e0b",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      style={{
                        padding: "8px 12px",
                        background: "#dc2626",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div style={{ marginTop: "16px", display: "flex", gap: "12px", alignItems: "center" }}>
          <button
            className="button"
            style={{ width: "auto", padding: "10px 18px" }}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="button"
            style={{ width: "auto", padding: "10px 18px" }}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
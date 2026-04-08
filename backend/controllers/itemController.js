const db = require("../config/db");

// GET ALL ITEMS FOR LOGGED-IN USER
exports.getItems = async (req, res) => {
  try {
    const [items] = await db.query(
      "SELECT * FROM items WHERE user_id = ? ORDER BY created_at DESC",
      [req.user.id]
    );

    res.status(200).json(items);
  } catch (error) {
    console.error("Get Items Error:", error);
    res.status(500).json({
      message: "Failed to fetch items",
    });
  }
};

// GET SINGLE ITEM BY ID
exports.getItemById = async (req, res) => {
  try {
    const itemId = req.params.id;

    const [items] = await db.query(
      "SELECT * FROM items WHERE id = ? AND user_id = ?",
      [itemId, req.user.id]
    );

    if (items.length === 0) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.status(200).json(items[0]);
  } catch (error) {
    console.error("Get Item By ID Error:", error);
    res.status(500).json({
      message: "Failed to fetch item",
    });
  }
};

// CREATE NEW ITEM
exports.createItem = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const [result] = await db.query(
      "INSERT INTO items (user_id, title, description, status) VALUES (?, ?, ?, ?)",
      [
        req.user.id,
        title,
        description || null,
        status || "active",
      ]
    );

    const [items] = await db.query(
      "SELECT * FROM items WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json({
      message: "Item created successfully",
      item: items[0],
    });
  } catch (error) {
    console.error("Create Item Error:", error);
    res.status(500).json({
      message: "Failed to create item",
    });
  }
};

// UPDATE ITEM
exports.updateItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const { title, description, status } = req.body;

    const [result] = await db.query(
      "UPDATE items SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?",
      [
        title,
        description,
        status,
        itemId,
        req.user.id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    const [items] = await db.query(
      "SELECT * FROM items WHERE id = ? AND user_id = ?",
      [itemId, req.user.id]
    );

    res.status(200).json({
      message: "Item updated successfully",
      item: items[0],
    });
  } catch (error) {
    console.error("Update Item Error:", error);
    res.status(500).json({
      message: "Failed to update item",
    });
  }
};

// DELETE ITEM
exports.deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id;

    const [result] = await db.query(
      "DELETE FROM items WHERE id = ? AND user_id = ?",
      [itemId, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.status(200).json({
      message: "Item deleted successfully",
    });
  } catch (error) {
    console.error("Delete Item Error:", error);
    res.status(500).json({
      message: "Failed to delete item",
    });
  }
};

// GET DASHBOARD STATS
exports.getStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const [totalRows] = await db.query(
      "SELECT COUNT(*) AS total FROM items WHERE user_id = ?",
      [userId]
    );

    const [activeRows] = await db.query(
      "SELECT COUNT(*) AS active FROM items WHERE user_id = ? AND status = 'active'",
      [userId]
    );

    const [pendingRows] = await db.query(
      "SELECT COUNT(*) AS pending FROM items WHERE user_id = ? AND status = 'pending'",
      [userId]
    );

    const [completedRows] = await db.query(
      "SELECT COUNT(*) AS completed FROM items WHERE user_id = ? AND status = 'completed'",
      [userId]
    );

    res.status(200).json({
      total: totalRows[0].total,
      active: activeRows[0].active,
      pending: pendingRows[0].pending,
      completed: completedRows[0].completed,
    });
  } catch (error) {
    console.error("Get Stats Error:", error);
    res.status(500).json({
      message: "Failed to fetch stats",
    });
  }
};
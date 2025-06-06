const express = require("express");
const router = express.Router();
const { getUser, addUser, updateUser, deleteUser } = require("../controllers/userController");

// GET /api/users - List all users
router.get("/", getUser);

// POST /api/users - Add a new user
router.post("/", addUser);

// PUT /api/users/:id - Update a user
router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;

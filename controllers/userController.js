const User = require("../models/User.js");

exports.addUser = async (req, res) => {
    try {
        const { username,mobile, userRole, email, password } = req.body;

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });

        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists" });
        }

        const newUser = new User({
            username,
            userRole,
            email,
            password
        });

        await newUser.save();
        res.status(201).json({ message: "user created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
} 


exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, mobile, userRole, email, password } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "user not found" });

        }


        user.username = username || user.username;
        user.userRole = userRole || user.userRole;
        user.email = email || user.email;


        if (password && password.trim() !== "") {
        user.password = password;
        }

        await user.save();

        res.json({
            message: "user updated successfully",
            user: {
                _id: user._id,
                username: user.username,
                userRole: user.userRole,
                email: user.email,
            },
        });
    } catch (err) {
        console.error("error updating user", err);
        res.status(500).json({ message: "server Error", error: err.message });
    }

    
}


exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteUser = await User.findByIdAndDelete(id);
        if (!deleteUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully" });


    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
}


exports.getUser = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
}
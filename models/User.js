const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    userRole: { type: String, required: true, enum: ["admin", "editor", "user"] },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        // console.log("Hashing Password for :", this.username);
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        console.error("Error while Hashing  ", error);
        next(error);

    }
})

// Compare entered password with hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);

import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"],
        },
        email: {
            type: String,
            required: [true, "Please enter your email"],
            unique: true, // Ensure unique emails
        },
        password: {
            type: String,
            required: [true, "Please enter your password"],
        },
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt fields
    }
);

const User = mongoose.model('User', UserSchema);

export default User;

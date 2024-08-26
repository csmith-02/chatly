import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
      fullname: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: Number,
        required: false,
      }
    },
    {
      // Automatically add 'createdAt' and 'updatedAt' fields to the document
      timestamps: true,
    }
  );
  
const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User

  
  
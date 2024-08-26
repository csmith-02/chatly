import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
      message: {
        type: String,
        required: true,
      },
      sender: {
        type: String,
        required: true,
      },
      receiver: {
        type: String,
        required: true,
      },
      convoId: {
        type: String,
        required: true
      }
    },
    {
      // Automatically add 'createdAt' and 'updatedAt' fields to the document
      timestamps: true,
    }
  );
  
const Message = mongoose.models.Message || mongoose.model("Message", messageSchema)

export default Message
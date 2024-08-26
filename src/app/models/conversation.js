import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
    {
      messageIds: {
        type: [{
          type: String
        }],
        required: true,
      },
      members: {
        type: [{
            type: String
        }],
        required: true
      }
    },
    {
      // Automatically add 'createdAt' and 'updatedAt' fields to the document
      timestamps: true,
    }
  );

const Conversation = mongoose.models.Conversation || mongoose.model("Conversation", conversationSchema)
export default Conversation
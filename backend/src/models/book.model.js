import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    author: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String
    },

    price: {
      type: Number,
      required: true,
      default: 0
    },

    coverImage: {
      type: String
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    // 🔹 NEW (safe additions)
    uploadedByRole: {
      type: String,
      enum: ["admin", "user"],
      default: "admin"
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "approved"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);

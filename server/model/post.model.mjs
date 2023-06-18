import mongoose from "mongoose";
import userModel from "./user.model.mjs"

const Schema = mongoose.Schema;

/**
 * Schema for a Post document.
 */
const postSchema = new Schema(
  {
    title: {type: String},
    text: {type: String},
    image: [{type: String}],
    imageData: [{type: String}],
    likes: [{type: String}], 
    dislikes: [{type: String}],
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [
      {
        userId: {type: Schema.Types.ObjectId, ref: "User"},
        comment: {type: String},
        at: {type: Date},
      },
    ],
  },
  {
    timestamps: true,
  }
);

/**
 * Mongoose model for the Post collection.
 */
const postModel = mongoose.model("Post", postSchema);

export default postModel;
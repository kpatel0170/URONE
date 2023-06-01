import mongoose from "mongoose";


const Schema = mongoose.Schema;
const postSchema = new Schema(
  {
    text: {type: String},
    image: [{type: String}],
    likes: [{type: String}], 
    dislikes: [{type: String}],
    userId: {type: Schema.Types.ObjectId, ref: "user"},
    comments: [
      {
        userId: {type: Schema.Types.ObjectId, ref: "user"},
        comment: {type: String},
        at: {type: Date},
      },
    ],
  },
  {
    timestamps: true,
  }
);

const postModel = mongoose.model("Post", postSchema);

export default postModel;
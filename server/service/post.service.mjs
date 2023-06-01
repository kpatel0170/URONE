import postModel from '../model/post.model.mjs';

const PostService = {
  async createPost(text, image, userId) {
    try {
      const newPost = new postModel({ text, image, userId });
      await newPost.save();
      return newPost;
    } catch (error) {
      throw new Error(error.message);
    }
  }


};

export default PostService;

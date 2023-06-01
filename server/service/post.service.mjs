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
  },

  async getPosts() {
    try {
      const posts = await postModel.find().populate('userId', 'username');
      return posts;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getPostById(id) {
    try {
      const post = await postModel.findById(id).populate('userId', 'username');
      return post;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default PostService;

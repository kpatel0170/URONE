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
  },

  async updatePost(id, text, image) {
    try {
      const updatedPost = await postModel.findByIdAndUpdate(id, { text, image }, { new: true });
      return updatedPost;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async deletePost(id) {
    try {
      const deletedPost = await Post.findByIdAndDelete(id);
      return deletedPost;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async addLike(postId, userId) {
    const post = await postModel.findById(postId);
    post.likes.push(userId);
    return post.save();
  }
};

export default PostService;

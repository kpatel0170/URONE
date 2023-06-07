import postModel from "../model/post.model.mjs";

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
      const posts = await postModel.find().populate("userId", "name");
      return posts;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getPostById(id) {
    try {
      const post = await postModel.findById(id).populate("userId", "name");
      return post;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async updatePost(id, text, image) {
    try {
      const updatedPost = await postModel.findByIdAndUpdate(
        id,
        { text, image },
        { new: true }
      );
      return updatedPost;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async deletePost(id) {
    try {
      const deletedPost = await postModel.findByIdAndDelete(id);
      return deletedPost;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async addLike(postId, userId) {
    try {
      const post = await postModel.findById(postId);

      if (!post) {
        throw new Error("Post not found");
      }
      if (post.likes.includes(userId)) {
        throw new Error("User has already liked the post");
      }

      post.likes.push(userId);
      await post.save();

      return post;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async removeLike(postId, userId) {
    try {
      const post = await postModel.findById(postId);

      if (!post) {
        throw new Error("Post not found");
      }

      const index = post.likes.indexOf(userId);
      if (index !== -1) {
        post.likes.splice(index, 1);
        await post.save();
      }

      return post;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async addDislike(postId, userId) {
    try {
      const post = await postModel.findById(postId);

      if (!post) {
        throw new Error("Post not found");
      }
      if (post.dislikes.includes(userId)) {
        throw new Error("User has already liked the post");
      }

      post.dislikes.push(userId);
      await post.save();

      return post;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async removeDislike(postId, userId) {
    try {
      const post = await postModel.findById(postId);

      if (!post) {
        throw new Error("Post not found");
      }

      const index = post.dislikes.indexOf(userId);
      if (index !== -1) {
        post.dislikes.splice(index, 1);
        await post.save();
      }

      return post;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async addComment(postId, userId, comment) {
    const post = await postModel.findById(postId);
    post.comments.push({
      userId,
      comment,
      at: new Date(),
    });
    return post.save();
  },
};

export default PostService;

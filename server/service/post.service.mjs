import postModel from "../model/post.model.mjs";

const PostService = {
  async createPost(title, text, image, userId) {
    try {
      const newPost = new postModel({ title, text, image, userId });

      await newPost.save();
      const populatedPost = await postModel
        .findById(newPost._id)
        .populate("userId", "name type profilePicture");

      return populatedPost;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getPosts() {
    try {
      const posts = await postModel
        .find()
        .populate("userId", "name type profilePicture")
        .populate("comments.userId", "name type profilePicture");

      return posts;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getPostById(id) {
    try {
      const post = await postModel
        .findById(id)
        .populate("userId", "name type profilePicture")
        .populate("comments.userId", "name type profilePicture");

      return post;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getPostsByUserId(userId) {
    try {
      const posts = await postModel
        .find({ userId: userId })
        .populate("userId", "name type profilePicture")
        .populate("comments.userId", "name type profilePicture");
  
      return posts;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async updatePost(id, title, text, image) {
    try {
      const updatedPost = await postModel
        .findByIdAndUpdate(id, { title, text, image }, { new: true })
        .populate("userId", "name type profilePicture")
        .populate("comments.userId", "name type profilePicture");

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
      const post = await postModel
        .findById(postId)
        .populate("userId", "name type profilePicture")
        .populate("comments.userId", "name type profilePicture");

      if (!post) {
        throw new Error("Post not found");
      }

      const isLiked = post.likes.includes(userId);
      const isDisliked = post.dislikes.includes(userId);

      if (isLiked) {
        const index = post.likes.indexOf(userId);
        if (index !== -1) {
          post.likes.splice(index, 1);
          await post.save();
        }
      } else if (isDisliked) {
        const index = post.dislikes.indexOf(userId);
        if (index !== -1) {
          post.dislikes.splice(index, 1);
          post.likes.push(userId);
          await post.save();
        }
      } else {
        post.likes.push(userId);
        await post.save();
      }

      return post;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async addDislike(postId, userId) {
    try {
      const post = await postModel
        .findById(postId)
        .populate("userId", "name type profilePicture")
        .populate("comments.userId", "name type profilePicture");

      if (!post) {
        throw new Error("Post not found");
      }

      const isDisliked = post.dislikes.includes(userId);
      const isLiked = post.likes.includes(userId);

      if (isDisliked) {
        const index = post.dislikes.indexOf(userId);
        if (index !== -1) {
          post.dislikes.splice(index, 1);
          await post.save();
        }
      } else if (isLiked) {
        const index = post.likes.indexOf(userId);
        if (index !== -1) {
          post.likes.splice(index, 1);
          post.dislikes.push(userId);
          await post.save();
        }
      } else {
        post.dislikes.push(userId);
        await post.save();
      }

      return post;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async addComment(postId, userId, comment) {
    try {
      const post = await postModel
        .findById(postId)
        .populate("userId", "name type profilePicture")
        .populate("comments.userId", "name type profilePicture");

      if (!post) {
        throw new Error("Post not found");
      }

      post.comments.push({
        userId,
        comment,
        at: new Date(),
      });

      await post.save();

      const populatedPost = await postModel
        .findById(post._id)
        .populate("userId", "name type profilePicture")
        .populate("comments.userId", "name type profilePicture");

      return populatedPost;

    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default PostService;

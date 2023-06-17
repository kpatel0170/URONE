import postModel from "../model/post.model.mjs";
import userModel from "../model/user.model.mjs";

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

  async getPosts({ userId, userType }) {
    try {
      const query = {};
      let users;
      if (userType) {
        users = await userModel.find({ type: userType }, { _id: 1 });
        query.userId = users;
      } else if (userId) {
        query.userId = userId;
      }
      const posts = await postModel
        .find(query)
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
      const data = {};
      title ? (data.title = title) : "";
      text ? (data.text = text) : "";
      // image && image.length ? (data.image = image) : [];
      image ? (data.image = image) : [];
      const updatedPost = await postModel
        .findByIdAndUpdate(id, { $set: data }, { new: true })
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

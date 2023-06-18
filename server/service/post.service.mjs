import postModel from "../model/post.model.mjs";
import userModel from "../model/user.model.mjs";

const PostService = {

   /**
   * createPost()
   * Creates a new post with the provided information.
   * @param {title, text, image, userId} - The Post info.
   * @return {Promise<PostModel>} - A promise that resolves to the newly created post.
   * @throw {Error} - If an error occurs while creating the post.
   */
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

  /**
   * getPosts()
   * Retrieves posts based on the provided filters.
   * @param {userId, userType} - Filters for retrieving posts.
   * @return {Promise<PostModel[]>} - A promise that resolves to an array of posts.
   * @throw {Error} - If an error occurs while retrieving the posts.
   */
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

  /**
   * getPostById()
   * Retrieves a post by its ID.
   * @param {id} - Post ID
   * @return {Promise<PostModel>} - A promise that resolves to the retrieved post.
   * @throw {Error} - If an error occurs while retrieving the post.
   */
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

  /**
   * getPostsByUserId()
   * Retrieves posts by the user ID.
   * @param {userId} - User ID
   * @return {Promise<PostModel[]>} - A promise that resolves to an array of posts.
   * @throw {Error} - If an error occurs while retrieving the posts.
   */
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

  /**
   * updatePost()
   * Updates a post with the provided information.
   * @param {id, title, text, image} - The Post info.
   * @return {Promise<PostModel>} - A promise that resolves to the updated post.
   * @throw {Error} - If an error occurs while updating the post.
   */
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

  /**
   * deletePost()
   * Deletes a post by its ID.
   * @param {id} - Post ID to delete.
   * @return {Promise<PostModel>} - A promise that resolves to the deleted post.
   * @throw {Error} - If an error occurs while deleting the post.
   */
  async deletePost(id) {
    try {
      const deletedPost = await postModel.findByIdAndDelete(id);
      return deletedPost;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * addLike()
   * Adds a like to the specified post by the user.
   * @param {postId, userId} - Post ID and user ID.
   * @return {Promise<PostModel>} - A promise that resolves to the updated post.
   * @throw {Error} - If the post is not found or an error occurs while adding the like.
   */
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

  /**
   * addDislike()
   * Adds a dislike to the specified post by the user.
   * @param {postId, userId} - Post ID and User ID.
   * @return {Promise<PostModel>} - A promise that resolves to the updated post.
   * @throw {Error} - If the post is not found or an error occurs while adding the dislike.
   */
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

  /**
   * addComment()
   * Adds a comment to the specified post by the user.
   * @param {postId, userId, comment} - Post ID, User ID and comment text to add a comment.
   * @return {Promise<PostModel>} - A promise that resolves to the updated post.
   * @throw {Error} - If the post is not found or an error occurs while adding the comment.
   */
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

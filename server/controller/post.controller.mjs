import postService from "../service/post.service.mjs";

/**
 * createPost()
 * Controller function to create a new post.
 * @params {req, res} - The request and response object.
 * @returns {object} - success state and data of the created post or an error message.
 */
export const createPost = async (req, res) => {
  try {
    const { title, text, userId, image } = req.body;
    // const image = req.files.map((file) => file.filename);    
    const newPost = await postService.createPost(title, text, image, userId);
    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * getPosts()
 * Controller function to retrieve all posts.
 * @params {req, res} - The request and response object.
 * @returns {object} - success state and data of the retrieved posts or an error message.
 */
export const getPosts = async (req, res) => {
  try {
    const { userId, userType } = req.query;
    const posts = await postService.getPosts({ userId, userType});
    res.json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * getPostById()
 * Controller function to retrieve a post by its ID.
 * @params {req, res} - The request and response object.
 * @returns {object} - success state and data of the retrieved post or an error message.
 */
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postService.getPostById(id);
    if (!post) {
      return res.status(404).json({ success: false, error: "Post not found" });
    }
    res.json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * getPostsByUserId()
 * Controller function to retrieve all posts by a specific user.
 * @params {req, res} - The request and respose object.
 * @returns {object} - success state and data of the retrieved posts or an error message.
 */
export const getPostsByUserId = async (req, res) => {
  try {
    const { userId } = req.params; 
    const posts = await postService.getPostsByUserId(userId);
    if (!posts || posts.length === 0) {
      return res.status(404).json({ success: false, error: "No posts found for the user" });
    }
    res.json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * updatePost()
 * Controller function to update a post by its ID.
 * @params {req, res} - The request and response object.
 * @returns {object} - success state and data of the updated post or an error message.
 */
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, text, image } = req.body;
    // const image = req.files.map((file) => file.filename);
    const updatedPost = await postService.updatePost(id, title, text, image);
    if (!updatedPost) {
      return res.status(404).json({ success: false, error: "Post not found" });
    }
    res.json({ success: true, data: updatedPost });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * deletePost()
 * Controller function to delete a post by its ID.
 * @params {req, res} - The request and response object.
 * @returns {object} - success state and data of the deleted post or an error message.
 */
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await postService.deletePost(id);
    if (!deletedPost) {
      return res.status(404).json({ success: false, error: "Post not found" });
    }
    res.json({ success: true, data: deletedPost });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * likePost()
 * Controller function to add a like to a post.
 * @params {req, res} - The request and response object.
 * @returns {object} - success state and data of the post with the added like or an error message.
 */
export const likePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const post = await postService.addLike(id, userId);

    if (!post) {
      return res.status(404).json({ success: false, error: "Post not found" });
    }

    return res.json({ success: true, data: post });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * dislikePost()
 * Controller function to add a dislike to a post.
 * @params {req,res} - The request and response object.
 * @returns {object} - success state and data of the post with the added dislike or an error message.
 */
export const dislikePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const post = await postService.addDislike(id, userId);

    if (!post) {
      return res.status(404).json({ success: false, error: "Post not found" });
    }

    return res.json({ success: true, data: post });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * addComment()
 * Controller function to add a comment to a post.
 * @params {req,res} - The request and response object 
 * @returns {object} - success state and data of the post with the added comment or an error message.
 */
export const addComment = async (req, res) => {
  const { id } = req.params;
  const { userId, comment } = req.body;
  try {
    const post = await postService.addComment(id, userId, comment);
    if (!post) {
      return res.status(404).json({ success: false, error: "Post not found" });
    }
    res.json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to add comment" });
  }
};

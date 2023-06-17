import postService from "../service/post.service.mjs";

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

export const getPosts = async (req, res) => {
  try {
    const { userId, userType } = req.query;
    const posts = await postService.getPosts({ userId, userType});
    res.json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

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

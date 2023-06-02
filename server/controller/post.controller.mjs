import postService from "../service/post.service.mjs";

export const createPost = async (req, res) => {
  try {
    const { text, image, userId } = req.body;
    const newPost = await postService.createPost(text, image, userId);
    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await postService.getPosts();
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

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, image } = req.body;
    const updatedPost = await postService.updatePost(id, text, image);
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
  const { postId } = req.params;
  const { userId } = req.body;
  try {
    const post = await postService.addLike(postId, userId);
    if (!post) {
      return res.status(404).json({ success: false, error: "Post not found" });
    }
    res.json({success: true, data: post});
  } catch (error) {
    res.status(500).json({success: false, error: "Failed to add like" });
  }
};

export const rmlikePost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;
  try {
    const post = await postService.removeLike(postId, userId);
    if (!post) {
      return res.status(404).json({ success: false, error: "Post not found" });
    }
    res.json({success: true, data: post});
  } catch (error) {
    res.status(500).json({success: false, error: "Failed to remove like" });
  }
};

export const addComment = async (req, res) => {
  const { postId } = req.params;
  const { userId, comment } = req.body;
  try {
    const post = await postService.addComment(postId, userId, comment);
    if (!post) {
      return res.status(404).json({ success: false, error: "Post not found" });
    }
    res.json({success:true, data:post});
  } catch (error) {
    res.status(500).json({success:false, error: "Failed to add comment" });
  }
};
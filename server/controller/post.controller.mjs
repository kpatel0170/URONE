import postService from "../service/post.service.mjs";

export const createPost = async (req, res) => {
  try {
    const { title, text, userId } = req.body;
    const image = req.files.map((file) => file.filename);
    const newPost = await postService.createPost(title, text, image, userId);
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
    const { title, text } = req.body;
    const image = req.files.map((file) => file.filename);
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

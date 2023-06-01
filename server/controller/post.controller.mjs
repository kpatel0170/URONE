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

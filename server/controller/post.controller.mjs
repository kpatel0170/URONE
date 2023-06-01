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


};

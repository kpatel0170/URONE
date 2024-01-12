import React, { useState, useRef, useEffect } from "react";
import { Typography, Box, TextField, Avatar, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../../features/Post/PostSlice";
import { toast, Slide } from "react-toastify";
import styles from "./Comments.module.css";

const Comment = ({ comment }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const scrollCommentRef = useRef(null);
  const inputRef = useRef(null);

  const { isCommentLoading } = useSelector((state) => state.post);

  const [commentInput, setCommentInput] = useState("");
  const isEmpty = commentInput.trim().length === 0;
  const [firstTimeDisplay, setFirstTimeDisplay] = useState(true);
  const [isReadMore, setIsReadMore] = useState(true);

  const commentInputHandler = (event) => {
    setCommentInput(event.target.value);
  };

  const readMoreHandler = () => {
    setIsReadMore(!isReadMore);
  };

  const submitCommentHandler = (event) => {
    event.preventDefault();
    const data = {
      id: comment._id,
      userId: user._id,
      commentInput: commentInput
    };
    toast.success("Comment added successfully", {
      position: "bottom-right",
      hideProgressBar: true,
      autoClose: 1500,
      transition: Slide
    });
    dispatch(createComment(data));
    setCommentInput("");
    setFirstTimeDisplay(false);
  };

  useEffect(() => {
    inputRef.current.focus();
    if (!firstTimeDisplay && scrollCommentRef.current) {
      scrollCommentRef.current.scrollTop =
        scrollCommentRef.current.scrollHeight;
    }
  }, [comment.comments, firstTimeDisplay]);

  return (
    <Box sx={{ borderTop: 1, borderColor: "#dcdcdc", paddingTop: 3 }}>
      <form onSubmit={submitCommentHandler}>
        <Box sx={{ display: "flex", position: "relative" }}>
          <TextField
            id="commentInput"
            name="commentInput"
            inputRef={inputRef}
            type="text"
            value={commentInput}
            onChange={commentInputHandler}
            placeholder="Write your comment ..."
            sx={{ width: 1 }}
            className={styles.form_wrap}
            autoComplete="off"
          />
          <Button
            disabled={isEmpty}
            type="submit"
            sx={{ position: "absolute", right: "10px", top: "10px" }}
            className={styles.send_btn_wrap}
          >
            <SendIcon />
          </Button>
        </Box>
      </form>

      {comment.comments.length !== 0 ? (
        <Box
          ref={scrollCommentRef}
          sx={{ marginTop: 2, paddingRight: "20px" }}
          className={styles.comment_container}
        >
          {comment.comments.map((data) => (
            <Box
              key={data._id}
              className={styles.comment_items}
              sx={{
                marginBottom: 2,
                borderRadius: 2,
                padding: 2,
                background: "#e6e7ee"
              }}
            >
              <Box sx={{ marginBottom: 1 }}>
                {data.comment.length > 250 ? (
                  <>
                    {isReadMore ? (
                      <Typography
                        sx={{
                          fontSize: "0.875rem",
                          lineHeight: "1.3",
                          color: "#6e6f78"
                        }}
                      >
                        {data.comment.slice(0, 250) + `...`}
                        <span
                          onClick={readMoreHandler}
                          className={styles.readmore}
                        >
                          {" "}
                          read more
                        </span>
                      </Typography>
                    ) : (
                      <Typography
                        sx={{
                          fontSize: "0.875rem",
                          lineHeight: "1.3",
                          color: "#6e6f78"
                        }}
                      >
                        {data.comment}
                        <span
                          onClick={readMoreHandler}
                          className={styles.readmore}
                        >
                          {" "}
                          read less
                        </span>
                      </Typography>
                    )}
                  </>
                ) : (
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      lineHeight: "1.3",
                      color: "#6e6f78"
                    }}
                  >
                    {data.comment}
                  </Typography>
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center"
                }}
              >
                {data.userId?.profilePicture != undefined ? (
                  <Avatar
                    sx={{ width: 27, height: 27 }}
                    alt="profile"
                    src={data.userId?.profilePicture}
                  />
                ) : (
                  <Box
                    sx={{
                      background: "#f3f3f3",
                      width: "27px",
                      height: "27px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%"
                    }}
                  >
                    <PersonOutlineIcon />
                  </Box>
                )}
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontSize: "0.8rem",
                    fontWeight: "500",
                    paddingRight: 1,
                    paddingLeft: "5px",
                    color: "#5f6069"
                  }}
                >
                  {data.userId?.name}
                </Typography>
                <Box
                  sx={{
                    width: "3px",
                    height: "3px",
                    background: "#95969c",
                    borderRadius: "50%"
                  }}
                ></Box>
                <Typography
                  variant="subtitle1"
                  sx={{ fontSize: "0.8rem", lineHeight: "2.2", pl: 1 }}
                >
                  {data.at.slice(0, 10)}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography
          sx={{
            marginTop: 2,
            textAlign: "center",
            fontSize: "0.85rem",
            color: "#635e5e"
          }}
        >
          <span>Hey {user.name}, </span>
          be the first person to comment the post ...
        </Typography>
      )}
      {isCommentLoading && (
        <Box>
          <Typography variant="caption" sx={{ color: "#1976d2" }}>
            {" "}
            loading ...{" "}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Comment;

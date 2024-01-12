import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./PageNotFound.module.css";

function PageNotFound() {
  const navigate = useNavigate();

  const backToFeedsHandler = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        background: "#dcdcdc",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"
      }}
    >
      <Typography sx={{ fontSize: "14rem", fontWeight: "bold" }}>
        404
      </Typography>
      <Typography sx={{ fontSize: "1.2rem" }}>
        The page you requested could not be found.
      </Typography>
      <Button
        variant="contained"
        onClick={backToFeedsHandler}
        sx={{
          p: 1,
          borderRadius: "25px",
          width: 1,
          mt: 3,
          bgcolor: "#0e69d6",
          paddingLeft: 3,
          paddingRight: 3
        }}
      >
        Back to Newsfeed
      </Button>
    </Box>
  );
}

export default PageNotFound;

import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { userLogin, reset } from "../../features/Auth/AuthSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  InputAdornment
} from "@mui/material";
import styles from "./Login.module.css";
import Loading from "../../components/Loading/Loading";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // destructure the states
  const { user, temp, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { email, password } = formData;

  const [formError, setFormError] = useState({
    email: "",
    password: "",
    error: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
    if (isError) {
      if (message === "Invalid password") {
        setFormError({
          password: "Wrong password"
        });
      } else if (message === "User not found") {
        setFormError({
          email: "There is no user with this email address.",
          error:
            "No user has found with the email you provided. It seems like user has not registered yet."
        });
      }
    }

    if (isSuccess || user) {
      console.log("here...");
      if (isSuccess) {
        toast.success("Welcome to rOne!", {
          position: "bottom-right",
          hideProgressBar: true
        });
      }
      navigate("/");
    }

    if (temp) {
      console.log("temp user obtained", temp);
      setFormData({
        email: temp.data.email,
        password: ""
      });
    } else {
      console.log("no temp at the moment");
    }

    dispatch(reset());
  }, [user, temp, isError, isSuccess, message, navigate, dispatch]);

  const formInputHandler = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));

    setFormError({
      input_email: "",
      input_password: ""
    });
  };

  const formValidateHandler = (event) => {
    let { name, value } = event.target;
    setFormError((prev) => {
      const formInput = { ...prev, [name]: "" };

      console.log(formInput);

      switch (name) {
        case "email":
          if (!value || value.trim() === "") {
            formInput[name] = "Please enter an email address";
          } else {
            console.log(value);
          }
          break;

        case "password":
          if (!value) {
            formInput[name] = "Please enter password";
          } else if (value.length < 8) {
            formInput[name] = "Password must be 8 characters or more";
          } else {
            console.log(value);
          }
          break;

        default:
          break;
      }

      return formInput;
    });
  };

  const loginFormHandler = (event) => {
    event.preventDefault();

    if (email.trim() === "" || password.length === 0) {
      setFormError({
        email: "Please enter an email address",
        password: "Please enter password"
      });
    } else {
      console.log("valid");
      if (password.length < 8) {
        setFormError({
          password: "Password must be 8 characters or more"
        });
      } else {
        const userData = {
          email,
          password
        };
        dispatch(userLogin(userData));
      }
    }
  };

  const togglePasswordVisibility = (event) => {
    event.preventDefault();
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      {isLoading && <Loading />}
      <Grid
        container
        sx={{ height: "100vh", alignItems: "center", background: "#fff" }}
        className={styles.grid_wrap}
      >
        <Grid
          item
          xs={0}
          md={8}
          lg={8}
          className={`${styles.login_bg} ${styles.hide_sm}`}
          sx={{ height: "100%" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100vh",
              paddingX: 9
            }}
          >
            <Typography
              sx={{ fontSize: "11rem", fontWeight: "bold", color: "white" }}
            >
              rOne
            </Typography>
            <Typography sx={{ color: "white", width: 3 / 4 }}>
              Be the one to connect through rOne ...
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={7}
          md={4}
          lg={4}
          sx={{ px: 4, background: "#fff" }}
        >
          <Box sx={{ mb: 5, textAlign: "center" }}>
            <Typography
              sx={{ textAlign: "center", fontWeight: "bold", fontSize: "48px" }}
            >
              rOne
            </Typography>
            <Typography>Sign in to access your account</Typography>
          </Box>
          <form sx={{ width: 1 }} onSubmit={loginFormHandler}>
            <Box sx={{ mb: 2 }}>
              <Typography>Email</Typography>
              <TextField
                id="email"
                name="email"
                type="email"
                inputRef={inputRef}
                onChange={formInputHandler}
                onBlur={formValidateHandler}
                value={email}
                placeholder="Enter email"
                sx={{ width: 1 }}
                className={styles.user_input}
              />
              {formError.email && (
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "red",
                    fontWeight: "medium",
                    fontSize: "0.9rem",
                    lineHeight: "1.2",
                    paddingTop: "4px"
                  }}
                >
                  {formError.email}
                </Typography>
              )}
            </Box>
            <Box>
              <Typography>Password</Typography>
              <TextField
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={formInputHandler}
                onBlur={formValidateHandler}
                value={password}
                placeholder="********"
                sx={{ width: 1 }}
                className={styles.user_input}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {showPassword ? (
                        <VisibilityOff
                          onClick={togglePasswordVisibility}
                          style={{ cursor: "pointer" }}
                        />
                      ) : (
                        <Visibility
                          onClick={togglePasswordVisibility}
                          style={{ cursor: "pointer" }}
                        />
                      )}
                    </InputAdornment>
                  )
                }}
              />
              {formError.password && (
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "red",
                    fontWeight: "medium",
                    fontSize: "0.9rem",
                    lineHeight: "1.2",
                    paddingTop: "4px"
                  }}
                >
                  {formError.password}
                </Typography>
              )}
              {/* <Typography variant="subtitle2" sx={{fontWeight: 'regular', fontSize: '0.9rem', lineHeight: '1.2', paddingTop: '4px' }}>At least 8 characters</Typography> */}
            </Box>
            {formError.error && (
              <Typography
                variant="subtitle1"
                sx={{
                  color: "red",
                  fontWeight: "medium",
                  fontSize: "0.9rem",
                  lineHeight: "1.2",
                  paddingTop: "4px"
                }}
              >
                {formError.error}
              </Typography>
            )}
            <Box>
              <Button
                variant="contained"
                sx={{
                  p: 1,
                  borderRadius: "25px",
                  width: 1,
                  mt: 3,
                  bgcolor: "#0e69d6",
                  boxShadow: 0
                }}
                type="submit"
              >
                Sign In
              </Button>
            </Box>
          </form>
          <Box sx={{ borderTop: 1, mt: 4, mb: 4, borderColor: "#dedede" }}>
            {/* <Button variant="outlined" sx={{ mt: 4, mb: 2, p:1, width: 1, borderRadius: '25px', border: 1, borderColor: '#dedede' }}>
                            Sign In with Google
                        </Button> */}
            <Link to="/register">
              <Button
                variant="outlined"
                sx={{
                  mt: 4,
                  p: 1,
                  width: 1,
                  borderRadius: "25px",
                  border: 2,
                  borderColor: "#dedede"
                }}
                className={styles.button_wrap}
              >
                New to rOne? Join now
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;

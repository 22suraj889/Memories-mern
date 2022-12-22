import React, { useState } from "react";
import {
  Avatar,
  Paper,
  Grid,
  Container,
  Typography,
  Button,
} from "@material-ui/core";
import useStyles from "./styles";
import Input from "./Input";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup, signin } from "../../Actions/Auth";
import jwtDecode from "jwt-decode";
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const switchMode = () => {
    setIsSignUp(!isSignUp);
    setShowPassword(false);
  };
  const googleSuccess = async (res) => {
    var user_object = jwt_decode(res.credential);
    console.log(jwtDecode(res.credential));
    console.log(res.credential.split(" ")[1]);
    let user_obj = {
      result: {
        name: user_object.name,
        email: user_object.email,
        picture: user_object.picture,
        googleId: user_object.sub,
      },
      token: res.credential,
    };
    // console.log(user_obj);
    try {
      dispatch({ type: "AUTH", payload: user_obj });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleError = (error) => {
    console.log(error);
    console.log("Can't Sign In using Google");
  };
  return (
    <GoogleOAuthProvider clientId="16964127075-jumekmpd2vondqvqcfrqbhtie66bvvm2.apps.googleusercontent.com">
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">
            {isSignUp ? "Sign up" : "Sign in"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignUp && (
                <>
                  <Input
                    name="firstName"
                    label="First Name"
                    handleChange={handleChange}
                    autoFocus
                    half
                  />
                  <Input
                    name="lastName"
                    label="Last Name"
                    handleChange={handleChange}
                    half
                  />
                </>
              )}
              <Input
                name="email"
                label="Email"
                handleChange={handleChange}
                type="email"
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
              {isSignUp && (
                <Input
                  name="confirmPassword"
                  label="Confirm Password"
                  handleChange={handleChange}
                  type="password"
                />
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
            <GoogleLogin
              clientId="16964127075-s0c5noibbr8aac6ihegffijk85b64d5h.apps.googleusercontent.com"
              onSuccess={(res) => googleSuccess(res)}
              onError={(error) => googleError(error)}
            />

            <Grid Container justify="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignUp
                    ? "Already have an account? Sign In"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </GoogleOAuthProvider>
  );
};

export default Auth;

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Paper,
  Avatar,
  Button,
  FormControl,
  Input,
  InputLabel,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link, withRouter, Redirect } from "react-router-dom";
import firebase from "../../helpers/firebase";
import { create } from "../../helpers/ajax";

const useStyles = makeStyles((theme) => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
}));

function Login({ history }) {
  const classes = useStyles();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  // const [redirect, setRedirect] = useState(false)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    let body = {
      userName: user,
      password: password,
    };
    console.log(body);
    create(`users/getuser`, body)
      .then(async (res) => {
        console.log("got hree", res);
        let id = res[0].user_id;
        console.log(id);
        localStorage.setItem("rememberMe", rememberMe);
        localStorage.setItem("user", rememberMe ? user : "");
        localStorage.setItem("id", id);
        history.push("/home");
      })
      .catch((err) => {
        console.log();
      });
  };

  useEffect(() => {
    let rememberMeValue = localStorage.getItem("rememberMe");
    let userValue = localStorage.getItem("user");
    if (rememberMeValue) history.push("/home");
  }, []);

  return (
    <main className={classes.main}>
      {/* {redirect && 
      <Redirect to={`./Home`} />
      }   */}
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleFormSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="User">User</InputLabel>
            <Input
              id="user"
              name="user"
              autoComplete="off"
              autoFocus
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <label>
            <input
              name="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.value)}
              type="checkbox"
            />
            Remember me
          </label>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            // onClick={login}
            className={classes.submit}
          >
            Sign in
          </Button>
          {/* <Button
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						component={Link}
						to="/register"
						className={classes.submit}>
						Register
          			</Button> */}
        </form>
      </Paper>
    </main>
  );

  // async function login() {
  // 	try {
  // 		await firebase.login(email, password)
  // 		props.history.replace('/dashboard')
  // 	} catch(error) {
  // 		alert(error.message)
  // 	}
  // }
}

export default Login;

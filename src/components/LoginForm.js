import React from "react";
import { Auth } from "aws-amplify";
import { styles } from "./LoginFormStyles";
import moment from "moment";
import CircleLoader from "./shared/CircleLoader";
import PlaceholderLogo from "../assets/images/placeholderlogo.svg";

export class LoginFormTwo extends React.Component {
  state = {
    username: "",
    password: "",
    email: "",
    confirmationCode: "",
    signingUp: false,
    confirming: false,
    errorMessage: "",
    loader: false
  };

  // Sign in function for exisiting users
  signIn = async ({ username, password }) => {
    const { userLoggedIn, updateUsername } = this.props;
    this.setState({ loader: true });
    try {
      await Auth.signIn(username, password).then(data => {
        const timeAuthExpires = moment
          .unix(data.signInUserSession.accessToken.payload.exp)
          .format("h:mm:ss A");
        localStorage.setItem("authExpires", timeAuthExpires);
        updateUsername(data.username);
        userLoggedIn();
      });
    } catch (err) {
      this.setState({ loader: false });
      console.error(err.message);
      this.setState({ errorMessage: err.message });
    }
  };
  // Initial sign up for new users
  signUp = async ({ username, password, email }) => {
    try {
      await Auth.signUp({
        username,
        password,
        attributes: { email }
      });
      console.log("sign up success!");
      this.setState({ confirming: true });
    } catch (err) {
      console.error(err.message);
      this.setState({ errorMessage: err.message });
    }
  };
  // Sign up confirmation after getting email confirmation code
  confirmSignUp = async ({ username, confirmationCode }) => {
    const { userLoggedIn } = this.props;
    try {
      await Auth.confirmSignUp(username, confirmationCode);
      console.log("confirm sign up success!");
      this.setState({ confirming: false, signingUp: false });
      localStorage.setItem("username", username);
      userLoggedIn();
    } catch (err) {
      console.error(err.message);
      this.setState({ errorMessage: err.message });
    }
  };
  render() {
    const {
      username,
      password,
      email,
      signingUp,
      confirming,
      confirmationCode,
      errorMessage
    } = this.state;
    const { loggedIn } = this.props;

    return (
      <div style={styles.container}>
        <img
          alt="generic placeholder logo"
          src={PlaceholderLogo}
          style={{ height: "250px", width: "500px" }}
        ></img>

        {!loggedIn && !signingUp ? (
          <React.Fragment>
            <input
              name="username"
              onChange={e => {
                this.setState({ username: e.target.value });
              }}
              style={styles.input}
              placeholder="username"
            />
            <input
              type="password"
              name="password"
              onChange={e => {
                this.setState({ password: e.target.value });
              }}
              style={styles.input}
              placeholder="password"
            />
            <button
              style={styles.button}
              onClick={() => this.signIn({ username, password })}
            >
              {!this.state.loader && <p>Sign In</p>}
              {this.state.loader && <CircleLoader />}
            </button>
            <p style={styles.footer}>
              Need an account?{" "}
              <span
                style={styles.anchor}
                onClick={() => this.setState({ signingUp: true })}
              >
                Sign Up
              </span>
            </p>
            <p style={styles.footer}>
              Still need to confirm?{" "}
              <span
                style={styles.anchor}
                onClick={() =>
                  this.setState({ confirming: true, signingUp: true })
                }
              >
                Click Here
              </span>
            </p>
            <p style={{ color: "red" }}>{errorMessage}</p>
          </React.Fragment>
        ) : (
          false
        )}

        {signingUp && !confirming ? (
          <React.Fragment>
            <input
              name="username"
              onChange={e => {
                this.setState({ username: e.target.value });
              }}
              style={styles.input}
              placeholder="username"
            />
            <input
              type="password"
              name="password"
              onChange={e => {
                this.setState({ password: e.target.value });
              }}
              style={styles.input}
              placeholder="password"
            />
            <input
              name="email"
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
              style={styles.input}
              placeholder="email"
            />
            <button
              style={styles.button}
              onClick={() => this.signUp({ username, password, email })}
            >
              {!this.state.loader && <p>Sign Up</p>}
              {this.state.loader && <CircleLoader />}
            </button>
            <p style={styles.footer}>
              Already have an account?{" "}
              <span
                style={styles.anchor}
                onClick={() =>
                  this.setState({ signingUp: false, errorMessage: "" })
                }
              >
                Go Back
              </span>
            </p>
            <p style={{ color: "red" }}>{errorMessage}</p>
            <p style={styles.footer}>
              Usernames can be an email or custom name but must not contain any
              spaces
            </p>
          </React.Fragment>
        ) : (
          false
        )}

        {confirming && (
          <React.Fragment>
            <input
              name="confirmationCode"
              placeholder="Confirmation Code"
              onChange={e => {
                this.setState({ confirmationCode: e.target.value });
              }}
              style={styles.input}
            />
            <input
              name="username"
              placeholder="Username"
              onChange={e => {
                this.setState({ username: e.target.value });
              }}
              style={styles.input}
            />
            <button
              style={styles.button}
              onClick={() => this.confirmSignUp({ username, confirmationCode })}
            >
              Confirm Sign Up
            </button>
            <p style={styles.footer}>
              Already have an account?{" "}
              <span
                style={styles.anchor}
                onClick={() =>
                  this.setState({
                    confirmationCode: "",
                    signingUp: false,
                    confirming: false,
                    errorMessage: ""
                  })
                }
              >
                Go Back
              </span>
            </p>
            <p style={{ color: "red" }}>{errorMessage}</p>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default LoginFormTwo;

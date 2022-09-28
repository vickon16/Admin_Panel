import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Error from "../../components/error/Error";
import ReactLoader from "../../components/reactLoader/ReactLoader";
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../firebase-config";
import "./login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    userCredentials: { isLoading, error },
    setUserError,
    setUserLoading,
  } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserLoading(true);
    setUserError("");

    if (!email || !password) {
      setUserError("Please Fill Out the fields");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      setUserLoading(false);
      e.target.reset();
      navigate("/")
    })
    .catch((err) => {
      setUserLoading(false);
      setUserError(err.message);
    });
  };

  return (
    <section className="login">
      <div className="loginWrapper">
        <div className="title">Login</div>
        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              value={email}
              id="email"
              placeholder="Your Email..."
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="password">Password :</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {isLoading ? <ReactLoader /> : <button>Login</button>}
          <div className="bottomText">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
          <Error error={error} />
        </form>
      </div>
    </section>
  );
};

export default Login;

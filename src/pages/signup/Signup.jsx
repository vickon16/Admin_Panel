import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Error from "../../components/error/Error";
import ReactLoader from "../../components/reactLoader/ReactLoader";
import { useAuth } from "../../context/AuthContext";
import { auth, userCollectionRef } from "../../firebase-config";
import "./signup.scss";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState("");
  const {
    userCredentials: { isLoading, error },
    setUserError,
    setUserLoading,
    uploadImgFunction,
  } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserLoading(true);
    setUserError("");

    if (!fullName || !email || !password || !file) {
      setUserError("Please Fill Out the fields");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const fileName = new Date().getTime() + file.name;
        
        uploadImgFunction( file, `images/admin-users/${fileName}`,
          (downloadURL) => {
            setDoc(doc(userCollectionRef, res.user.uid), {
              fullName,
              email,
              createdAt: Timestamp.now(),
              image: { name: file.name, imageURL: downloadURL },
              users: [],
              products: [],
            })
              .then(() => {
                setUserLoading(false);
                e.target.reset();
                navigate("/");
              })
              .catch((err) => {
                setUserLoading(false);
                setUserError(err.message, "Failed to Data to Document");
              });
          }
        );
      })
      .catch((err) => {
        setUserLoading(false);
        setUserError(err.message, "Sign up Failed");
      });
  };

  return (
    <section className="signup">
      <div className="signupWrapper">
        <div className="title">Sign up</div>
        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label htmlFor="fullName">FullName :</label>
            <input
              type="text"
              value={fullName}
              id="fullName"
              placeholder="Your FullName..."
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
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
          <div className="inputGroup">
            <label htmlFor="file">Add an Image :</label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>
          {isLoading ? <ReactLoader /> : <button>Sign up</button>}
          <div className="bottomText">
            Already have an account? <Link to="/login">Log in</Link>
          </div>
          <Error error={error} />
        </form>
      </div>
    </section>
  );
};

export default Signup;

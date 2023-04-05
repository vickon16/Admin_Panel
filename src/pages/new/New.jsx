import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import Error from "../../components/error/Error";
import ReactLoader from "../../components/reactLoader/ReactLoader";
import { useAuth } from "../../context/AuthContext";
import { userCollectionRef } from "../../firebase-config";
import "./new.scss";

const New = ({ tag, inputs }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const {
    userCredentials: { user, isLoading, error },
    setUserError,
    setUserLoading,
    uploadImgFunction,
  } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    setUserLoading(true);
    setUserError("");
    e.preventDefault();

    if (!file) {
      setUserLoading(false);
      setUserError("Please, Enter an Image");
      return;
    }

    //update data based on the current user account
    const fileName = new Date().getTime() + file.name;
    if (tag === "user") {
      uploadImgFunction( file, `images/admin-users/users/${fileName}`,
        async (downloadURL) => {
          const docRef = doc(userCollectionRef, user.id);
          const document = await getDoc(docRef);
          const users = document.data().users;
  
          const urlAddedToData = {
            ...data,
            image: { name: fileName, imageURL: downloadURL },
            createdAt : Timestamp.now(),
            id : uid(25)
          };
  
          updateDoc(docRef, {
            users: [...users, urlAddedToData],
            createdAt: Timestamp.now(),
          })
            .then(() => {
              setUserLoading(false);
              navigate("/users");
            })
            .catch((err) => {
              setUserLoading(false);
              setUserError(err.message, "Failed to Send Data");
            });
        }
      );
    } else if (tag === "product") {
      uploadImgFunction( file, `images/admin-users/products/${fileName}`,
        async (downloadURL) => {
          const docRef = doc(userCollectionRef, user.id);
          const document = await getDoc(docRef);
          const products = document.data().products;

          const urlAddedToData = {
            ...data,
            image: { name: fileName, imageURL: downloadURL },
            id: uid(25),
          };

          updateDoc(docRef, {
            products: [...products, urlAddedToData],
            createdAt: Timestamp.now(),
          })
            .then(() => {
              setUserLoading(false);
              navigate("/products");
            })
            .catch((err) => {
              setUserLoading(false);
              setUserError(err.message, "Failed to Send Data");
            });
        }
      );
    } else {
      setUserError("No Tag Matches")
    }
  };

  return (
    <section className="new">
      <div className="top">
        <h1>{tag === "user" ? "Add New User" : "Add New Products"}</h1>
      </div>
      <div className="bottom">
        <label className="left" htmlFor="file">
          <img
            src={file ? URL.createObjectURL(file) : "/images/no-image-icon.jpg"}
            alt="no-img"
          />
        </label>
        <div className="right">
          <form onSubmit={handleSubmit}>
            <div className="formInput">
              <label htmlFor="file">
                Image <DriveFolderUploadOutlined className="icon" />
              </label>
              <input
                type="file"
                id="file"
                accept="image/gif, image/jpeg, image/png"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            {inputs.map((input) => (
              <div className="formInput" key={input.id}>
                <label>{input.label}</label>
                <input
                  type={input.type}
                  placeholder={input.placeholder}
                  name={input.id}
                  onChange={handleInputChange}
                  required
                />
              </div>
            ))}
            {isLoading ? <ReactLoader /> : <button>Send</button>}
            <Error error={error} />
          </form>
        </div>
      </div>
    </section>
  );
};

export default New;

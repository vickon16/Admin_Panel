/* eslint-disable react-hooks/exhaustive-deps */
import { onAuthStateChanged} from "firebase/auth";
import { onSnapshot} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { createContext, useContext, useEffect, useState } from "react";
import Loader from "../components/loader/Loader";
import { auth, storage, userCollectionRef} from "../firebase-config";

const InitialState = {
  user : null,
  userData : null,
  isLoading : false,
  error : ""
};

const UserAuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userCredentials, setUserCredentials] = useState(InitialState);
  const [loading, setLoading] = useState(true);

   const setUserLoading = (state) => {
     setUserCredentials((prev) => ({ ...prev, isLoading: state }));
   };


  const setUserError = (error) => {
    setUserCredentials(prev => ({...prev, error}));

    setTimeout(() => {
      setUserCredentials((prev) => ({ ...prev, error : "" }));
    }, 3000)
  }

  

  useEffect(() => {
    const singleUserQueryData = () => {
      if (userCredentials.user === null) return;

      const id = userCredentials.user.id;

      const unSub = onSnapshot(userCollectionRef, (snapshot) => {
        const userData = snapshot.docs.find((doc) => doc.id === id);

        if (!userData || userData === null) {
          setUserCredentials((prev) => ({
            ...prev,
            userData: {
              email: "Username@gmail.com",
              fullName: "Username",
              image: { name: "", imageURL: "/images/john-doe.png" },
              users: [],
              products: [],
            },
          }));
          return;
        }

        const fullUserData = { id: userData.id, ...userData.data() };
        setUserCredentials((prev) => ({ ...prev, userData: fullUserData }));
      });

      return unSub;
    };

    return singleUserQueryData();
  }, [userCredentials.user]);

  const uploadImgFunction = (file, path, callback) => {
    const storageRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");

          switch (snapshot.state) {
            case "running":
              console.log("Upload is running");
              break;
            default:
              console.log("Nothing is Happening right now");
          }
        }, (error) => {
          setUserError(error.message, "Failed to Store Image");
        }, () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            return callback(downloadURL)
          });
        }
      );
  }

  

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {

      if (user) {
        setUserCredentials(prev => ({
          ...prev,
          user : {...prev.user, id : user.uid, email : user.email}
        }))
        setLoading(false);

      } else {
        setUserCredentials(prev => ({
          ...prev,
          user : null
        }))
        setLoading(false);
      }
    })

    return unSub;
  }, [])

  console.log(userCredentials);


  return (
    <UserAuthContext.Provider
      value={{
        userCredentials,
        setUserError,
        setUserLoading,
        uploadImgFunction,
      }}>
      {!loading ? children : <Loader />}
    </UserAuthContext.Provider>
  );
};

export const useAuth = () => useContext(UserAuthContext);

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { productInputs, userInputs } from "./data/formSource";
import "./style/dark.scss";
import Layout from "./pages/layout/Layout";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { userCredentials : {user} } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          user !== null ? <Navigate to="/" /> : <Login />
        }/>
        <Route path="/signup" element={<Signup />} />

        <Route exact path="/" element={
          user === null ? <Navigate to="/signup" /> : <Layout />
        }>
          <Route index element={<Home />} />

          <Route path="users">
            <Route index element={<List tag="user" />} />
            <Route path=":id" element={<Single tag="user" />} />
            <Route
              path="new"
              element={<New inputs={userInputs} tag="user" />}
            />
          </Route>

          <Route path="products">
            <Route index element={<List tag="product" />} />
            <Route path=":id" element={<Single tag="product" />} />
            <Route
              path="new"
              element={<New inputs={productInputs} tag="product" />}
            />
          </Route>
        </Route>

        <Route path="/*" element={<h2>Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

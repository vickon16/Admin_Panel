import "./sidebar.scss";
import { Dashboard, Group, Inventory, ListAlt, QueryStats, Notifications, MonitorHeart, BrandingWatermark, Settings, AccountBox, Logout, CloseOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useMode } from "../../context/ModeContext";
import { useAuth } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";

const Sidebar = () => {
  const {mode, darkModeFunc, lightModeFunc, closeNavFunc} = useMode();
  const {userCredentials : {userData}} = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)().then(() => {
      console.log("signed out");
      closeNavFunc();
      navigate("/login");
    });
  };

  return (
    <aside className={`sidebar ${mode.isNavOpen && "open"}`}>
      <div className="top">
        <Link to="/">
          <span className="logo">
            {userData.fullName.split(" ")[0].trim()} Admin
          </span>
        </Link>
        <CloseOutlined className="close" onClick={closeNavFunc} />
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" onClick={closeNavFunc}>
            <Dashboard />
            <span>Dashboard</span>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/users" onClick={closeNavFunc}>
            <Group />
            <span>Users</span>
          </Link>
          <Link to="/products" onClick={closeNavFunc}>
            <Inventory />
            <span>Products</span>
          </Link>
          <Link to="/" onClick={closeNavFunc}>
            <ListAlt />
            <span>Orders</span>
          </Link>
          <p className="title">USEFUL</p>
          <Link to="/" onClick={closeNavFunc}>
            <QueryStats />
            <span>Stats</span>
          </Link>
          <Link to="/" onClick={closeNavFunc}>
            <Notifications />
            <span>Notifications</span>
          </Link>
          <p className="title">SERVICES</p>
          <Link to="/" onClick={closeNavFunc}>
            <MonitorHeart />
            <span>System Health</span>
          </Link>
          <Link to="/" onClick={closeNavFunc}>
            <BrandingWatermark />
            <span>Logs</span>
          </Link>
          <Link to="/" onClick={closeNavFunc}>
            <Settings />
            <span>Settings</span>
          </Link>
          <p className="title">USER</p>
          <Link to="/" onClick={closeNavFunc}>
            <AccountBox />
            <span>Profile</span>
          </Link>
          <Link to="/" onClick={handleSignOut}>
            <Logout />
            <span>Logout</span>
          </Link>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption" onClick={lightModeFunc}></div>
        <div className="colorOption" onClick={darkModeFunc}></div>
      </div>
    </aside>
  );
};

export default Sidebar;

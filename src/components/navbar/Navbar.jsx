import "./navbar.scss"
import { SearchOutlined, LanguageOutlined, DarkModeOutlined, FullscreenExitOutlined, NotificationsNoneOutlined, ChatBubbleOutlineOutlined, ListOutlined } from "@mui/icons-material";
import { useMode } from "../../context/ModeContext";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const {toggleModeFunc, openNavFunc} = useMode();
  const {userCredentials : {userData}} = useAuth();

  return (
    <nav className="navbar">
      <div className="wrapper">
        <article className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlined />
        </article>
        <article className="items">
          <div className="item">
            <LanguageOutlined />
          </div>
          <div className="item" onClick={toggleModeFunc}>
            <DarkModeOutlined />
          </div>
          <div className="item">
            <FullscreenExitOutlined />
          </div>
          <div className="item">
            <NotificationsNoneOutlined />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlined />
            <div className="counter">2</div>
          </div>
          <div className="item mobile">
            <img src={userData.image.imageURL || "/images/john-doe.png"} alt="avatar" className="avatar" />
          </div>
          <div className="item mobile hamburger" onClick={openNavFunc}>
            <ListOutlined />
          </div>
        </article>
      </div>
    </nav>
  );
}

export default Navbar

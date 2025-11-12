import { Link } from "react-router-dom";
import logo from "../../public/naa_logo_favicon 1.png";
import userProfile from "../assets/images/7fb2e59687c36f6e4c816f11f86c3aba31c38c90.jpg";
const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="logo" />
              <span>NAA Control Panel</span>
            </Link>
          </div>
          <div className="pagesAndSettingBox">
            <nav className="navBar">
              <select>
                <option>NAA website</option>
                <option>Post</option>
                <option>Media Library</option>
                <option>System Settings</option>
              </select>
              <select name="" id="">
                <option value="">Library</option>
              </select>
              <select name="" id="">
                <option value="">Meteorology</option>
              </select>
              <select name="" id="">
                <option value="">Museum</option>
              </select>
            </nav>
            <div className="settingsAndAdminProfile">
              <div className="settings">Settings</div>
              <div className="userProfile">
                <div className="adminImage">
                  <img src={userProfile} alt="profile" />
                </div>
                <div className="adminInfos">
                  <p>Khayal Ahmadli</p>
                  <p>khahmadli</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

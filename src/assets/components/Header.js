import logo from "../images/logo.png";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header>
      <div className="logo" onClick={() => navigate("/")}>
        <img src={logo} alt="" />
      </div>
      <nav>
        <Link to={"/"} className="link">
          Personnages
        </Link>
        <Link to={"/comics"} className="link">
          Comics
        </Link>
        <Link to={"/"} className="link">
          Favoris
        </Link>
      </nav>
    </header>
  );
};

export default Header;

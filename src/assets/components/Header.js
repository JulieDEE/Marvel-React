import logo from "../images/logo.png";
import { useNavigate, Link } from "react-router-dom";

const Header = ({ token }) => {
  console.log(token);
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
        {token ? (
          <Link to={"/profil"} className="link">
            Profil
          </Link>
        ) : (
          <>
            <Link to={"/signup"} className="link ">
              S'inscrire
            </Link>
            <Link to={"/login"} className="link ">
              Se connecter
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;

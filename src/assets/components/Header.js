import logo from "../images/logo.png";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Header = ({ token }) => {
  const navigate = useNavigate();
  const [navMenuOpen, setNavMenuOpen] = useState(false); 

  const handleNav = () => {
  setNavMenuOpen(true)
}

  return (
    <>
      <div className= {navMenuOpen ? "phone-nav show" : "phone-nav"}>
        <div onClick={(() => {setNavMenuOpen(false)})} className="close">
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
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
      </div>

      <header>
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="" />
        </div>
        <div onClick={handleNav} className="nav-phone">
          <FontAwesomeIcon icon="fa-solid fa-bars" />
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
    </>
  );
};

export default Header;

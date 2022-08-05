import { useState } from "react";
import marvel from "../images/marvel.jpeg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Signup = ({ token, setToken, setUserId }) => {
  const navigate = useNavigate();
  // STATES INPUTS :
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState(null);

  // FORM SUBMIT :
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (userName && email && password && picture) {
        const formdata = new FormData();
        formdata.append("picture", picture);
        formdata.append("username", userName);
        formdata.append("password", password);
        formdata.append("email", email);

        const response = await axios.post(
          "https://marvelbackend-01.herokuapp.com/user/signup",
          formdata
        );
        setToken(response.data.token);
        Cookies.set("token", response.data.token);
        setUserId(response.data._id);
        Cookies.set("userId", response.data._id);
        navigate("/profil");
      }
    } catch (error) {}
  };

  return (
    <section className="signup">
      <h1>Créer votre compte</h1>

      <div className="signup-container">
        <form onSubmit={handleSubmit}>
          <div className="elements">
            <div className="input-wrap">
              <h3>PSEUDO :</h3>
              <input
                type="text"
                placeholder="Hulk6324"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
            <div className="input-wrap">
              <h3>ADRESSE MAIL :</h3>
              <input
                type="email"
                placeholder="adresse@mail.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="input-wrap">
              <h3>MOT DE PASSE :</h3>
              <input
                type="password"
                placeholder="m.banner"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="input-wrap">
              <h3>AVATAR :</h3>
              <label className="add-picture" htmlFor="addPicture">
                <span>
                  <FontAwesomeIcon icon="fa-solid fa-plus" />
                </span>
                Ajouter une image
                <input
                  type="file"
                  id="addPicture"
                  placeholder="Ajouter une photo de profil"
                  onChange={(e) => {
                    setPicture(e.target.files[0]);
                    setPreview(URL.createObjectURL(e.target.files[0]));
                  }}
                />
              </label>
            </div>
            <div className="preview">
              {preview ? (
                <img src={preview} alt="" />
              ) : (
                <img src={marvel} alt="" />
              )}
            </div>
          </div>
          <div className="btn-container">
            <div className="hidden"></div>
            <button type="submit">Valider l'inscription</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;

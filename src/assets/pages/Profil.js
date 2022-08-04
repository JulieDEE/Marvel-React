import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Profil = ({ userId, setFavCharac, favChara, setToken, setUserId }) => {
  const [LoadChara, setLoadChara] = useState(true);
  const navigate = useNavigate();

  // AXIOS REQUEST PROFIL DATABASE BY USERID
  useEffect(() => {
    // CHECK FOR DB CHARACTERS
    const favoritesData = async () => {
      const response = await axios.get(
        `http://localhost:4100/profil?id=${userId}`
      );
      console.log(response.data);
      setFavCharac(response.data);
      setLoadChara(false);
    };

    favoritesData();
  }, [userId]);

  // DECONNEXION
  const handleDeconnect = () => {
    Cookies.remove("token");
    setToken(null);
    Cookies.remove("userId");
    setUserId(null);
    navigate("/");
  };

  // RETURN //

  return LoadChara ? null : (
    <section className="profil wrapper">
      <nav>
        <h1>
          Bonjour <span>{favChara[0].owner.account.username} </span> !
        </h1>
        <button onClick={handleDeconnect}>Deconnexion</button>
      </nav>

      <div className="profil-wrapper">
        <div className="left-container">
          <div className="favorites">
            <h2>Vos Personnages préférés : </h2>
            <div className="fav-container">
              {favChara.map((character) => {
                return (
                  <div className="favChar-card">
                    <h1> {character.name} </h1>
                    <div className="image">
                      <img src={character.picture} alt="" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="favorites">
            <h2>Vos Comics préférés</h2>
          </div>
        </div>

        <div className="right-container">
          <h1>Vos informations</h1>
          <div className="avatar-flex">
            <div className="avatar">
              <img src={favChara[0].owner.account.avatar.secure_url} alt="" />
            </div>
          </div>
          <div className="flex-container">
            <div className="info-container">
              <span className="title">Votre email : </span>
              <span className="dynamic">{favChara[0].owner.email}</span>
            </div>
            <div className="info-container">
              <span className="title">Pseudo : </span>
              <span className="dynamic pseudo">
                {favChara[0].owner.account.username}
              </span>
            </div>
          </div>

          <div className="avatar-flex">
            <button>Modifier votre avatar</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profil;

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Profil = ({ userId, setToken, setUserId }) => {
  const [LoadChara, setLoadChara] = useState(true);
  const [loadInfos, setLoadInfos] = useState(true);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  // AXIOS REQUEST FOR USER INFO :
  useEffect(() => {
    const data = async () => {
      const response = await axios.get(
        `https://marvelbackend-01.herokuapp.com/user/infos?id=${userId}`
      );
      setUserInfo(response.data);
      setLoadInfos(false);
    };
    data();
  }, [userId]);

  // AXIOS REQUEST PROFIL DATABASE BY USERID
  useEffect(() => {
    const favoritesData = async () => {
      const response = await axios.get(
        `https://marvelbackend-01.herokuapp.com/profil?id=${userId}`
      );
      setData(response.data);
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

  return LoadChara && loadInfos ? null : (
    <section className="profil wrapper">
      <nav>
        <h1>
          Bonjour <span>{userInfo?.account?.username} </span> !
        </h1>
        <button onClick={handleDeconnect}>Deconnexion</button>
      </nav>

      <div className="profil-wrapper">
        <div className="left-container">
          <div className="favorites">
            <h2>Vos Personnages préférés : </h2>
            <div className="fav-container">
              {data.map((character, index) => {
                return (
                  <div key={index} className="favChar-card">
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
              <img src={userInfo.account.avatar.secure_url} alt="" />
            </div>
          </div>
          <div className="flex-container">
            <div className="info-container">
              <span className="title">Votre email : </span>
              <span className="dynamic">{userInfo.email}</span>
            </div>
            <div className="info-container">
              <span className="title">Pseudo : </span>
              <span className="dynamic pseudo">
                {userInfo.account.username}
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

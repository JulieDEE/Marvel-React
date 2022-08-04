import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = ({ token, setToken, setUserId}) => {
  // STATES //
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();

  // SUBMIT FORM //
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4100/user/login", {
        email,
        password,
      });
      setToken(response.data.token);
        Cookies.set("token", response.data.token);
        setUserId(response.data.id); 
        Cookies.set("userId", response.data.id);
        navigate("/profil");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="login">
      <h1>Connectez-vous</h1>

      <div className="signup-container">
        <form onSubmit={handleSubmit}>
          <div className="elements">
            <div className="input-wrap">
              <h3>ADRESSE MAIL :</h3>
              <input
                type="email"
                placeholder="Hulk6324"
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
          </div>
          <div className="btn-container">
            <button type="submit">Connexion</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;

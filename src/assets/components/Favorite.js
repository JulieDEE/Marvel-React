import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import heart from "../images/heart.png";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Favorite = ({ data, token, userId }) => {
  const navigate = useNavigate();
  const [love, setLove] = useState(false);
    const [inDataBase, setInDataBase] = useState();
    

  // CHECK FOR DB CHARACTERS

  useEffect(() => {
    const favoritesData = async () => {
      const response = await axios.get(
        `http://localhost:4100/profil?id=${userId}`
      );
        setInDataBase(response.data);
        
    };
    favoritesData();
  }, [userId]);
    
    console.log(inDataBase);


  // ADD TO FAVORITE //

  const handleFav = async (data) => {
      if (token) {
      
      setLove(data._id);
      Cookies.set("love", data._id);

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append(
        "picture",
        `${data.thumbnail.path}.${data.thumbnail.extension}`
      );
      formData.append("id", data._id);

      const response = await axios.post(
        "http://localhost:4100/charac/favorites",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } else {
      navigate("/login");
    }
  };

  return (
    <div
      className="icon"
      onClick={() => {
        handleFav(data);
      }}
    >
      <img src={heart} alt="" />
      {love === data._id && <FontAwesomeIcon icon="fa-heart" />}
    </div>
  );
};

export default Favorite;

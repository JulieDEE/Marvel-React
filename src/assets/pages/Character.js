import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import heart from "../images/heart.png";
import Cookies from "js-cookie";

const Character = ({ favoris, setFavoris, token }) => {
  // GET ID FROM HOME PAGE WITH REACT ROUTER DOM // 
  const { characterId } = useParams();
  const navigate = useNavigate();

  //STATES // 
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [love, setLove] = useState(Cookies.get("love") || null);

  // REQUEST AXIOS BY CHARAC ID // 
  useEffect(() => {
    const comicsData = async () => {
      const response = await axios.get(
        `http://localhost:4100/comics/${characterId}`
      );
      setData(response.data);
      setIsLoading(false);
      console.log(response.data);
    };

    comicsData();
  }, []);

  // ADD TO FAVORITES // 
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

       setFavoris(response.data);
    } else {
      navigate("/login")
    }

   
  };

  console.log(favoris);

  return (
    !isLoading && (
      <>
        <div className="character">
          <div className="left-character">
            <img
              src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
              alt=""
            />
          </div>
          <div className="rigth-character">
            <div className="titles">
              <div className="favoris">
                <h1>{data.name}</h1>
                <div
                  className="icon"
                  onClick={() => {
                    handleFav(data);
                  }}
                >
                  <img src={heart} alt="" />
                  {love === data._id && <FontAwesomeIcon icon="fa-heart" />}
                </div>
              </div>

              <h2>Retrouvez le dans : </h2>
            </div>
            <div className="comics">
              <div className="comic-caroussel">
                {data.comics.map((comic, index) => {
                  return (
                    <div className="comic-card">
                      <h3>{comic.title}</h3>
                      <div className="image">
                        <img
                          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                          alt=""
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {data.description && (
          <p className="charac-description">{data.description} </p>
        )}
      </>
    )
  );
};

export default Character;

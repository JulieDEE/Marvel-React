import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Character = () => {
  // GET ID FROM HOME PAGE WITH REACT ROUTER DOM
  const { characterId } = useParams();

  //STATES
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
              <h1>{data.name}</h1>
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
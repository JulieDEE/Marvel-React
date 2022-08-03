import axios from "axios";
import { useState, useEffect } from "react";

const Comics = ({ data }) => {
  const [comicsData, setComicData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const comicsData = async () => {
      const response = await axios.get("http://localhost:4100/comics");
      setComicData(response.data);
      setIsLoading(false);
    };

    comicsData();
  }, []);

  return isLoading ? (
    console.log("loading")
  ) : (
    <div className="comics-page">
      <div className="comics-page-header">
        <h1>Tous les comics</h1>
        <div className="navbar">
          <div className="searchbar">
            <input type="search" placeholder="Chercher un titre de Comic" />
          </div>
        </div>
      </div>

      {comicsData.results.map((comic, index) => {
        return (
          <div className="comics-card">
            <div className="image">
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt=""
              />
            </div>
            <div className="description">
              <h2> {comic.title} </h2>
              <p>{comic.description} </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Comics;

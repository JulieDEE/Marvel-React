import axios from "axios";
import { useState, useEffect } from "react";

const Comics = ({ data }) => {
  const [comicsData, setComicData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("")

  useEffect(() => {
    const comicsData = async () => {
      let filters = ""
      if (search) {
        if (filters) {
          filters = filters + `&title=${search}`
        } else {
          filters = filters + `?title=${search}`
        }
      }
      const response = await axios.get("http://localhost:4100/comics" + filters);
      setComicData(response.data);
      setIsLoading(false);
    };

    comicsData();
  }, [search]);

  return isLoading ? (
    console.log("loading")
  ) : (
    <div className="comics-page">
      <div className="comics-page-header">
        <h1>Tous les comics</h1>
        <nav>
          <div className="count"> {comicsData.count} résultats </div>
          <div className="searchbar">
            <input type="seach" placeholder="Rechercher un titre de comic" value={search} onChange={((e) => setSearch(e.target.value))} />
          </div>
          <div className="page">
            <div className="pagination">
              <button> ← </button>
              <p>Page 1</p>
              <button>→</button>
            </div>
            <select name="resultNumber" id="resultNumber">
              <option value="">Resultats</option>
              <option value="ten">10</option>
              <option value="fifty">50</option>
              <option value="hundred">100</option>
            </select>
          </div>
        </nav>
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

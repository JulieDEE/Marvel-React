import axios from "axios";
import { useState, useEffect } from "react";
import blackHeart from "../images/blackHeart.png";

const Comics = ({ data, love, token }) => {

  // STATES //

  const [comicsData, setComicData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(12);

  // PAGINATION //

  const nextPage = () => {
    const maxPage = data.count / limit;
    if (page < maxPage - 1) {
      setPage(page + 1);
    }
  };
  const previewsPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  // AXIOS REQUEST FOR ALL COMICS //

  useEffect(() => {
    const comicsData = async () => {
      let filters = "";
      if (page) {
        if (filters) {
          filters = filters + `&page=${page}`;
        } else {
          filters = filters + `?page=${page}`;
        }
      }
      if (limit) {
        if (filters) {
          filters = filters + `&limit=${limit}`;
        } else {
          filters = filters + `?limit=${limit}`;
        }
      }
      if (search) {
        if (filters) {
          filters = filters + `&title=${search}`;
        } else {
          filters = filters + `?title=${search}`;
        }
      }
      const response = await axios.get(
        "https://marvelbackend-01.herokuapp.com/comics" + filters
      );
      setComicData(response.data);
      setIsLoading(false);
    };

    comicsData();
  }, [search, page, limit]);


 

  // RETURN //

  return isLoading ? (
    console.log("loading")
  ) : (
    <div className="comics-page">
      <div className="comics-page-header">
        <h1>Tous les comics</h1>
        <nav>
          <div className="count"> {comicsData.count} résultats </div>
          <div className="searchbar">
            <input
              type="seach"
              placeholder="Rechercher un titre de comic"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="page">
            <div className="pagination">
              <button onClick={previewsPage}> ← </button>
              <p>Page {page + 1} </p>
              <button onClick={nextPage}>→</button>
            </div>
            <select
              name="resultNumber"
              id="resultNumber"
              onChange={(e) => setLimit(e.target.value)}
            >
              <option value="12">12 par page</option>
              <option value="50">50 par page</option>
              <option value="100">100 par page</option>
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
              <div className="flex">
                <h2> {comic.title} </h2>
                <div className="icon">
                  <img src={blackHeart} alt="" />
                </div>
              </div>

              <p>{comic.description} </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Comics;

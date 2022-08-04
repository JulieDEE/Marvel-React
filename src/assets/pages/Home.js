import Personnage from "../components/Personnage";

const Home = ({ data, search, setSearch, page, setPage, limit, setLimit }) => {
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

  return (
    <>
      <div className="home">
        <h1>Tous les personnages</h1>
        <nav>
          <div className="count"> {data.count} résultats </div>
          <div className="searchbar">
            <input
              type="seach"
              placeholder="Rechercher un personnage"
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
        <div className="personnage-grid">
          <Personnage data={data} />
        </div>
      </div>
    </>
  );
};

export default Home;

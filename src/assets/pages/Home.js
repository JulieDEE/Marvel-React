import Personnage from "../components/Personnage";

const Home = ({ data, search, setSearch }) => {
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
        <div className="personnage-grid">
          <Personnage data={data} />
        </div>
      </div>
    </>
  );
};

export default Home;

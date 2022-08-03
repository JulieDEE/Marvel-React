import Personnage from "../components/Personnage"

const Home = ({ data }) => {
    return (
      <>
        <div className="home">
          <h1>Tous les personnages</h1>
          <nav>
            <div className="searchbar">
              <input type="seach" placeholder="Rechercher un personnage" />
            </div>
          </nav>
          <div className="personnage-grid">
            <Personnage data={data} />
          </div>
        </div>
      </>
    );
      
    
}

export default Home; 
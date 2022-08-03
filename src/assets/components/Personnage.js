import { Link } from "react-router-dom";

const Personnage = ({ data }) => {
  return (
    <>
      {data.results.map((personnage, index) => {
        return (
          <Link
            key={index}
            to={`/character/${personnage._id}`}
            className="personnage-card"
          >
            <h2>{personnage.name}</h2>
            <img
              src={`${personnage.thumbnail.path}.${personnage.thumbnail.extension}`}
              alt=""
            />
          </Link>
        );
      })}
    </>
  );
};

export default Personnage;

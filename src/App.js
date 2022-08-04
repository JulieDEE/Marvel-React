import "./assets/scss/App.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";


// IMPORT COMPONENTS :
import Header from "./assets/components/Header";

// IMPORT DES PAGES :
import Home from "./assets/pages/Home";
import Character from "./assets/pages/Character";
import Comics from "./assets/pages/Comics";
import Signup from "./assets/pages/Signup";
import Profil from "./assets/pages/Profil";

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(12);
  const [token, setToken] = useState(Cookies.get("token") || null);

  useEffect(() => {
    const fetchData = async () => {
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
          filters = filters + `&name=${search}`;
        } else {
          filters = filters + `?name=${search}`;
        }
      }
      const response = await axios.get(
        `http://localhost:4100/characters` + filters
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [search, page, limit]);

  return isLoading ? (
    console.log("Loading")
  ) : (
    <Router>
        <Header token={token}/>

      <Routes>
        <Route
          path="/"
          element={
            <Home
              data={data}
              search={search}
              setSearch={setSearch}
              page={page}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
            />
          }
        />
        <Route path="/character/:characterId" element={<Character />} />
        <Route path="/comics" element={<Comics data={data} />} />
        <Route
          path="/signup"
          element={<Signup token={token} setToken={setToken} />}
        />
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </Router>
  );
}

export default App;

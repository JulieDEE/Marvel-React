import "./assets/scss/App.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// IMPORT COMPONENTS :
import Header from "./assets/components/Header";

// IMPORT DES PAGES :
import Home from "./assets/pages/Home";
import Character from "./assets/pages/Character";
import Comics from "./assets/pages/Comics";

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let filters = "";
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
  }, [search]);

  return isLoading ? (
    console.log("Loading")
  ) : (
    <Router>
      <Header />

      <Routes>
        <Route
          path="/"
          element={<Home data={data} search={search} setSearch={setSearch} />}
        />
        <Route path="/character/:characterId" element={<Character />} />
        <Route path="/comics" element={<Comics data={data} />} />
      </Routes>
    </Router>
  );
}

export default App;

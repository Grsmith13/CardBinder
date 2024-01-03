import { useState } from "react";
import "./App.css";
import Axios from "./Components/Axios";
import Menu from "./Components/Menu";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (card) => {
    setSearchTerm(card);
  };

  return (
    <>
      <Menu onSearch={handleSearch} />
      <Axios searchTerm={searchTerm} />
    </>
  );
}

export default App;

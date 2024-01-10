import { useState, useEffect } from "react";
import "./App.css";
import Menu from "./Components/Menu";
import { fetchAndStore, getData } from "./Components/CreateCache";
import Card from "./Components/Card";
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cardData, setCardData] = useState({});
  const handleSearch = async (card) => {
    setSearchTerm(card);

    if (card) {
      const data = await getData(card);
      setCardData(data);
    }
  };
  useEffect(() => {
    const fetchDataAndRetrieve = async () => {
      // Fetch and store the data in the database
      await fetchAndStore();
      // Now that fetchAndStore is complete, you can call getData
    };
    fetchDataAndRetrieve();
  }, []);

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeContent: "center",
        }}
        className="app"
      >
        <Menu onSearch={handleSearch} />
        <Card data={cardData} />
      </div>
    </>
  );
}

export default App;

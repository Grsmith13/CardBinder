/* 
    Currently this is set up for just pulling an individual card. 
    This is likely to change as I add more feature and figure out how I wanna manage searching and the api.   

*/
import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "./Card";

const Axios = ({ searchTerm }) => {
  const [cards, setCards] = useState();
  useEffect(() => {
    if (searchTerm) {
      axios
        .get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${searchTerm}`)
        .then((res) => {
          if (res.data.data && res.data.data.length > 0) {
            setCards(res.data.data[0]);
            console.log(res.data.data[0]);
          }
        })
        .catch((error) => {
          console.error("Error fetching card info:", error);
        });
    }
  }, [searchTerm]);

  return cards !== null ? <Card cardProp={cards} /> : null;
};
export default Axios;

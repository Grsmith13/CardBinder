import React from "react";
import Axios from "./Axios";

export const Card = ({ cardProp }) => {
  if (cardProp === undefined) {
    return <p>Loading...</p>;
  }
  const { name, type, desc } = cardProp || [];
  console.log(cardProp);
  return (
    <div>
      <h2>Card Info</h2>
      {name ? (
        <>
          <p>Name: {name}</p>
          <p>Type: {type}</p>
          <p>Description: {desc}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default Card;

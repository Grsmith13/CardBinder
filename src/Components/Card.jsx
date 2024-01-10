import { useState, useEffect } from "react";
import { getData } from "./CreateCache";
import "./Card.css";
const Card = ({ data }) => {
  console.log(data);

  return (
    <>
      <div className="card-container">
        <div className="card-image">
          <img
            src="https://img-9gag-fun.9cache.com/photo/aZyoZDV_460s.jpg"
            alt="facedown yugioh card"
          />
        </div>
        <div className="card-information">
          <p>
            <strong>{data.name}</strong>
          </p>
          <p>
            Attribute and Monster/Card Type: {data.attribute}/{data.race}/
            {data.type}
          </p>
          <p className="card-desc">Text/Effect: {data.desc}</p>
          <p>
            ATK/{data.atk} DEF/{data.def}
          </p>
        </div>
      </div>
    </>
  );
};

export default Card;

import { useState } from "react";

const Menu = ({ onSearch }) => {
  const [cardName, setCardName] = useState("");

  const handleInputChange = (e) => {
    setCardName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(cardName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>
        <strong>Card Search</strong>
      </h4>
      <label className="required" htmlFor="card name">
        card name
      </label>
      <input
        type="card name"
        id="card name"
        name="card name"
        placeholder="Enter card name"
        value={cardName}
        onChange={handleInputChange}
        required
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Menu;

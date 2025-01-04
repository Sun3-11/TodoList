import React, { useState } from "react";
import { toast } from "react-toastify";
const Form = ({ setItems, addItem }) => {
  const [newItemName, setNewItemName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItemName) {
      toast.error("please enter a value");

      return;
    }
    addItem(newItemName);
    setNewItemName("");
  };
  return (
    <form className="grocery-form" onSubmit={handleSubmit}>
      <h4>grocery bud</h4>
      <div className="form-control">
        <input
          type="text"
          className="form-input"
          placeholder="e.g. eggs"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <button type="submit" className="btn">
          add item
        </button>
      </div>
    </form>
  );
};

export default Form;

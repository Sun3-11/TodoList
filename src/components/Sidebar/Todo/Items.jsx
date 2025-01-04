import React from "react";
import SingleItem from "./SingleItem";

const Items = ({ items, removeItem, editItem }) => {
  return (
    <div className="items">
      <p style={{ marginBottom: "1rem", color: "#676464", fontSize: "1rem" }}>
        Completed: {items.filter((item) => item.completed).length} /{" "}
        {items.length}
      </p>

      {items.map((item) => (
        <SingleItem
          key={item.id}
          item={item}
          removeItem={removeItem}
          editItem={editItem}
        />
      ))}
    </div>
  );
};

export default Items;

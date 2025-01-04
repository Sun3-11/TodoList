import React, { useState } from "react";
import SingleItem from "./SingleItem";

const Items = ({ items, removeItem, editItem }) => {
  return (
    <div className="items">
      {items.map((item) => (
        <SingleItem
          key={item.id}
          item={item}
          removeItem={removeItem}
          editItem={editItem}
        />
      ))}
      <p>
        Completed: {items.filter((item) => item.completed).length} /{" "}
        {items.length}
      </p>
    </div>
  );
};

export default Items;

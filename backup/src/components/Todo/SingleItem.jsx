import React, { useState } from "react";

const SingleItem = ({ item, removeItem, editItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(item.name);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (newName.trim()) {
      editItem(item.id, newName.trim(), item.completed);
    }
    setIsEditing(false);
  };

  return (
    <div className="single-item">
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => editItem(item.id, item.name, !item.completed)}
      />
      {isEditing ? (
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onBlur={handleSave}
          autoFocus
        />
      ) : (
        <span
          style={{
            textDecoration: item.completed ? "line-through" : "none",
          }}
          onClick={handleEdit}
        >
          {item.name}
        </span>
      )}
      <button onClick={() => removeItem(item.id)}>Remove</button>
    </div>
  );
};

export default SingleItem;

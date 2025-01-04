import React, { useState } from "react";
import Form from "./Form";
import Items from "./Items";
import { useGlobalContext } from "../../../AppContext";
import Modal from "./Modal";
import { MdDelete } from "react-icons/md";

const AddTodo = () => {
  const {
    lists,
    addItem,
    removeItem,
    editItem,
    openModal,
    removeList,
    handleTitleChange,
    handleTitleSave,
    editingListId,
    setEditingListId,
    setNewTitle,
    newTitle,
  } = useGlobalContext();

  return (
    <div className="lists-container">
      <Modal />
      {lists.map((list) => (
        <div key={list.id} className="section-center ">
          {editingListId === list.id ? (
            <input
              type="text"
              value={newTitle}
              onChange={handleTitleChange}
              onBlur={() => handleTitleSave(list.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleTitleSave(list.id);
              }}
              autoFocus
              className="list-title-input"
            />
          ) : (
            <h4
              className="list-title"
              onClick={() => {
                setEditingListId(list.id);
                setNewTitle(list.title);
              }}
            >
              {list.title}
            </h4>
          )}
          <Form addItem={(itemName) => addItem(list.id, itemName)} />
          <Items
            items={list.items}
            removeItem={(itemId) => removeItem(list.id, itemId)}
            editItem={(itemId, newName, completed) =>
              editItem(list.id, itemId, newName, completed)
            }
          />
          <hr style={{ margin: "inherit" }} />
          <button className="delete-list" onClick={() => removeList(list.id)}>
            <MdDelete /> Delete List
          </button>
        </div>
      ))}

      <button className="btn List-toggle" onClick={openModal}>
        +
      </button>
    </div>
  );
};

export default AddTodo;

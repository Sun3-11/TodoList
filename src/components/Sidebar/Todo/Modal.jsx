import React from "react";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "../../../AppContext";
const Modal = () => {
  const { isModalOpen, closeModal, addList } = useGlobalContext();

  return (
    <div className={isModalOpen ? "modal-overlay show-modal" : "modal-overlay"}>
      <div className="modal-container ">
        {/* <button
          onClick={() => {
            const title = prompt("Enter list title:");
            if (title) addList(title);
          }}
          className="btn new-list-btn"
        >
          New List
        </button> */}
        <h3>Write List Title</h3>
        <form
          className="grocery-form"
          onSubmit={(e) => {
            e.preventDefault();
            const title = e.target.title.value;
            if (title) addList(title);
          }}
        >
          <div className="form-control">
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Grocery Bud"
              name="title"
            />
            <button type="submit" className="btn">
              Add List
            </button>
          </div>
        </form>
        <button className="close-modal-btn" onClick={closeModal}>
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default Modal;

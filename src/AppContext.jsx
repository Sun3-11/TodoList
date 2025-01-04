// Context for App
import React, { createContext, useContext, useState } from "react";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

const GlobalContext = createContext();

const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};
export const AppContext = ({ children }) => {
  // State values
  const [user, setUser] = useState(getLocalStorage("currentUser"));

  const [lists, setLists] = useState(
    user
      ? Array.isArray(getLocalStorage(user.username))
        ? getLocalStorage(user.username)
        : []
      : []
  );
  const [editingListId, setEditingListId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const login = (username, pokemon) => {
    const isNewUser = getLocalStorage(username);
    setUser({ username, pokemon });
    setLists(getLocalStorage(username) || []);
    setLocalStorage("currentUser", { username, pokemon });

    if (isNewUser) {
      toast.info(
        `Welcome, ${username}! Your Pokémon is ${pokemon.name}. They will motivate you on your journey!`
      );
    }
  };
  // functions to add, remove, edit, and get lists and items from localStorage adn Open Close Sidebar and Modal
  const logout = () => {
    setUser(null);
    setLists([]);
    localStorage.removeItem("currentUser");
  };

  const addList = (title) => {
    const newList = { id: nanoid(), title, items: [] };
    const updatedLists = [...lists, newList];
    setLists(updatedLists);
    setLocalStorage(user.username, updatedLists);
    toast.success(`List \"${title}\" created successfully!`);
  };

  const addItem = (listId, itemName) => {
    const updatedLists = lists.map((list) => {
      if (list.id === listId) {
        const newItem = { id: nanoid(), name: itemName, completed: false };
        return { ...list, items: [...list.items, newItem] };
      }
      return list;
    });
    setLists(updatedLists);
    setLocalStorage(user.username, updatedLists);
    toast.success("Item added successfully!");
  };

  const removeItem = (listId, itemId) => {
    const updatedLists = lists.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          items: list.items.filter((item) => item.id !== itemId),
        };
      }
      return list;
    });
    setLists(updatedLists);
    setLocalStorage(user.username, updatedLists);
    toast.success("Item removed!");
  };

  const editItem = (listId, itemId, newName, completed) => {
    const updatedLists = lists.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          items: list.items.map((item) =>
            item.id === itemId ? { ...item, name: newName, completed } : item
          ),
        };
      }
      return list;
    });
    setLists(updatedLists);
    setLocalStorage(user.username, updatedLists);
    toast.success("Item updated!");
  };

  const removeList = (listId) => {
    const updatedLists = lists.filter((list) => list.id !== listId);
    setLists(updatedLists);
    setLocalStorage(user.username, updatedLists);
    toast.success("List removed!");
  };
  const editListTitle = (listId, newTitle) => {
    const updatedLists = lists.map((list) =>
      list.id === listId ? { ...list, title: newTitle } : list
    );
    setLists(updatedLists);
    setLocalStorage(user.username, updatedLists);
    toast.success("List title updated!");
  };
  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleTitleSave = (listId) => {
    if (newTitle.trim()) {
      editListTitle(listId, newTitle);
    }
    setEditingListId(null);
    setNewTitle("");
  };
  const totalTasks = Array.isArray(lists)
    ? lists.reduce((sum, list) => sum + (list.items?.length || 0), 0)
    : 0;

  const completedTasks = Array.isArray(lists)
    ? lists.reduce(
        (sum, list) =>
          sum + (list.items?.filter((item) => item.completed)?.length || 0),
        0
      )
    : 0;

  const openSidebar = () => {
    console.log("Sidebar is opening...");

    setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <GlobalContext.Provider
      value={{
        user,
        lists,
        login,
        logout,
        addList,
        addItem,
        removeItem,
        editItem,
        removeList,
        editListTitle,
        handleTitleChange,
        handleTitleSave,
        editingListId,
        setEditingListId,
        setNewTitle,
        newTitle,
        totalTasks,
        completedTasks,
        isSidebarOpen,
        isModalOpen,
        openModal,
        openSidebar,
        closeModal,
        closeSidebar,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

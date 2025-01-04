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
  return data ? JSON.parse(data) : null;
};

export const AppContext = ({ children }) => {
  const [user, setUser] = useState(getLocalStorage("currentUser"));
  const [lists, setLists] = useState(
    user ? getLocalStorage(user.username) || [] : []
  );

  const login = (username, pokemon) => {
    setUser({ username, pokemon });
    setLists(getLocalStorage(username) || []);
    setLocalStorage("currentUser", { username, pokemon });
  };

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

  const totalTasks = lists.reduce((sum, list) => sum + list.items.length, 0);
  const completedTasks = lists.reduce(
    (sum, list) => sum + list.items.filter((item) => item.completed).length,
    0
  );

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
        totalTasks,
        completedTasks,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

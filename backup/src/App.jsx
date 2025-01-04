// import React, { useState } from "react";
// import Form from "./components/Todo/Form";
// import Items from "./components/Todo/Items";
// import { ToastContainer, toast } from "react-toastify";
// import { nanoid } from "nanoid";
// import LoginDialog from "./components/Todo/LoginDialog";
// import PokemonInfo from "./components/Todo/PokemonInfo";

// const setLocalStorage = (key, value) => {
//   localStorage.setItem(key, JSON.stringify(value));
// };

// const getLocalStorage = (key) => {
//   const data = localStorage.getItem(key);
//   return data ? JSON.parse(data) : null;
// };

// const App = () => {
//   const [user, setUser] = useState(getLocalStorage("currentUser"));
//   const [lists, setLists] = useState(
//     user ? getLocalStorage(user.username) || [] : []
//   );

//   const login = (username, pokemon) => {
//     setUser({ username, pokemon });
//     setLists(getLocalStorage(username) || []);
//     setLocalStorage("currentUser", { username, pokemon });
//   };

//   const logout = () => {
//     setUser(null);
//     setLists([]);
//     localStorage.removeItem("currentUser");
//   };

//   const addList = (title) => {
//     const newList = { id: nanoid(), title, items: [] };
//     const updatedLists = [...lists, newList];
//     setLists(updatedLists);
//     setLocalStorage(user.username, updatedLists);
//     toast.success(`List "${title}" created successfully!`);
//   };

//   const addItem = (listId, itemName) => {
//     const updatedLists = lists.map((list) => {
//       if (list.id === listId) {
//         const newItem = { id: nanoid(), name: itemName, completed: false };
//         return { ...list, items: [...list.items, newItem] };
//       }
//       return list;
//     });
//     setLists(updatedLists);
//     setLocalStorage(user.username, updatedLists);
//     toast.success("Item added successfully!");
//   };

//   const removeItem = (listId, itemId) => {
//     const updatedLists = lists.map((list) => {
//       if (list.id === listId) {
//         return {
//           ...list,
//           items: list.items.filter((item) => item.id !== itemId),
//         };
//       }
//       return list;
//     });
//     setLists(updatedLists);
//     setLocalStorage(user.username, updatedLists);
//     toast.success("Item removed!");
//   };

//   const editItem = (listId, itemId, newName, completed) => {
//     const updatedLists = lists.map((list) => {
//       if (list.id === listId) {
//         return {
//           ...list,
//           items: list.items.map((item) =>
//             item.id === itemId ? { ...item, name: newName, completed } : item
//           ),
//         };
//       }
//       return list;
//     });
//     setLists(updatedLists);
//     setLocalStorage(user.username, updatedLists);
//     toast.success("Item updated!");
//   };

//   // Calculate completed and total tasks

//   const totalTasks = lists.reduce((sum, list) => sum + list.items.length, 0);
//   const completedTasks = lists.reduce(
//     (sum, list) => sum + list.items.filter((item) => item.completed).length,
//     0
//   );

//   return (
//     <section className="section-center">
//       <ToastContainer position="top-center" />
//       {!user ? (
//         <LoginDialog login={login} />
//       ) : (
//         <>
//           <PokemonInfo
//             pokemon={user.pokemon}
//             completedTasks={completedTasks}
//             totalTasks={totalTasks}
//             pokemonImage={user.pokemon.image}
//           />
//           <button onClick={logout} className="btn logout-btn">
//             Logout
//           </button>
//           <button
//             onClick={() => {
//               const title = prompt("Enter list title:");
//               if (title) addList(title);
//             }}
//             className="btn new-list-btn"
//           >
//             New List
//           </button>
//           {lists.map((list) => (
//             <div key={list.id} className="list-container">
//               <h3>{list.title}</h3>
//               <Form addItem={(itemName) => addItem(list.id, itemName)} />
//               <Items
//                 items={list.items}
//                 removeItem={(itemId) => removeItem(list.id, itemId)}
//                 editItem={(itemId, newName, completed) =>
//                   editItem(list.id, itemId, newName, completed)
//                 }
//               />
//             </div>
//           ))}
//         </>
//       )}
//     </section>
//   );
// };

// export default App;
// Compare this snippet from src/components/Todo/Form.jsx:
import React, { useState } from "react";
import Form from "./components/Todo/Form";
import Items from "./components/Todo/Items";
import { ToastContainer, toast } from "react-toastify";
import { nanoid } from "nanoid";
import LoginDialog from "./components/Todo/LoginDialog";
import PokemonInfo from "./components/Todo/PokemonInfo";
import { useGlobalContext } from "./AppContext";

const App = () => {
  const {
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
  } = useGlobalContext();

  return (
    <section className="section-center">
      <ToastContainer position="top-center" />
      {!user ? (
        <LoginDialog login={login} />
      ) : (
        <>
          <PokemonInfo
            pokemon={user.pokemon}
            completedTasks={completedTasks}
            totalTasks={totalTasks}
            pokemonImage={user.pokemon.image}
          />
          <button onClick={logout} className="btn logout-btn">
            Logout
          </button>
          <button
            onClick={() => {
              const title = prompt("Enter list title:");
              if (title) addList(title);
            }}
            className="btn new-list-btn"
          >
            New List
          </button>
          {lists.map((list) => (
            <div key={list.id} className="list-container">
              <h3>{list.title}</h3>
              <Form addItem={(itemName) => addItem(list.id, itemName)} />
              <Items
                items={list.items}
                removeItem={(itemId) => removeItem(list.id, itemId)}
                editItem={(itemId, newName, completed) =>
                  editItem(list.id, itemId, newName, completed)
                }
              />
            </div>
          ))}
        </>
      )}
    </section>
  );
};

export default App;

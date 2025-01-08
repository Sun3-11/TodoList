// Context for App
import React, { createContext, useContext, useState, useEffect } from "react";
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
  const [arrowAngle, setArrowAngle] = useState(0);

  const [tasks, setTasks] = useState(getLocalStorage("tasks") || []);
  const [newTask, setNewTask] = useState({
    timeStart: "",
    timeEnd: "",
    task: "",
  });
  const [currentTask, setCurrentTask] = useState("");
  const [remainingTime, setRemainingTime] = useState(null);

  //--------------------------------Login-----------------------------------------
  const login = (username, pokemon) => {
    const isNewUser = !getLocalStorage(username);

    setUser({ username, pokemon });

    if (isNewUser) {
      setLists([]);
      setTasks([]);
      setLocalStorage(username, []);
    } else {
      setLists(getLocalStorage(username) || []);
      setTasks(getLocalStorage(`${username}_tasks`) || []);
    }

    setLocalStorage("currentUser", { username, pokemon });

    if (isNewUser) {
      toast.info(
        `Welcome, ${username}! Your Pokémon is ${pokemon.name}. They will motivate you on your journey!`
      );
    }
  };

  //-----------------------------start func----------------------------------

  useEffect(() => {
    const savedUser = getLocalStorage("currentUser");
    if (savedUser) {
      setUser(savedUser);
      setLists(getLocalStorage(savedUser.username) || []);
      setTasks(getLocalStorage(`${savedUser.username}_tasks`) || []);
    } else {
      setUser(null);
      setLists([]);
      setTasks([]);
    }
    const savedTasks =
      JSON.parse(localStorage.getItem(`${user.username}_tasks`)) || [];
    if (savedTasks.length === 0) {
      setNewTask({ timeStart: "0", timeEnd: "8", task: "Sleep" });
    } else {
      setTasks(savedTasks);
    }
  }, []);

  //--------------------------------------Add Task-----------------

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in first!");
      return;
    }

    const startHour = parseInt(newTask.timeStart);
    const endHour = parseInt(newTask.timeEnd);

    //Check for a task from 23:00 to 00:00
    const hasMidnightTask = tasks.some(
      (task) => task.timeStart === "23" && task.timeEnd === "0"
    );

    // Check for time conflicts with other tasks
    const isConflict = tasks.some((task) => {
      const taskStart = parseInt(task.timeStart);
      const taskEnd = parseInt(task.timeEnd);

      //If the task crosses midnight and there is a task from 23:00 to 00:00
      if (startHour > endHour && hasMidnightTask) {
        return true;
      }

      // Usual time conflict logic
      return startHour < endHour
        ? startHour < taskEnd && endHour > taskStart
        : (startHour < taskEnd && taskEnd <= 24) ||
            (endHour > taskStart && taskStart >= 0);
    });

    if (isConflict) {
      // alert("This time slot conflicts with an existing task!");
      toast.warning("This time slot conflicts with an existing task!");
      return;
    }

    // Add Task
    addTask(newTask);
    setNewTask({ timeStart: "", timeEnd: "", task: "" });
    // alert("Task added successfully!");
  };

  // -------------------------------------- Hnadle Play----------------
  // Hnadle Play
  useEffect(() => {
    const updateArrow = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const angle = (currentHour * 60 + currentMinute) * 0.25;
      setArrowAngle(angle);

      tasks.forEach((task) => {
        const endHour = parseInt(task.timeEnd);
        const endMinute = endHour * 60;
        const currentTimeMinutes = currentHour * 60 + currentMinute;

        // Atumatic completeTask
        if (currentTimeMinutes >= endMinute && !task.completed) {
          completeTask(task.id);
          // alert(`Task finished: ${task.task}`);
          toast.done(`Task finished: ${task.task}`);
        }
      });
    };

    updateArrow();
    const interval = setInterval(updateArrow, 60000);
    return () => clearInterval(interval);
  }, [tasks]);

  // run the task and calculate the remainingTime
  const handlePlay = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const task = tasks.find((t) => {
      const startHour = parseInt(t.timeStart);
      const endHour = parseInt(t.timeEnd);
      return startHour <= endHour
        ? currentHour >= startHour && currentHour < endHour
        : currentHour >= startHour || currentHour < endHour;
    });

    if (task) {
      setCurrentTask(task.task);
      const endTime = new Date();
      endTime.setHours(parseInt(task.timeEnd), 0, 0, 0);
      const timeLeft = Math.max(0, endTime - now);
      const minutesLeft = Math.floor(timeLeft / (1000 * 60));
      setRemainingTime(minutesLeft);
      setRemainingTime(formatRemainingTime(minutesLeft));
    } else {
      setCurrentTask("No task for this time");
      setRemainingTime(null);
    }
  };

  // remainingTime
  useEffect(() => {
    if (remainingTime !== null && remainingTime > 0) {
      const interval = setInterval(() => {
        setRemainingTime((prevTime) => Math.max(0, prevTime - 1));
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [remainingTime]);

  // complete Task
  const completeTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      // task.id === taskId ? { ...task, completed: true } : task
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    setLocalStorage(`${user.username}_tasks`, updatedTasks);
    toast.success("Task completed!");
  };

  // convert minutes to hour
  const formatRemainingTime = (minutes) => {
    if (minutes <= 0) {
      return "About to finish";
    } else if (minutes < 30) {
      // return ${minutes} minute(s);
      return `${minutes} minute(s)`;
    } else if (minutes < 60) {
      return "Half an hour";
    } else if (minutes >= 60 && minutes < 90) {
      return "One hour";
    } else if (minutes >= 90) {
      return "More than one hour";
    }
  };

  useEffect(() => {
    let interval;
    if (remainingTime !== null && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => Math.max(0, prevTime - 1));
      }, 60000);
    }

    return () => clearInterval(interval);
  }, [remainingTime]);

  // -------------------------
  //RandomColor
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  //Add Task
  const addTask = (task) => {
    const updatedTasks = [
      ...tasks,
      { ...task, id: nanoid(), color: getRandomColor() },
    ];
    setTasks(updatedTasks);
    setLocalStorage(`${user.username}_tasks`, updatedTasks);
    toast.success("Task added successfully!");
  };
  //Delete task
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    setLocalStorage(`${user.username}_tasks`, updatedTasks);
    toast.success("Task deleted successfully!");
  };

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };
  //--------------------------------------------------------------
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
  //Total todo tasks
  const totalTasks = Array.isArray(lists)
    ? lists.reduce((sum, list) => sum + (list.items?.length || 0), 0)
    : // : 0;
      0 + tasks.length;

  //Total completed task
  const completedTasks = Array.isArray(lists)
    ? lists.reduce(
        (sum, list) =>
          sum + (list.items?.filter((item) => item.completed)?.length || 0),
        0
      )
    : // : 0;
      0 + tasks.filter((task) => task.completed).length;

  //open and close Siderbar and modal

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
  // --------------------------
  // Total completed timetable tasks
  const completedTimetableTasks = tasks.filter((task) => task.completed).length;

  // total task completed = To-Do + Timetable
  // const totalCompletedTasks = completedTasks + completedTimetableTasks;

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
        setTasks,
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
        tasks,
        currentTask,
        newTask,
        setNewTask,
        addTask,
        deleteTask,
        completeTask,
        completedTimetableTasks,
        handlePlay,
        handleTaskChange,
        setCurrentTask,
        handleAddTask,
        remainingTime,
        arrowAngle,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

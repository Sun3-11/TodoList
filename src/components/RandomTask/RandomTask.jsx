import React, { useState } from "react";

const RandomTask = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState("");
  const [rotation, setRotation] = useState(0);
  const [newTask, setNewTask] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddTask = () => {
    if (!newTask.trim()) {
      setErrorMessage("You must enter a task!");
      return;
    }

    if (tasks.includes(newTask.trim())) {
      setErrorMessage("The task already exists!");
      return;
    }

    setTasks([...tasks, newTask.trim()]);
    setNewTask("");
    setErrorMessage("");
  };

  const handleRemoveTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const spinWheel = () => {
    if (tasks.length === 0) return;

    const randomIndex = Math.floor(Math.random() * tasks.length);
    const newRotation = rotation + 360 * 5 + (360 / tasks.length) * randomIndex;
    setRotation(newRotation);

    setTimeout(() => {
      setSelectedTask(tasks[randomIndex]);
    }, 4000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div className="random-task-container">
      <h1 className="title">🎡 Random Task Wheel</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter your task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
          className="inputR"
        />
        <button className="Add-button" onClick={handleAddTask}>
          Add Task
        </button>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}{" "}
      <div className="wheel-container">
        <div className="wheel" style={{ transform: `rotate(${rotation}deg)` }}>
          {tasks.map((task, index) => {
            const angle = (360 / tasks.length) * index;
            return (
              <div
                key={index}
                className="wheel-segment"
                style={{
                  transform: `rotate(${angle}deg)`,
                  background: `hsl(${(360 / tasks.length) * index}, 70%, 70%)`,
                }}
              >
                <span
                  style={{
                    transform: `rotate(${
                      360 / tasks.length / 2
                    }deg) translate(20px)`,
                  }}
                >
                  {task}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <button className="spin-btn Add-button" onClick={spinWheel}>
        Spin the Wheel!
      </button>
      {selectedTask && (
        <div className="selected-task">
          <h2>Selected Task:</h2>
          <p className="task-text">{selectedTask}</p>
        </div>
      )}
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button
              className="remove-btnn"
              onClick={() => handleRemoveTask(index)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RandomTask;

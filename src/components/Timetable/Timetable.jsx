import { MdDelete } from "react-icons/md";
import { useGlobalContext } from "../../AppContext";

const Timetable = () => {
  const {
    tasks,
    currentTask,
    newTask,
    deleteTask,
    completeTask,
    handleTaskChange,
    handlePlay,
    handleAddTask,
    remainingTime,
    user,
    arrowAngle,
  } = useGlobalContext();

  return (
    <div className="clock-container">
      <h4 className="titleh4">
        <span style={{ color: "#0087ff" }}>{`${
          user?.username || "Sanora"
        }'s`}</span>{" "}
        Daily Timetable
      </h4>
      <div className="circle">
        {[...Array(24)].map((_, index) => (
          <div
            className="hour"
            key={index}
            style={{
              transform: `rotate(${index * 15}deg) translate(0, -120px)`,
            }}
          >
            <hr className="hr" />
            {index}
          </div>
        ))}

        {/*arrAngle for realtime*/}
        <div
          className="arrow"
          style={{
            position: "absolute",
            width: "4px",
            height: "120px",
            backgroundColor: "red",
            transform: `rotate(${arrowAngle}deg)  translate(-20px, -50%)`,
            transformOrigin: "center bottom",
            borderRadius: "10px",
            transition: "transform 1s linear",
          }}
        ></div>

        {tasks.map((task, index) => {
          const startAngle = parseInt(task.timeStart) * 15;
          const endAngle = parseInt(task.timeEnd) * 15;
          const angleDifference =
            endAngle >= startAngle
              ? endAngle - startAngle
              : 360 - (startAngle - endAngle);

          const points = [];
          for (let i = startAngle; i <= startAngle + angleDifference; i++) {
            const x = 50 + 50 * Math.sin((i * Math.PI) / 180);
            const y = 50 - 50 * Math.cos((i * Math.PI) / 180);
            points.push(`${x}% ${y}%`);
          }
          const clipPathValue = `polygon(50% 50%, ${points.join(", ")})`;

          const midAngle = (startAngle + (startAngle + angleDifference)) / 2;
          const textX = 50 + 35 * Math.sin((midAngle * Math.PI) / 180);
          const textY = 50 - 35 * Math.cos((midAngle * Math.PI) / 180);

          return (
            <div
              key={index}
              className="task"
              style={{
                background: task.completed ? "gray" : task.color,
                clipPath: clipPathValue,
                transform: `rotate(0deg)`,
              }}
            >
              <div
                className="task-label"
                style={{
                  position: "absolute",
                  left: `${textX}%`,
                  top: `${textY}%`,
                  transform: "translate(-50%, -50%)",
                  color: "#000",
                  fontWeight: "bold",
                }}
              >
                {task.task}
              </div>
            </div>
          );
        })}

        <button className="play-button" onClick={handlePlay}>
          Play
        </button>
      </div>
      <div>
        {currentTask && (
          <div className="current-task">
            <p>{currentTask}</p>
            {remainingTime && <p>Time remaining: {remainingTime}</p>}
          </div>
        )}
      </div>
      <form className="task-form" onSubmit={handleAddTask}>
        <input
          type="number"
          name="timeStart"
          placeholder="Start Time (0-23)"
          value={newTask.timeStart}
          onChange={handleTaskChange}
          min="0"
          max="23"
          required
        />
        <input
          type="number"
          name="timeEnd"
          placeholder="End Time (0-23)"
          value={newTask.timeEnd}
          onChange={handleTaskChange}
          min="0"
          max="23"
          required
        />
        <input
          type="text"
          name="task"
          placeholder="Task Description"
          value={newTask.task}
          onChange={handleTaskChange}
          required
        />
        <button type="submit">Add Task</button>
      </form>{" "}
      <div className="tasks-container">
        <h3 className="tasks-title">Tasks:</h3>
        {tasks.map((task, index) => (
          <div className="task-card" key={index}>
            <span
              className={`task-name ${task.completed ? "completed-task" : ""}`}
            >
              {task.task}
            </span>
            <div className="task-buttons">
              <button
                className="complete-button"
                onClick={() => completeTask(task.id)}
              >
                Complete
              </button>
              <button
                className="delete-button"
                onClick={() => deleteTask(task.id)}
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timetable;

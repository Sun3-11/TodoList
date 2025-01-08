import React, { useEffect, useState } from "react";
import Pikachu from "../../../assets/P.png";

const PokemonInfo = ({
  pokemon,
  completedTasks,
  totalTasks,
  timetableTasksCompleted,
}) => {
  const [motivationalMessage, setMotivationalMessage] = useState("");
  //progress precentage for motivationalMessage
  const progressPercentage =
    totalTasks > 0
      ? Math.round(
          ((completedTasks + timetableTasksCompleted) / totalTasks) * 100
        )
      : 0;
  //todo progress
  const Todoprogress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  //pokemonStrength
  const pokemonStrength = (completedTasks + timetableTasksCompleted) * 2;

  useEffect(() => {
    if (progressPercentage === 0) {
      setMotivationalMessage("Let's start this adventure together!🤗");
    } else if (progressPercentage > 0 && progressPercentage < 50) {
      setMotivationalMessage(`${pokemon?.name}: Great start! Keep going!🌟`);
    } else if (progressPercentage >= 50 && progressPercentage < 100) {
      setMotivationalMessage(
        `${pokemon?.name}: You're halfway there! Amazing job!😍`
      );
    } else if (progressPercentage === 100) {
      setMotivationalMessage(
        `${pokemon?.name} : Incredible! You've completed all your tasks!🚀🎉`
      );
    }
  }, [progressPercentage, pokemon]);

  return (
    <div className="pokemon-card">
      <h4 className="pokemon-card-title">
        Your Pokémon:{" "}
        <span className="pokemon-name">{pokemon?.name || "Pikachu"}</span>
      </h4>
      <div className="pokemon-message">{motivationalMessage}</div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <img
          src={pokemon?.image || Pikachu}
          alt={pokemon?.name || "Pikachu"}
          className="pokemon-image"
        />
        <div style={{ width: "100px" }}>
          <div
            style={{
              height: "10px",
              backgroundColor: "#ddd",
              borderRadius: "5px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${Math.min(pokemonStrength, 200)}%`,
                height: "100%",
                backgroundColor: "green",
                transition: "width 0.3s ease",
              }}
            ></div>
          </div>
          <p
            style={{
              fontSize: "0.8rem",
              marginTop: "0.5rem",
              textAlign: "center",
            }}
          >
            Strength: {pokemonStrength}/200
          </p>
        </div>
      </div>

      <div style={{ justifyItems: "center" }}>
        <h5 style={{ padding: "1rem", color: " #294c4d" }}>To Do progress:</h5>
        <p className="pokemon-tasks">
          Progress: <strong>{Todoprogress}%</strong>
        </p>
        <p className="pokemon-tasks" style={{ marginTop: "0.5rem" }}>
          Tasks Completed: <strong>{completedTasks}</strong> / {totalTasks}{" "}
        </p>
      </div>
      <hr style={{ margin: "1rem" }} />
      <div style={{ justifyItems: "center" }}>
        <h5 style={{ padding: "1rem", color: " #294c4d" }}>
          Time Table progress:
        </h5>

        <p className="pokemon-tasks">
          TimeTable Tasks Completed: <strong>{timetableTasksCompleted}</strong>
        </p>
      </div>
      {/*  */}
    </div>
  );
};

export default PokemonInfo;

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
    const calculateMessage = () => {
      if (progressPercentage === 0) {
        return "Let's start this adventure together!🤗";
      } else if (progressPercentage > 0 && progressPercentage < 20) {
        return `${
          pokemon?.name || "Pikachu"
        }: You've just begun! Keep pushing!💪`;
      } else if (progressPercentage >= 20 && progressPercentage < 40) {
        return `${
          pokemon?.name || "Pikachu"
        }: You're doing great! Keep it up!🌟`;
      } else if (progressPercentage >= 40 && progressPercentage < 60) {
        return `${
          pokemon?.name || "Pikachu"
        }: Halfway there! Keep going strong!🔥`;
      } else if (progressPercentage >= 60 && progressPercentage < 80) {
        return `${pokemon?.name || "Pikachu"}: Almost there! You got this!💥`;
      } else if (progressPercentage >= 80 && progressPercentage < 100) {
        return `${
          pokemon?.name || "Pikachu"
        }: So close! The finish line is near!🏁`;
      } else if (progressPercentage && Todoprogress === 100) {
        return `${
          pokemon?.name || "Pikachu"
        }: Incredible! You've completed all your tasks!🚀🎉`;
      }

      if (pokemonStrength >= 50 && pokemonStrength < 100) {
        return `${pokemon?.name}: Your strength is growing! Keep it up!💪`;
      } else if (pokemonStrength >= 100 && pokemonStrength < 150) {
        return `${pokemon?.name}: You're getting stronger! Keep pushing your limits!⚡`;
      } else if (pokemonStrength >= 150 && pokemonStrength < 200) {
        return `${pokemon?.name}: You're almost unstoppable! Incredible progress!🔥`;
      } else if (pokemonStrength === 200) {
        return `${pokemon?.name}: Max strength achieved! You're a powerhouse!💥`;
      }
      return "Meaw Meaw Meaw :)";
    };

    setMotivationalMessage(calculateMessage());
  }, [progressPercentage, pokemonStrength, pokemon?.name]);

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

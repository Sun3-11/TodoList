import React, { useEffect, useState } from "react";
import Pikachu from "../../../assets/P.png";

const PokemonInfo = ({ pokemon, completedTasks, totalTasks }) => {
  const [motivationalMessage, setMotivationalMessage] = useState("");
  const progressPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  useEffect(() => {
    //  motivational messages
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
      <img
        src={pokemon?.image || Pikachu}
        alt={pokemon?.name || "Pikachu"}
        className="pokemon-image "
      />
      <p className="pokemon-tasks">
        Progress: <strong>{progressPercentage}%</strong>
      </p>
      <p className="pokemon-tasks" style={{ marginTop: "0.5rem" }}>
        Tasks Completed: <strong>{completedTasks}</strong> / {totalTasks}{" "}
      </p>
    </div>
  );
};

export default PokemonInfo;

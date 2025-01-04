import React from "react";

const PokemonInfo = ({ pokemon, completedTasks, totalTasks, pokemonImage }) => {
  return (
    <div className="pokemon-info">
      <h4>
        Your Pokémon:{" "}
        <span style={{ textTransform: "capitalize" }}>{pokemon.name}</span>
      </h4>
      <img
        src={pokemonImage}
        alt={pokemon.name}
        style={{ width: "50px", height: "50px", marginLeft: "10px" }}
      />
      <p>
        Tasks Completed: {completedTasks} / {totalTasks}
      </p>
    </div>
  );
};

export default PokemonInfo;

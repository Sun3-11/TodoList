import React from "react";

import PokemonInfo from "./PokemonInfo";
import { useGlobalContext } from "../../../AppContext";

const Home = () => {
  const { user, totalTasks, completedTasks } = useGlobalContext();
  return (
    <div>
      <PokemonInfo
        pokemon={user.pokemon}
        completedTasks={completedTasks}
        totalTasks={totalTasks}
      />
    </div>
  );
};

export default Home;

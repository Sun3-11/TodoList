import React from "react";
import PokemonInfo from "./PokemonInfo";
import { useGlobalContext } from "../../../AppContext";

const Home = () => {
  const { user, totalTasks, completedTasks, completedTimetableTasks } =
    useGlobalContext();

  return (
    <div>
      <PokemonInfo
        pokemon={user.pokemon}
        completedTasks={completedTasks}
        totalTasks={totalTasks}
        timetableTasksCompleted={completedTimetableTasks}
      />
    </div>
  );
};

export default Home;

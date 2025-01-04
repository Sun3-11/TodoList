import React, { useState } from "react";
import pokemonI from "./../../assets/pokeball.png";

const fetchRandomPokemon = async () => {
  try {
    const randomId = Math.floor(Math.random() * 898) + 1;
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomId}`
    );
    console.log(response);

    const data = await response.json();
    console.log(data);

    return { name: data.name, image: data.sprites.front_default };
  } catch (error) {
    console.error("Failed to fetch Pokémon:", error);
    return { name: "Unknown Pokémon", image: "" };
  }
};

const LoginDialog = ({ login }) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim()) {
      alert("Please enter a username");
      return;
    }

    setLoading(true);

    //  users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || {};
    let pokemon;

    if (storedUsers[username]) {
      // existing user, get their Pokémon
      pokemon = storedUsers[username].pokemon;
    } else {
      // new user get pokemon
      pokemon = await fetchRandomPokemon();
      storedUsers[username] = { pokemon };
      localStorage.setItem("users", JSON.stringify(storedUsers));
    }

    setLoading(false);
    login(username, pokemon);
  };

  return (
    <div className="login-dialog">
      <input
        type="text"
        placeholder="Enter your username"
        className="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        onClick={handleLogin}
        style={{ background: "transparent", border: "none" }}
        disabled={loading}
      >
        {/* {loading ? "Fetching Pokémon..." : "Login"} */}
        {loading ? (
          <img className="spinner" src={pokemonI} alt="" />
        ) : (
          <img className=" " src={pokemonI} alt="" />
        )}
      </button>
    </div>
  );
};

export default LoginDialog;

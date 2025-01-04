import React, { useState } from "react";

const fetchRandomPokemon = async () => {
  try {
    const randomId = Math.floor(Math.random() * 898) + 1; // 1 to 898
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomId}`
    );
    const data = await response.json();
    return { name: data.name, image: data.sprites.front_default }; // Return Pokémon name and image
  } catch (error) {
    console.error("Failed to fetch Pokémon:", error);
    return { name: "Unknown Pokémon", image: "" }; // Fallback in case of error
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

    // Retrieve users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || {};
    let pokemon;

    if (storedUsers[username]) {
      // Existing user, get their Pokémon
      pokemon = storedUsers[username].pokemon;
    } else {
      // New user, fetch a Pokémon
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
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="btn login-btn"
        disabled={loading}
      >
        {loading ? "Fetching Pokémon..." : "Login"}
      </button>
    </div>
  );
};

export default LoginDialog;

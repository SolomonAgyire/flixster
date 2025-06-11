/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import MovieList from "./Components/MovieList";

const App = () => {
  return (
    <div className="app-container">
      <h1 className="app-title">In Theaters Now</h1>
      <MovieList />
    </div>
  );
};

export default App;

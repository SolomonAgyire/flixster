import { useState } from "react";
import "./App.css";
import MovieList from "./Components/MovieList";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <h1 className="app-title">In Theaters Now</h1>
        <MovieList />
      </main>
      <Footer />
    </div>
  );
};

export default App;

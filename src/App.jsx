/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import MovieList from "./Components/MovieList";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

const App = () => {
  const [activeView, setActiveView] = useState("nowPlaying");
  const [searchQuery, setSearchQuery] = useState("");

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="app-container">
      <Header
        activeView={activeView}
        onViewChange={handleViewChange}
        onSearch={handleSearch}
      />
      <main className="main-content">
        <h1 className="app-title">In Theaters Now</h1>
        <MovieList
          activeView={activeView}
          onViewChange={handleViewChange}
          searchQuery={searchQuery}
        />
      </main>
      <Footer />
    </div>
  );
};

export default App;

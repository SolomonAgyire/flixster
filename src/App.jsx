/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import MovieList from "./Components/MovieList";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Sidebar from "./Components/Sidebar";

const App = () => {
  const [activeView, setActiveView] = useState("nowPlaying");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleViewChange = (view) => {
    setActiveView(view);
    setSidebarOpen(false); // Close sidebar when switching views
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen((open) => !open);
  };

  return (
    <div className="app-container">
      <Header
        activeView={activeView}
        onViewChange={handleViewChange}
        onSearch={handleSearch}
        onSidebarToggle={handleSidebarToggle}
      />
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSelect={(view) => handleViewChange(view)}
      />
      <main className="main-content">
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

import { useState } from "react";
import "./App.css";
import MovieList from "./Components/MovieList";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Sidebar from "./Components/Sidebar";
import FilterControls from "./Components/FilterControls";

const App = () => {
  const [activeView, setActiveView] = useState("nowPlaying");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    field: "title",
    order: "asc",
  });
  const [filterConfig, setFilterConfig] = useState({
    genres: [],
    minRating: 0,
    yearFrom: "",
    yearTo: "",
  });

  const handleViewChange = (view) => {
    setActiveView(view);
    setSidebarOpen(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen((open) => !open);
  };

  const handleSortChange = (sortValue) => {
    setSortConfig(sortValue);
  };

  const handleFilterChange = (filters) => {
    setFilterConfig(filters);
  };

  return (
    <div className="app-container">
      <Header
        activeView={activeView}
        onViewChange={handleViewChange}
        onSearch={handleSearch}
        onSidebarToggle={handleSidebarToggle}
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
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
          sortConfig={sortConfig}
          filterConfig={filterConfig}
        />
      </main>
      <Footer />
    </div>
  );
};

export default App;

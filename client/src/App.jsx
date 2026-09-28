import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import MapIcon from "@mui/icons-material/Map";
import ChatIcon from "@mui/icons-material/Chat";
import SearchIcon from "@mui/icons-material/Search";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { getSpots, createSpot } from "./api/spot";
import SpotList from "./components/SpotList";
import SpotMap from "./components/SpotMap";
import SpotForm from "./components/SpotForm";

function App() {
  const [activeTab, setActiveTab] = useState("map");
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSpotId, setSelectedSpotId] = useState(null);
  const [isAddingSpot, setIsAddingSpot] = useState(false);

  const selectedSpot =
    spots.find((spot) => spot._id === selectedSpotId) || null;

  useEffect(() => {
    getSpots()
      .then(setSpots)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleAddSpot(spotData) {
    try {
      const newSpot = await createSpot(spotData);
      setSpots((prevSpots) => [...prevSpots, newSpot]);
      setSelectedSpotId(newSpot._id);
      setIsAddingSpot(false);
    } catch (err) {
      alert(`Failed to add spot: ${err.message}`);
    }
  }
  return (
    <Box sx={{ paddingBottom: 7 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="add spot"
            onClick={() => setIsAddingSpot(true)}
          >
            <AddIcon />
          </IconButton>
          <Typography variant="h6">Skate Spot Finder</Typography>
          <IconButton color="inherit" aria-label="notifications">
            <NotificationsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: 2 }}>
        {isAddingSpot ? (
          <SpotForm
            onClose={() => setIsAddingSpot(false)}
            onSubmit={handleAddSpot}
          />
        ) : (
          <>
            {activeTab === "map" && (
              <>
                <SpotMap
                  spots={spots}
                  selectedSpot={selectedSpot}
                  onSelectSpot={setSelectedSpotId}
                />
                {loading && <Typography>Loading spots…</Typography>}
                {error && <Typography color="error">Error: {error}</Typography>}
                {!loading && !error && (
                  <SpotList spots={spots} onSelectSpot={setSelectedSpotId} />
                )}
              </>
            )}
            {activeTab === "chat" && (
              <Typography>Chat — coming soon</Typography>
            )}
            {activeTab === "search" && (
              <Typography>Search content goes here</Typography>
            )}
            {activeTab === "communities" && (
              <Typography>Communities — coming soon</Typography>
            )}
            {activeTab === "profile" && (
              <Typography>Profile content goes here</Typography>
            )}
          </>
        )}
      </Box>

      <BottomNavigation
        value={activeTab}
        onChange={(event, newValue) => setActiveTab(newValue)}
        showLabels
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      >
        <BottomNavigationAction label="Map" value="map" icon={<MapIcon />} />
        <BottomNavigationAction label="Chat" value="chat" icon={<ChatIcon />} />
        <BottomNavigationAction
          label="Search"
          value="search"
          icon={<SearchIcon />}
        />
        <BottomNavigationAction
          label="Communities"
          value="communities"
          icon={<GroupsIcon />}
        />
        <BottomNavigationAction
          label="Profile"
          value="profile"
          icon={<PersonIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}

export default App;

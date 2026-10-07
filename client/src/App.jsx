import { useState, useEffect } from "react";
import { useUser, useAuth, SignIn, UserButton } from "@clerk/clerk-react";

import logo from "./assets/kleechat-logo.svg";
import logoReversed from "./assets/kleechat-logo-reversed.svg";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
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
import Avatar from "@mui/material/Avatar";

import { getSpots, createSpot } from "./api/spot";
import SpotList from "./components/SpotList";
import SpotMap from "./components/SpotMap";
import SpotForm from "./components/SpotForm";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";

import Drawer from "@mui/material/Drawer";
import SpotCard from "./components/SpotCard";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function getDisplayName(user) {
  if (!user) return "";
  if (user.firstName) {
    const lastInitial = user.lastName ? ` ${user.lastName.charAt(0)}.` : "";
    return `${user.firstName}${lastInitial}`;
  }
  return user.primaryEmailAddress?.emailAddress?.split("@")[0] || "";
}

function App() {
  const { isSignedIn, isLoaded, user } = useUser();
  const { getToken } = useAuth();
  const [isGuest, setIsGuest] = useState(false);

  const [activeTab, setActiveTab] = useState("map");
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSpotId, setSelectedSpotId] = useState(null);
  const [isAddingSpot, setIsAddingSpot] = useState(false);
  const [profileTab, setProfileTab] = useState("public");

  const [searchText, setSearchText] = useState("");

  const selectedSpot =
    spots.find((spot) => spot._id === selectedSpotId) || null;

  const mySpots = spots.filter((spot) => spot.createdBy === user?.id);
  const publicSpots = mySpots.filter((spot) => spot.visibility !== "secret");
  const secretSpots = mySpots.filter((spot) => spot.visibility === "secret");

  const visibleSpots = spots.filter(
    (spot) => spot.visibility !== "secret" || spot.createdBy === user?.id,
  );

  const filteredSpots = visibleSpots.filter((spot) => {
    if (!searchText.trim()) return true;
    const query = searchText.toLowerCase();
    return (
      spot.name?.toLowerCase().includes(query) ||
      spot.description?.toLowerCase().includes(query) ||
      spot.address?.toLowerCase().includes(query) ||
      spot.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  const displayName = getDisplayName(user);

  useEffect(() => {
    getSpots()
      .then(setSpots)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleAddSpot(spotData) {
    try {
      const token = await getToken();
      const newSpot = await createSpot(spotData, token);
      setSpots((prevSpots) => [...prevSpots, newSpot]);
      setSelectedSpotId(newSpot._id);
      setIsAddingSpot(false);
    } catch (err) {
      alert(`Failed to add spot: ${err.message}`);
    }
  }

  if (!isLoaded) {
    return <Typography sx={{ p: 2 }}>Loading…</Typography>;
  }

  if (!isSignedIn && !isGuest) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          pt: 6,
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Kleechat"
          sx={{ height: 48, mb: 3 }}
        />
        <SignIn
          routing="virtual"
          appearance={{
            variables: {
              colorPrimary: "#004027",
              colorText: "#041C2C",
              colorBackground: "#FFFFFF",
              colorDanger: "#D32F2F",
              fontFamily: "Manrope, sans-serif",
              borderRadius: "8px",
            },
            elements: {
              rootBox: { width: "fit-content", margin: "0 auto" },
              headerTitle: { display: "none" },
              headerSubtitle: { display: "none" },
            },
          }}
        />
        <Button
          variant="text"
          fullWidth
          sx={{
            mt: 2,
            color: "#004027",
            "&:hover": { backgroundColor: "rgba(0, 64, 39, 0.08)" },
          }}
          onClick={() => setIsGuest(true)}
        >
          Continue as guest
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ paddingBottom: 7 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="add spot"
            onClick={() => setIsAddingSpot(true)}
            disabled={!isSignedIn}
          >
            <AddIcon />
          </IconButton>
          <Box
            component="img"
            src={logoReversed}
            alt="Kleechat"
            sx={{ height: 28 }}
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton color="inherit" aria-label="notifications">
              <NotificationsIcon />
            </IconButton>
            {isSignedIn && <UserButton />}
          </Box>
        </Toolbar>
      </AppBar>

      {isAddingSpot ? (
        <Box sx={{ padding: 2 }}>
          <SpotForm
            onClose={() => setIsAddingSpot(false)}
            onSubmit={handleAddSpot}
            userId={user?.id}
            userName={displayName}
            userImageUrl={user?.imageUrl}
          />
        </Box>
      ) : activeTab === "map" ? (
        <Box sx={{ position: "relative", height: "calc(100vh - 112px)" }}>
          <SpotMap
            spots={filteredSpots}
            selectedSpot={selectedSpot}
            onSelectSpot={setSelectedSpotId}
          />
          {loading && <Typography sx={{ p: 2 }}>Loading spots…</Typography>}
          {error && (
            <Typography color="error" sx={{ p: 2 }}>
              Error: {error}
            </Typography>
          )}
          <Paper
            sx={{
              position: "absolute",
              bottom: 16,
              left: 16,
              right: 16,
              display: "flex",
              alignItems: "center",
              px: 2,
              py: 0.5,
              borderRadius: 999,
            }}
          >
            <InputBase
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search by feature, name, or area..."
              sx={{ flex: 1 }}
            />
            <SearchIcon color="action" />
          </Paper>
        </Box>
      ) : (
        <Box sx={{ padding: 2 }}>
          {activeTab === "chat" && <Typography>Chat — coming soon</Typography>}
          {activeTab === "communities" && (
            <Typography>Communities — coming soon</Typography>
          )}
          {activeTab === "profile" &&
            (isSignedIn ? (
              <Box sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: 2,
                  }}
                >
                  <Avatar
                    src={user?.imageUrl}
                    alt={displayName}
                    sx={{ width: 80, height: 80 }}
                  />
                  <Box sx={{ textAlign: "left" }}>
                    <Typography variant="h6">{displayName}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user?.primaryEmailAddress?.emailAddress}
                    </Typography>
                  </Box>
                </Box>
                <Tabs
                  value={profileTab}
                  onChange={(event, newValue) => setProfileTab(newValue)}
                  centered
                  sx={{ mt: 2 }}
                >
                  <Tab label="Public" value="public" />
                  <Tab label="Secret" value="secret" />
                </Tabs>
                {profileTab === "public" && (
                  <Box>
                    {publicSpots.length === 0 ? (
                      <Typography sx={{ mt: 2 }} color="text.secondary">
                        You haven't added any public spots yet.
                      </Typography>
                    ) : (
                      <SpotList
                        spots={publicSpots}
                        onSelectSpot={setSelectedSpotId}
                      />
                    )}
                  </Box>
                )}
                {profileTab === "secret" && (
                  <Box>
                    {secretSpots.length === 0 ? (
                      <Typography sx={{ mt: 2 }} color="text.secondary">
                        You haven't added any secret spots yet.
                      </Typography>
                    ) : (
                      <SpotList
                        spots={secretSpots}
                        onSelectSpot={setSelectedSpotId}
                      />
                    )}
                  </Box>
                )}
              </Box>
            ) : (
              <Typography>Sign in to view your profile.</Typography>
            ))}
        </Box>
      )}

      <BottomNavigation
        value={activeTab}
        onChange={(event, newValue) => setActiveTab(newValue)}
        showLabels
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      >
        <BottomNavigationAction label="Map" value="map" icon={<MapIcon />} />
        <BottomNavigationAction label="Chat" value="chat" icon={<ChatIcon />} />
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
      <Drawer
        anchor="bottom"
        open={Boolean(selectedSpot)}
        onClose={() => setSelectedSpotId(null)}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            maxHeight: "70vh",
            overflowY: "auto",
          },
        }}
      >
        {selectedSpot && <SpotCard spot={selectedSpot} />}
      </Drawer>
    </Box>
  );
}

export default App;

import { useState } from "react";
import { uploadPhoto } from "../api/upload";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationPicker from "./LocationPicker";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";

const SKATE_FEATURE_TAGS = [
  "stairs",
  "handrail",
  "flat_bar",
  "out_rail",
  "ledge",
  "hubba",
  "manual_pad",
  "bank",
  "gap",
  "curb",
  "flat_ground",
  "wall_ride",
  "drop_in",
];
const GROUND_CONDITIONS = ["smooth", "rough", "mixed", "moderate"];
const KICK_OUT_RISK_LEVELS = ["low", "medium", "high", "very_high"];

function SpotForm({ onClose, onSubmit, userId, userName, userImageUrl }) {
  const [step, setStep] = useState(0);
  const [location, setLocation] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [tags, setTags] = useState([]);
  const [groundCondition, setGroundCondition] = useState("");
  const [kickOutRisk, setKickOutRisk] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const toggleTag = (tag) => {
    setTags(
      (prev) =>
        prev.includes(tag)
          ? prev.filter((t) => t !== tag) // already picked → remove it
          : [...prev, tag], // not picked → add it
    );
  };

  function handleSubmit() {
    onSubmit({
      name,
      description,
      address,
      location: {
        type: "Point",
        coordinates: [location.lng, location.lat],
      },
      tags,
      groundCondition,
      kickOutRisk,
      photoUrl,
      createdBy: userId,
      createdByName: userName,
      createdByImageUrl: userImageUrl,
    });
  }
  async function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await uploadPhoto(file);
      setPhotoUrl(url);
    } catch (err) {
      alert(`Failed to upload photo: ${err.message}`);
    } finally {
      setUploading(false);
    }
  }
  return (
    <Box sx={{ padding: 2 }}>
      <IconButton onClick={onClose} aria-label="back">
        <ArrowBackIcon />
      </IconButton>

      {step === 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Spot Guidelines</Typography>
          <Typography sx={{ mt: 2 }}>
            Be as accurate with your description as possible. Include details
            about the spot's location, features, and kick out risk.
          </Typography>
          <Button variant="contained" sx={{ mt: 3 }} onClick={() => setStep(1)}>
            Next
          </Button>
        </Box>
      )}

      {step === 1 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Where is this spot?</Typography>
          <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
            Tap the map to drop a pin at the spot's location.
          </Typography>
          <LocationPicker location={location} onSelectLocation={setLocation} />
          <Button
            variant="contained"
            sx={{ mt: 3 }}
            disabled={!location}
            onClick={() => setStep(2)}
          >
            Next
          </Button>
        </Box>
      )}

      {step === 2 && (
        <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h6">Spot details</Typography>

          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
          />
          <TextField
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          {/* Tags: pick many */}
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Features · pick all that apply
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {SKATE_FEATURE_TAGS.map((tag) => (
                <Chip
                  key={tag}
                  label={tag.replaceAll("_", " ")}
                  color={tags.includes(tag) ? "primary" : "default"}
                  onClick={() => toggleTag(tag)}
                />
              ))}
            </Box>
          </Box>

          {/* Ground condition: pick one */}
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Ground condition · pick one
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {GROUND_CONDITIONS.map((c) => (
                <Chip
                  key={c}
                  label={c}
                  color={groundCondition === c ? "primary" : "default"}
                  onClick={() => setGroundCondition(c)}
                />
              ))}
            </Box>
          </Box>

          {/* Kick-out risk: pick one */}
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Kick-out risk · pick one
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {KICK_OUT_RISK_LEVELS.map((r) => (
                <Chip
                  key={r}
                  label={r.replaceAll("_", " ")}
                  color={kickOutRisk === r ? "primary" : "default"}
                  onClick={() => setKickOutRisk(r)}
                />
              ))}
            </Box>
          </Box>

          <Button
            variant="contained"
            disabled={!name}
            onClick={() => setStep(3)}
          >
            Next
          </Button>
        </Box>
      )}
      {step === 3 && (
        <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h6">Photos</Typography>

          <input type="file" accept="image/*" onChange={handlePhotoChange} />

          {uploading && <Typography variant="body2">Uploading…</Typography>}
          {photoUrl && !uploading && (
            <Typography variant="body2" color="success.main">
              Photo uploaded ✓
            </Typography>
          )}

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={uploading}
          >
            Submit spot
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default SpotForm;

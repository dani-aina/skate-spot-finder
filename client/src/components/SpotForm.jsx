import { useState } from "react";
import { uploadPhoto } from "../api/upload";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationPicker from "./LocationPicker";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
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

          <FormControl>
            <InputLabel id="tags-label">Tags</InputLabel>
            <Select
              labelId="tags-label"
              multiple
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              input={<OutlinedInput label="Tags" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {selected.map((tag) => (
                    <Chip key={tag} label={tag} size="small" />
                  ))}
                </Box>
              )}
            >
              {SKATE_FEATURE_TAGS.map((tag) => (
                <MenuItem key={tag} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel id="ground-label">Ground condition</InputLabel>
            <Select
              labelId="ground-label"
              label="Ground condition"
              value={groundCondition}
              onChange={(e) => setGroundCondition(e.target.value)}
            >
              {GROUND_CONDITIONS.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel id="risk-label">Kick-out risk</InputLabel>
            <Select
              labelId="risk-label"
              label="Kick-out risk"
              value={kickOutRisk}
              onChange={(e) => setKickOutRisk(e.target.value)}
            >
              {KICK_OUT_RISK_LEVELS.map((r) => (
                <MenuItem key={r} value={r}>
                  {r}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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

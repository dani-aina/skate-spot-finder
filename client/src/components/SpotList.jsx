import Stack from "@mui/material/Stack";
import SpotCard from "./SpotCard";

function SpotList({ spots, onSelectSpot }) {
  return (
    <Stack spacing={2}>
      {spots.map((spot) => (
        <SpotCard key={spot._id} spot={spot} onSelectSpot={onSelectSpot} />
      ))}
    </Stack>
  );
}

export default SpotList;

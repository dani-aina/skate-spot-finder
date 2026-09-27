import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

function SpotList({ spots }) {
  return (
    <Stack spacing={2}>
      {spots.map((spot) => (
        <Card key={spot._id}>
          <CardContent>
            <Typography variant="h6">{spot.name}</Typography>

            {spot.address && (
              <Typography variant="body2" color="text.secondary">
                {spot.address}
              </Typography>
            )}

            {spot.description && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                {spot.description}
              </Typography>
            )}

            <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
              {spot.tags?.map((tag) => (
                <Chip key={tag} label={tag} size="small" />
              ))}
              {spot.groundCondition && (
                <Chip
                  label={spot.groundCondition}
                  size="small"
                  variant="outlined"
                />
              )}
              {spot.bustRisk && (
                <Chip
                  label={`bust risk: ${spot.bustRisk}`}
                  size="small"
                  color="warning"
                  variant="outlined"
                />
              )}
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}

export default SpotList;

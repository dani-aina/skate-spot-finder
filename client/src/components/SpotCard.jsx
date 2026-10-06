import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

function SpotCard({ spot, onSelectSpot }) {
  return (
    <Card
      key={spot._id}
      onClick={() => onSelectSpot?.(spot._id)}
      sx={{ cursor: "pointer" }}
    >
      {spot.photoUrl && (
        <Box
          component="img"
          src={spot.photoUrl}
          alt={spot.name}
          sx={{ width: "100%", height: 180, objectFit: "cover" }}
        />
      )}
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
          {spot.kickOutRisk && (
            <Chip
              label={`kick-out risk: ${spot.kickOutRisk}`}
              size="small"
              color="warning"
              variant="outlined"
            />
          )}
        </Stack>
        {spot.createdByName && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1.5 }}>
            <Avatar
              src={spot.createdByImageUrl}
              alt={spot.createdByName}
              sx={{ width: 20, height: 20 }}
            />
            <Typography variant="caption" color="text.secondary">
              Added by {spot.createdByName}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default SpotCard;

import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";

interface NoteCardProps {
  name: string;
  image_url: string;
}

function NoteCard({ name, image_url }: NoteCardProps) {
  return (
    <Card sx={{ width: 70, margin: 1, boxShadow: 3, textAlign: "center" }}>
      <Box
        sx={{
          width: 50,
          height: 50,
          margin: "0.5rem auto",
          overflow: "hidden",
          borderRadius: 1, // isteğe bağlı hafif yuvarlatma
        }}
      >
        <CardMedia
          component="img"
          image={image_url}
          alt={name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // taşmayı engeller ve kareye sığdırır
          }}
        />
      </Box>
      <CardContent sx={{ padding: "0.25rem 0" }}>
        <Typography variant="caption" component="div">
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NoteCard;

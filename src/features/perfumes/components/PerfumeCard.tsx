import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material'

interface PerfumeCardProps {
    brand: string,
    name: string,
    image_url: string
}

function PerfumeCard({brand, name, image_url}: PerfumeCardProps) {
  return (
    <Card sx={{width: 220, margin: 1, boxShadow: 3, textAlign: "center" }}>
        <Box sx={{width: 200, height: 300, margin: "0.5rem auto", overflow: "hidden", borderRadius: 1}}>
            <CardMedia
                component="img"
                image={image_url}
                alt={name}
                sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                }}
            />
        </Box>
        <CardContent sx={{ padding: "0.25 rem 0"}}>
            <Typography variant='caption' component="div">
                {brand} - {name}
            </Typography>
        </CardContent>
    </Card>
  )
}

export default PerfumeCard
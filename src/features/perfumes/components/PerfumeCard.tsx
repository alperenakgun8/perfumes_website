import { Card, CardMedia, CardContent, CardActionArea,Typography, Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../../app/store'
import { fetchPerfumeById } from '../thunks/perfumeThunks'
import { Link } from 'react-router-dom'

interface PerfumeCardProps {
    _id: string
    brand: string,
    name: string,
    image_url: string
}

function PerfumeCard({_id, brand, name, image_url}: PerfumeCardProps) {

    const dispatch = useDispatch<AppDispatch>();
    const handleClickCard = () => {
        console.log(_id);
        dispatch(fetchPerfumeById(_id));
    }

  return (
    <Card sx={{ margin: 1, boxShadow: 3, textAlign: "center", cursor: "pointer" }}>
  <CardActionArea component={Link} to="/detail" onClick={handleClickCard} sx={{ display: "flex", flexDirection: "column" }}>
    <Box sx={{ width: 200, height: 300, margin: "0.5rem auto", overflow: "hidden", borderRadius: 1 }}>
      <CardMedia
        component="img"
        image={image_url}
        alt={name}
        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </Box>
    <CardContent sx={{ padding: "0.25rem 0" }}>
      <Typography variant="body2" component="div">
        {brand} - {name}
      </Typography>
    </CardContent>
  </CardActionArea>
</Card>
  )
}

export default PerfumeCard
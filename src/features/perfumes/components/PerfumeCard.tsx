import { Card, CardMedia, CardContent, CardActionArea,Typography, Box, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../../app/store'
import { addUserFavorite, deleteUserFavorite } from '../../users/thunks/userThunks'
import { perfumeSlice } from '../slices/perfumeSlice'

interface PerfumeCardProps {
    _id: string
    brand: string,
    name: string,
    image_url: string
}

function PerfumeCard({_id, brand, name, image_url}: PerfumeCardProps) {


  const userId = useSelector((state: RootState) => state.user.user._id);
  const dispatch = useDispatch<AppDispatch>();
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  
    const favorites = useSelector((state: RootState) => state.user.favorites);
  
  useEffect(() => {
    const isFav = favorites.some(f => f._id === _id);
    setIsFavorite(isFav);
  }, [_id, favorites]);
  

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
      const body = {user_id: userId || "", perfume_id: _id}
      console.log("userId:", userId, "_id:", _id);
      if(isFavorite) {
        dispatch(deleteUserFavorite(body));
      } else {
        dispatch(addUserFavorite(body));
      }
      setIsFavorite(!isFavorite);
    
  }

  return (
    <Card sx={{ margin: 1, boxShadow: 3, textAlign: "center", cursor: "pointer", position: "relative" }}>
      <IconButton
        onClick={handleFavoriteClick}
        sx={{ position: "absolute", top: 8, right: 8, color: isFavorite ? "error.main" : "gray", zIndex: 2 }}
      >
        {isFavorite ? <FaHeart /> : <FaRegHeart />}
      </IconButton>
  <CardActionArea component={Link} to={`/detail/${_id}`} 
  sx={{ display: "flex", flexDirection: "column" }}>
    <Box sx={{ width: 200, height: 300, margin: "1.5rem", overflow: "hidden", borderRadius: 1 }}>
      <CardMedia
        component="img"
        image={image_url}
        alt={name}
        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </Box>
    <CardContent sx={{ padding: "0.25rem 0" }}>
      <Typography variant="body2" component="div" margin="1.5rem">
        {brand} - {name}
      </Typography>
    </CardContent>
  </CardActionArea>
</Card>
  )
}

export default PerfumeCard
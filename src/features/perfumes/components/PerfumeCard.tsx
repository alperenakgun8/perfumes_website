import { Card, CardMedia, CardContent, CardActionArea,Typography, Box, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../app/store';
import { addUserFavorite, deleteUserFavorite } from '../../users/thunks/userThunks';
import { useEffect, useState } from 'react';
import { fetchPerfumeFavoriteCount } from '../thunks/perfumeThunks';

interface PerfumeCardProps {
    _id: string
    brand: string,
    name: string,
    image_url: string
}

function PerfumeCard({_id, brand, name, image_url}: PerfumeCardProps) {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const favorites = useSelector((state: RootState) => state.user.favorites);
  const [isFavorite, setIsFavorite] = useState<boolean>(favorites.some(f => f._id === _id));
  const [favoriteCount, setFavoriteCount] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchPerfumeFavoriteCount(_id)).unwrap().then((count) => setFavoriteCount(count)).catch(() => setFavoriteCount(0));
  }, [favorites, _id, dispatch, isFavorite]);
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if(!token) {
      navigate("/login");
      return;
    }

    const body = { perfume_id: _id }

    if(isFavorite) {
      setIsFavorite(false);
      dispatch(deleteUserFavorite(body));
    } else {
      setIsFavorite(true);
      dispatch(addUserFavorite(body));
    }
  }

  return (
    <Card sx={{ margin: 1, boxShadow: 3, textAlign: "center", cursor: "pointer", position: "relative", backgroundColor: "#C6E3AC", width: 155, height: 250}}>
      <Box
        sx={{
          position: 'absolute',
          top: 4,
          right: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          zIndex: 2,
        }}
      >
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {favoriteCount}
        </Typography>
        <IconButton onClick={handleFavoriteClick} sx={{ color: isFavorite ? 'error.main' : 'gray' }}>
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </IconButton>
      </Box>
  <CardActionArea  component={Link} to={`/perfumedetail/${_id}`} 
  sx={{ display: "flex", flexDirection: "column" }}>
    <Box sx={{ width: 100, height: 150, marginTop: "1.5rem", marginRight: "0.75rem", marginLeft: "0.75rem", overflow: "hidden", borderRadius: 1 }}>
      <CardMedia
        component="img"
        image={image_url}
        alt={name}
        sx={{ width: "100%", height: "100%", objectFit: "cover", marginTop: "1rem" }}
      />
    </Box>
    <CardContent sx={{ padding: "0.25rem 0" }}>
      <Typography variant="body2" component="div" margin="0.5rem">
        {brand}
      </Typography>
      <Typography variant="body2" component="div" margin="0.5rem">
        {name}
      </Typography>
    </CardContent>
  </CardActionArea>
</Card>
  )
}

export default PerfumeCard
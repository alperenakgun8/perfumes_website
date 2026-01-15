import { useSelector } from 'react-redux'
import type { RootState } from '../../../app/store';
import PerfumeCard from '../../../features/perfumes/components/PerfumeCard';
import { 
  Box,
  CardContent,
  Grid,
  Typography
 } from '@mui/material';

function FavoritesPage() {

  const favorites = useSelector((state: RootState) => state.user.favorites);

  return (
    <Box sx={{margin: "2rem auto", padding: 2, backgroundColor: "transparent"}}>
      <CardContent>
        <Typography justifySelf="center" variant='h5' gutterBottom>
          Favorilerim
        </Typography>

        {
          favorites.length === 0 ? (
            <Typography color='text.secondary'>
              En sevdiğiniz parfümleri favorilerinize ekleyin!!
            </Typography>
          ): (
            <Grid container spacing={1} justifyContent="center">
              {
                favorites.map((f) => (
                  <Grid key={f._id}>
                    <PerfumeCard
                      _id={f._id}
                      name={f.name}
                      brand = {f.brand}
                      image_url={f.image_url}
                    />
                  </Grid>
                ))
              }
            </Grid>
          )
        }
      </CardContent>
    </Box>
  )
}

export default FavoritesPage
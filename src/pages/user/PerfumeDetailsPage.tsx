import { Box, Typography, Card, CardMedia, Grid, Divider, Button } from '@mui/material';
import NoteCard from '../../features/notes/components/NoteCard';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPerfumeById } from '../../features/perfumes/api/perfumeApi';
import type { PerfumeDetail } from '../../features/perfumes/api/types';

function PerfumeDetailsPage() {

  const { id } = useParams<{ id: string }>();

  const [perfumeDetail, setPerfumeDetail] = useState<PerfumeDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if(!id) return;
      setIsLoading(true);
      try{
        const data = await getPerfumeById(id);
        setPerfumeDetail(data);
      } catch (err) {
        console.log("Perfume fetch error:" , err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  },[id]);

  if(isLoading) {
    return <Typography sx={{ mt: 4, textAlign: "center" }}>Yükleniyor...</Typography>;
  }

  if (!perfumeDetail?._id) {
    return <Typography variant="h6" sx={{ mt: 4, textAlign: 'center' }}>Parfüm bulunamadı.</Typography>;
  }

  const groupedNotes: Record<string, typeof perfumeDetail.notes> = {
    TOP: [],
    MIDDLE: [],
    BASE: []
  };

  perfumeDetail.notes.forEach(note => {
    if (note.note_type in groupedNotes) groupedNotes[note.note_type].push(note);
  });

  const noteOrder: ('TOP' | 'MIDDLE' | 'BASE')[] = ['TOP', 'MIDDLE', 'BASE'];

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  }

  return (
    <Box sx={{ maxWidth: 900, margin: '2rem auto', padding: 2 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Card sx={{ boxShadow: 3 }}>
            <CardMedia
              component="img"
              image={perfumeDetail.image_url}
              alt={perfumeDetail.name}
              sx={{ width: '100%', height: 400, objectFit: 'contain', margin:"1rem auto" }}
            />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
              {perfumeDetail.brand} {perfumeDetail.name} ({perfumeDetail.concentration_id.display_name})
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary', mt: 1 }}>
              Cinsiyet: {perfumeDetail.gender} | Tip: {perfumeDetail.concentration_id.name}
            </Typography>

            {/* Favori Butonu */}
            <Button 
              onClick={handleFavoriteClick} 
              sx={{ display: 'flex', alignItems: 'center', mt: 2 }}
              variant="outlined"
              color={isFavorite ? "error" : "primary"}
            >
              {isFavorite ? <FaHeart /> : <FaRegHeart />}
              <Typography sx={{ ml: 1 }}>{isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}</Typography>
            </Button>

            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
              {perfumeDetail.description}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {perfumeDetail.notes && perfumeDetail.notes.length > 0 && (
        <Box sx={{ mt: 4 }}>
          {noteOrder.map(type => {
            const notes = groupedNotes[type];
            if (notes.length === 0) return null;

            return (
              <Box key={type} sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {type === 'TOP' ? 'Üst Notalar' : type === 'MIDDLE' ? 'Orta Notalar' : 'Baz Notalar'}
                </Typography>
                <Grid container spacing={1}>
                  {notes.map(note => (
                    <Grid size="auto" key={note._id}>
                      <NoteCard name={note.name} image_url={note.image_url} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}

export default PerfumeDetailsPage;

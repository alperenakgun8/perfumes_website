import { Box, Typography, Card, CardMedia, Grid, Divider, Button, Rating } from '@mui/material';
import NoteCard from '../../../features/notes/components/NoteCard';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPerfumeById } from '../../../features/perfumes/api/perfumeApi';
import type { PerfumeDetail } from '../../../features/perfumes/api/types';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../app/store';
import { addUserFavorite, deleteUserFavorite } from '../../../features/users/thunks/userThunks';
import CommentCard from '../../../features/comments/components/CommentCard';
import { addCommentToPerfumeAndUser, fetchPerfumeComments } from '../../../features/comments/thunks/commentThunk';
import type { AddComment } from '../../../features/comments/api/types';
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

function PerfumeDetailsPage() {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const userId = useSelector((state: RootState) => state.user.user._id);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const [perfumeDetail, setPerfumeDetail] = useState<PerfumeDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const [comment, setComment] = useState<string>("");
  const [isCommenting, setIsCommenting] = useState<boolean>(false);

  const [rating, setRating] = useState<number | null>(0);

  const favorites = useSelector((state: RootState) => state.user.favorites);
  const comments = useSelector((state: RootState) => state.comment.perfumeComments);

  useEffect(() => {
    if(id) dispatch(fetchPerfumeComments(id));
    if(userId) setIsAuthenticated(true);
  }, [id]);

  useEffect(() => {
    const isFav = favorites.some(f => f._id === id);
    setIsFavorite(isFav);
  }, [id, favorites]);

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

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if(userId && id) {
      const body = {user_id: userId, perfume_id: id};
      if(isFavorite) {
        dispatch(deleteUserFavorite(body));
      } else {
        dispatch(addUserFavorite(body));
      }
    } else {
      navigate("/login");
    }
  }

  const handleSubmitComment = () => {

    if(rating !== null) {
      const body: AddComment = {
        content: comment,
        perfume_id: id || "",
        rating: rating
      }
      dispatch(addCommentToPerfumeAndUser(body));
      dispatch(fetchPerfumeComments(id || ""));
      setComment("");
      setIsCommenting(false);
      setRating(0);
    }
  }

  const handleCommenting = () => {
    if (isAuthenticated) {
      setIsCommenting(true);
    } else {
      navigate("/login");
    }
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
              color={isFavorite ? "error" : "info"}
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
      
      {
        isCommenting ? (
          <>
            <Grid size={{xs: 12}} sx={{mt: 5}}>
              <Typography variant='subtitle1' sx={{mb: 1}}>
                Parfüme Puanınız:
              </Typography>
              <Rating
                name='parfume_rating'
                value={rating}
                onChange={(_, newValue: number) => setRating(newValue)}
                precision={1}
              />
            </Grid>
            <Grid size={{xs: 12}}>
              <ReactQuill
                theme='snow'
                value={comment}
                onChange={setComment}
                placeholder='Yorum yap...'
                style={{marginTop: "1rem", height: "150px"}}
                modules={{
                  toolbar: [
                    ["bold", "italic", "underline"],
                    ["link"]
                  ]
                }}
              />
            {/* <TextField
              fullWidth
              multiline
              rows={4}
              label="Yorum yap..."
              value={comment}
              placeholder='Yorum yap...'
              onChange={(e) => setComment(e.target.value)}
              sx={{mt: 1}}
            /> */}
            </Grid>
            <Grid size={{xs: 12}}>
              <Box sx={{mt: 7 ,width:"100%", display: "flex", alignItems: "flex-end", justifyContent: "flex-end" , gap: "1rem"}}>
                <Button 
              onClick={handleSubmitComment} 
              sx={{ alignItems: 'center'}}
              variant="outlined"
              color="success"
            >
              Gönder
            </Button>
              <Button 
              onClick={() => setIsCommenting(false)} 
              sx={{ alignItems: 'center'}}
              variant="outlined"
              color="error"
            >
              Vazgeç
            </Button>
              </Box>
            </Grid>
          </>
        ) : (
          <Grid size = {{xs: 12}}>
            <Button 
              onClick={handleCommenting} 
              sx={{ display: 'flex', justifySelf: "flex-end", alignItems: 'center', mt: 2 }}
              variant="outlined"
              color="info"
            >
              Yorum Yap
            </Button>
          </Grid>
        )
      }

      {
        (comments.length === 0) ? (
          <Grid size={{xs: 12}}>
            <Typography marginTop= {2}>
              Henüz yorum yapılmamış. İlk yorumu sen yap!!
            </Typography>
          </Grid>
        ) : (
          comments.map(c => (
            <Grid key={c._id} marginTop={2} size={{xs: 12}}>
              <CommentCard comment={c}/>
            </Grid>
          ))
        )
      }
    </Box>
  );
}

export default PerfumeDetailsPage;

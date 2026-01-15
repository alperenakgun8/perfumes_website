import { Grid, Box, Toolbar,TextField, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import type { AppDispatch, RootState } from '../../../app/store';
import { useEffect, useState } from 'react';
import { fetchTopics } from '../../../features/topics/thunks/topicThunk';
import TopicCard from '../../../features/topics/components/TopicCard';

function ForumPage() {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const topics = useSelector((state: RootState) => state.topic.topic);

  const [searchTopic, setSearchTopic] = useState<string>("");

  const filteredTopics = topics.filter((t) => `${t.title}`.toLowerCase().includes(searchTopic.toLowerCase()));

  useEffect(() => {
    dispatch(fetchTopics());
  }, [dispatch]);

  return (
    <Grid container spacing={2} sx={{margin: "auto 2rem"}}>
      <Toolbar/>
      <Grid size={{xs: 12}}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <TextField
          sx={{
            maxWidth: {md: "800px"},
          }}
          fullWidth
          label="Konu Başlığı"
          placeholder='Konu Başlığı'
          value={searchTopic}
          onChange={e => setSearchTopic(e.target.value)}
        />
        </Box>
      </Grid>
      <Grid size={{xs: 12}}>
        <Box
        sx={{width: "100%" ,display: "flex", alignItems: "center", justifyContent: "flex-end"}}
          >
        <Button sx={{marginRight: "1rem"}} variant='contained' color='warning' onClick={() => navigate("/createtopic")}>
          Yeni Konu Oluştur
        </Button>
      </Box>
      </Grid>
      {
        filteredTopics.length !== 0 &&   filteredTopics.map(t => (
          <Grid size= {{xs: 12}}>
              <TopicCard key={t._id} topic={t}/>
          </Grid>
        )) 
      }
    </Grid>
  )
}

export default ForumPage
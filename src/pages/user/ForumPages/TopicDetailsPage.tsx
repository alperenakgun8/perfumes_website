import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../../app/store'
import { useParams } from 'react-router-dom';
import { getTopicById } from '../../../features/topics/api/topicApi';
import type { Topic } from '../../../features/topics/api/types';
import { BASE_URL } from '../../../config/axiosInstance';
import { Card, CardContent, Grid, Divider, Typography, CardHeader, Avatar, Box, Button } from '@mui/material';
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import type { AddTopicsComment } from '../../../features/topicsComment/api/types';
import { addTopicsCommentToTopicAndUser, fetchTopicsTopicsComment } from '../../../features/topicsComment/thunks/topicsCommentThunk';
import TopicsCommentCard from '../../../features/topicsComment/components/TopicsCommentCard';


function TopicDetailsPage() {

    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams<{ id: string }>();
    const topicComments = useSelector((state: RootState) => state.topic_comment.topicComments);
    const [topic, setTopic] = useState<Topic>();
    const userId = useSelector((state: RootState) => state.user.user._id);

    const [comment, setComment] = useState<string>("");
    const [isCommenting, setIsCommenting] = useState<boolean>(false);

    const handleSubmitComment = () => {
      const body: AddTopicsComment = {
        topic_id: id || "",
        user_id: userId || "",
        content: comment
      }
      dispatch(addTopicsCommentToTopicAndUser(body));
      setComment("");
    }

    useEffect(() => {
        const fetchData = async () => {
            if(!id) return;
            try{
                const data = await getTopicById(id);
                setTopic(data)
                dispatch(fetchTopicsTopicsComment(id));
            } catch (err) {
                console.log("Topic fetch error", err);
            }
        }
        fetchData();
    }, [id]);

  return (
    <>
      {
        topic && (
          <>
            <Card
        variant='outlined'
        sx={{
          width: "90vw",
            margin: "2rem auto",
            borderRadius: 3,
        }}
        >
                <CardHeader
                avatar={
                    <Avatar 
                        src={`${BASE_URL}${topic.user_id.profile_picture}`}
                        alt={topic.user_id.nickname}
                        sx={{width: 48, height: 48}} 
                    >
                        {topic.user_id.first_name?.[0]}
                    </Avatar>
                }
                title={
                    <Typography variant='subtitle1' fontWeight={400}>
                        {topic.user_id.nickname}
                    </Typography>
                }
                action={
                    <Typography variant='caption' color='text.secondary'>
                        {new Date(topic.created_at).toLocaleDateString("tr-TR")}
                    </Typography>
                }
            />
            <Divider/>
            <CardContent sx={{pt: 2, pb: 1}}>
                <Typography
                    variant='h6'
                    sx={{lineHeight: 1.6, fontWeight: "bold", whiteSpace: "normal",  
                        overflowWrap: "break-word", 
                        wordBreak: "break-word", }}
                    component="div"
                >
                    {topic.title}
                </Typography>
                <Typography
                    variant='body2'
                    sx={{ lineHeight:1.6, whiteSpace: "normal",  
                        overflowWrap: "break-word", 
                        wordBreak: "break-word",  }}
                    component="div"
                    dangerouslySetInnerHTML={{__html: topic.content}}
                />
            </CardContent>
        </Card>
        <Grid container spacing={2}>
        {
          isCommenting ? (
            <>
              <Grid size={{xs: 12}} sx={{mt: 5}}>
              <ReactQuill
                theme='snow'
                value={comment}
                onChange={setComment}
                placeholder='Yorum yap...'
                style={{height: "150px"}}
                modules={{
                  toolbar: [
                    ["bold", "italic", "underline"],
                    ["link"]
                  ]
                }}
              />
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
                  sx={{alignItems: "center"}}
                  variant='outlined'
                  color="error"
                >
                  Vazgeç
                </Button>
              </Box>
            </Grid>
            </>
          ) : (
            <Grid size={{xs: 12}}>
              <Button 
              onClick={() => setIsCommenting(true)}
              sx={{display: 'flex', justifySelf: "flex-end", alignItems: 'center', mt: 2}}
              variant='outlined'
              color='info'
              >
                Yorum Yap                
              </Button>
            </Grid>
          )
        }
        </Grid>
        {
          (topicComments.length === 0) ? (
            <Grid size={{xs: 12}}>
                        <Typography marginTop= {2}>
                          Henüz yorum yapılmamış. İlk yorumu sen yap!!
                        </Typography>
            </Grid>
          ) : (
            topicComments.map(c => (
            <Grid key={c._id} marginTop={2} width="90vw" size={{xs: 12}}>
              <TopicsCommentCard topicsComment={c} />
            </Grid>
          ))
          )
        }
          </>
        )
      }
    </>
  )
}

export default TopicDetailsPage
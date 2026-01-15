import type { Topic } from '../api/types';
import {
  Card,
  CardHeader,
  Avatar,
  Typography,
  CardActionArea,
  Divider,
  Box,
  IconButton
} from '@mui/material';
import { BASE_URL } from '../../../config/axiosInstance';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../app/store';
import { deleteTopicFromDB } from '../thunks/topicThunk';
import { MdCancel } from "react-icons/md";

interface TopicCardProps {
  topic: Topic;
}

function TopicCard({ topic }: TopicCardProps) {

  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.user.user);

  const handleDeleteClick = () => {
    if(topic._id) {
      dispatch(deleteTopicFromDB(topic._id));
    } else {
      console.log("topic id cannot found");
    }
  }

  return (
    <Card
      variant="outlined"
      sx={{
        position: 'relative',
        width: "95vw",
        /*marginY: 1,*/
        borderRadius: 2,
        transition: '0.2s',
        '&:hover': {
          boxShadow: 3,
          backgroundColor: 'action.hover'
        }
      }}
    >
      {user && user._id && (user.role === "ADMIN" || user.role === "SUPER_ADMIN") && 
      
      <Box
      sx={{
          position: "absolute",
          right: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          zIndex: 2,
         }}
      >
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
          Delete Topic
        </Typography>
        <IconButton onClick={handleDeleteClick} sx={{color: 'error.main'}}>
          <MdCancel/>
        </IconButton>
      </Box>

      }
      <CardActionArea
        component={Link}
        to={`/topicdetail/${topic._id}`}
        sx={{ textAlign: 'left', paddingY: 1 }}
      >
        <CardHeader
          avatar={
            <Avatar
              src={`${BASE_URL}${topic.user_id.profile_picture}`}
              alt={topic.user_id.nickname}
              sx={{ width: 40, height: 40 }}
            >
              {topic.user_id.first_name?.[0]}
            </Avatar>
          }
          title={
            <Typography variant="subtitle1" fontWeight={600}>
              {topic.title}
            </Typography>
          }
          subheader={
            <Typography variant="body2" color="text.secondary">
              {topic.user_id.nickname} —{' '}
              {new Date(topic.created_at).toLocaleDateString('tr-TR')}
            </Typography>
          }
        />
      </CardActionArea>
      <Divider />
    </Card>
  );
}

export default TopicCard;

// import type { Topic } from '../api/types'
// import { Card, CardHeader, CardContent, Avatar, Typography, Divider, CardActionArea} from '@mui/material'
// import { BASE_URL } from '../../../config/axiosInstance'
// import { Link } from 'react-router-dom'

// interface TopicCardProps {
//     topic: Topic;
// }

// function TopicCard({ topic }: TopicCardProps) {

//   return (
    
//         <Card
//         variant='outlined'
//         sx={{
//             margin: 2,
//             borderRadius: 3,
//         }}
//         >
//             <CardActionArea sx={{ height: 300}} component={Link} to={`/topicdetail/${topic._id}`}>
//                 <CardHeader
//                 avatar={
//                     <Avatar 
//                         src={`${BASE_URL}${topic.user_id.profile_picture}`}
//                         alt={topic.user_id.nickname}
//                         sx={{width: 48, height: 48}} 
//                     >
//                         {topic.user_id.first_name?.[0]}
//                     </Avatar>
//                 }
//                 title={
//                     <Typography variant='subtitle1' fontWeight={400}>
//                         {topic.user_id.nickname}
//                     </Typography>
//                 }
//                 action={
//                     <Typography variant='caption' color='text.secondary'>
//                         {new Date(topic.created_at).toLocaleDateString("tr-TR")}
//                     </Typography>
//                 }
//             />
//             <Divider/>
//             <CardContent sx={{pt: 2, pb: 1}}>
//                 <Typography
//                     variant='h6'
//                     sx={{lineHeight: 1.6, fontWeight: "bold", whiteSpace: "normal",  
//                         overflowWrap: "break-word", 
//                         wordBreak: "break-word" }}
//                     component="div"
//                 >
//                     {topic.title}
//                 </Typography>
//                 <Typography
//                     variant='body2'
//                     sx={{ 
//                         lineHeight:1.6, 
//                         whiteSpace: "normal",  
//                         overflowWrap: "break-word", 
//                         wordBreak: "break-word", 
//                     }}
//                     component="div"
//                     dangerouslySetInnerHTML={{__html: topic.content}}
//                 />
//             </CardContent>
//             </CardActionArea>
//         </Card>
    
//   )
// }

// export default TopicCard
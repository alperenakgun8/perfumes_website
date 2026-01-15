import type { Comment } from '../api/types';
import { Card, CardHeader, CardContent, Avatar, Typography, Divider, Rating, Box, IconButton } from '@mui/material';
import { BASE_URL } from '../../../config/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../app/store';
import { deleteCommentFromPerfumeAndUser } from '../thunks/commentThunk';
import { MdCancel } from "react-icons/md";

interface CommentCardProps {
  comment: Comment;
}

function CommentCard({ comment }: CommentCardProps) {

  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.user.user);

  const handleDeleteClick = () => {
    if(comment._id) {
      dispatch(deleteCommentFromPerfumeAndUser(comment._id));
    } else {
      console.log("comment id not found");
    }
  }

  return (
    <Card 
      variant="outlined" 
      sx={{ 
        position: 'relative',
        mb: 2, 
        borderRadius: 3, 
        boxShadow: 2,
        p: 1
      }}
    >
      {user && user._id !== "" && (user.role === "SUPER_ADMIN" || comment.user_id._id === user._id) &&  
      
      <Box
         sx={{
          position: "absolute",
          bottom: 8,
          right: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          zIndex: 2,
         }}
      >
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
          Delete Comment
        </Typography>
        <IconButton onClick={handleDeleteClick} sx={{ color: 'error.main'}}>
          <MdCancel />
        </IconButton>
      </Box>}
      <CardHeader
        avatar={
          <Avatar
            src={`${BASE_URL}${comment.user_id.profile_picture}`}
            alt={comment.user_id.nickname}
            sx={{ width: 48, height: 48 }}
          >
            {comment.user_id.first_name?.[0]}
          </Avatar>
        }
        title={
          <Typography variant="subtitle1" fontWeight={600}>
            {comment.user_id.nickname}
          </Typography>
        }
        subheader={
          <Typography variant="caption" color="text.secondary">
            {new Date(comment.created_at).toLocaleDateString("tr-TR")}
          </Typography>
        }
        action={
          <Rating
            value={comment.rating}
            precision={1}
            readOnly
            size='medium'
          />
        }
      />
      <Divider />
      <CardContent sx={{ pt: 2, pb: 1 }}>
        <Typography 
          variant="body1" 
          sx={{ lineHeight: 1.6, whiteSpace: "normal",  
                        overflowWrap: "break-word", 
                        wordBreak: "break-word"  }}
          component="div"
          dangerouslySetInnerHTML={{__html: comment.content}}
          />
      </CardContent>
    </Card>
  );
}

export default CommentCard;

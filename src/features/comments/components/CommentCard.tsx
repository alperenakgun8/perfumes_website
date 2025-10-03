import type { Comment } from '../api/types';
import { Card, CardHeader, CardContent, Avatar, Typography, Divider, Rating } from '@mui/material';
import { BASE_URL } from '../../../config/axiosInstance';

interface CommentCardProps {
  comment: Comment;
}

function CommentCard({ comment }: CommentCardProps) {
  return (
    <Card 
      variant="outlined" 
      sx={{ 
        mb: 2, 
        borderRadius: 3, 
        boxShadow: 2,
        p: 1
      }}
    >
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

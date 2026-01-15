import { Card, CardHeader, CardContent,Avatar, Typography, Divider, Box, IconButton } from '@mui/material'
import type { TopicsComment } from '../api/types'
import { BASE_URL } from '../../../config/axiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../../app/store'
import { deleteTopicsCommentFromTopicAndUser } from '../thunks/topicsCommentThunk'
import { MdCancel } from "react-icons/md";

interface TopicsCommentCardProps {
    topicsComment: TopicsComment
}

function TopicsCommentCard({ topicsComment }: TopicsCommentCardProps) {

    const dispatch = useDispatch<AppDispatch>();

    const user = useSelector((state: RootState) => state.user.user);

    const handleDeleteClick = () => {
        if(topicsComment._id) {
            dispatch(deleteTopicsCommentFromTopicAndUser(topicsComment._id));
        } else {
            console.log("comment id not found");
        }
    }

  return (
    <Card
        variant='outlined'
        sx={{
            position: 'relative',
            mb: 2,
            borderRadius: 3,
            boxShadow: 2,
            p: 1
        }}
    >
        {user && user._id && (user.role === "SUPER_ADMIN" || topicsComment.user_id._id === user._id) &&

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
            </Box>

        }
        <CardHeader
            avatar={
                <Avatar
                    src={`${BASE_URL}${topicsComment.user_id.profile_picture}`}
                    alt={topicsComment.user_id.nickname}
                    sx={{ width: 48, height: 48 }}
                >
                    {topicsComment.user_id.first_name?.[0]}
                </Avatar>
                }
                title={
                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                    >
                        {topicsComment.user_id.nickname}
                    </Typography>
                }
                subheader={
                    <Typography variant='caption' color='text.secondary'>
                        {new Date(topicsComment.created_at).toLocaleDateString("tr-TR")}
                    </Typography>
                }
         />
         <Divider/>
         <CardContent sx={{ pt: 2, pb: 1 }}>
            <Typography
                variant='body1'
                sx={{ lineHeight: 1.6, whiteSpace: "normal",  
                        overflowWrap: "break-word", 
                        wordBreak: "break-word", }}
                component="div"
                dangerouslySetInnerHTML={{__html: topicsComment.content}}
            />
         </CardContent>
    </Card>
  )
}

export default TopicsCommentCard
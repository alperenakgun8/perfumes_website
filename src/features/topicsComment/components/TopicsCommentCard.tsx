import { Card, CardHeader, CardContent,Avatar, Typography, Divider } from '@mui/material'
import type { TopicsComment } from '../api/types'
import { BASE_URL } from '../../../config/axiosInstance'

interface TopicsCommentCardProps {
    topicsComment: TopicsComment
}

function TopicsCommentCard({ topicsComment }: TopicsCommentCardProps) {

  return (
    <Card
        variant='outlined'
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
import type { Topic } from '../api/types'
import { Card, CardHeader, CardContent, Avatar, Typography, Divider, CardActionArea} from '@mui/material'
import { BASE_URL } from '../../../config/axiosInstance'
import { Link } from 'react-router-dom'

interface TopicCardProps {
    topic: Topic;
}

function TopicCard({ topic }: TopicCardProps) {

  return (
    
        <Card
        variant='outlined'
        sx={{
            margin: 2,
            borderRadius: 3,
        }}
        >
            <CardActionArea sx={{ height: 300}} component={Link} to={`/topicdetail/${topic._id}`}>
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
                        wordBreak: "break-word" }}
                    component="div"
                >
                    {topic.title}
                </Typography>
                <Typography
                    variant='body2'
                    sx={{ 
                        lineHeight:1.6, 
                        whiteSpace: "normal",  
                        overflowWrap: "break-word", 
                        wordBreak: "break-word", 
                    }}
                    component="div"
                    dangerouslySetInnerHTML={{__html: topic.content}}
                />
            </CardContent>
            </CardActionArea>
        </Card>
    
  )
}

export default TopicCard
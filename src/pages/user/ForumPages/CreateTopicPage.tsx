import { Grid, TextField, Card, CardContent, Typography,CardActions, Button } from "@mui/material"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../app/store";
import type { AddTopic } from "../../../features/topics/api/types";
import { addTopicToDB } from "../../../features/topics/thunks/topicThunk";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

function CreateTopicPage() {

  const userId = useSelector((state: RootState) => state.user.user._id);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleAddTopic = () => {
    if(userId) {
      const body: AddTopic = {
        title,
        content,
        user_id: userId
      }
      dispatch(addTopicToDB(body));
      setTitle("");
      setContent("");
      navigate("/forum");
    }
  }

  return (
  <>
    <Card sx={{margin: "2rem auto", padding: 2, boxShadow: 3, width: {md: 900}}}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Yeni bir konu başlığı oluşturun
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{xs: 12}}>
            <TextField
              fullWidth
              required
              label="Başlık"
              placeholder="Başlık"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </Grid>
          <Grid size={{xs: 12}}>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              placeholder="Konu içeriği..."
              style={{marginTop: "1rem", height: "250px"}}
              modules={{
                toolbar: [
                  ["bold", "italic", "underline"],
                  ["link"]
                ]
              }}
            />
            {/* <TextField
              fullWidth
              required
              multiline
              rows={4}
              label="İçerik"
              value={content}
              onChange={e => setContent(e.target.value)}
            /> */}
          </Grid>
        </Grid>
      </CardContent>
      
      <CardActions sx={{ justifyContent: "flex-end", padding: "1rem" }}>
        <Button variant="contained" color="success" onClick={handleAddTopic} sx={{mt: 3}}>
          Oluştur
        </Button>
      </CardActions>
    </Card>
  </>
  )
}

export default CreateTopicPage
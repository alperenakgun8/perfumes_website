import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import {
  Container,
  Avatar,
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  Divider,
  TextField
} from "@mui/material";
import type { UserUpdate } from "../../features/users/api/types";
import { updateExistingUser, updateExistingUserProfilePicture } from "../../features/users/thunks/userThunks";
import { BASE_URL } from "../../config/axiosInstance";

function ProfileManagement() {

  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.user.user);
  const baseurl = BASE_URL;

  const [isEditable, setIsEditable] = useState(false);

  const [name, setName] = useState(user.first_name);
  const [surname, setSurname] = useState(user.last_name);
  const [nickname, setNickname] = useState(user.nickname);

  const [profilePic, setProfilePic] = useState(user.profile_picture);
  const fileInputRef = useRef<HTMLInputElement | null>(null);


  const handleEdit = () => {
    setIsEditable(true);
  }

  const handleUndo = () => {
    setName(user.first_name);
    setSurname(user.last_name);
    setIsEditable(false);
  }

  const handleSave = () => {
    const body: UserUpdate = {
      _id: user._id || "",
      first_name: name,
      last_name: surname,
      nickname: nickname
    }
    dispatch(updateExistingUser(body));
    setIsEditable(false);
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if(file) {
      const previewUrl = URL.createObjectURL(file);
      setProfilePic(previewUrl);
      dispatch(updateExistingUserProfilePicture({id: user._id || "", file}));
    }
  }

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={8}
        sx={{
          p: 4,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 2
        }}
      >
        <Avatar
          src={`${baseurl}${profilePic}` || ""}
          alt={user.first_name}
          sx={{ width: 120, height: 120, mb: 2, cursor:"pointer" }}
          onClick={handleAvatarClick}
        >
          {user.first_name?.[0]}
        </Avatar>
        <input 
          type="file" 
          accept="image/*"
          ref={fileInputRef}
          style={{display: "none"}}
          onChange={handleFileChange}
        />

        <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
          {user.first_name} {user.last_name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
          {
            user.role === "User" ? "Kullanıcı" :
            user.role === "Admin" ? "Admin" :
            user.role === "Super Admin" ? "Süper Admin" :
            "Rol Bulunamadı"
          }
        </Typography>

        <Divider sx={{ width: "100%", mb: 2 }} />

        <Box sx={{ width: "100%" }}>
          {
            isEditable ? (
              <Grid container spacing={2}> 
                <Grid size={{xs: 12}}>
                  <Typography variant="body1">
                    <strong>Email:</strong> {user.email}
                  </Typography>
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                  <TextField
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    label="Ad"
                    placeholder="Ad:"
                  />
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                  <TextField
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    fullWidth
                    label="Soyad"
                    placeholder="Soyad:"
                  />
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                  <TextField
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    fullWidth
                    label="Kullanıcı Adı"
                    placeholder="Kullanıcı Adı:"
                  />
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={2}>
                <Grid size={{xs: 12}}>
                  <Typography variant="body1">
                    <strong>Email:</strong> {user.email}
                  </Typography>
              </Grid>
              <Grid size={{xs: 12, sm: 6}}>
                <Typography variant="body1">
                  <strong>Ad:</strong> {user.first_name}
                </Typography>
              </Grid>
              <Grid size={{xs: 12, sm: 6}}>
                <Typography variant="body1">
                  <strong>Soyad:</strong> {user.last_name}
                </Typography>
              </Grid>
              <Grid size={{xs: 12}}>
                <Typography variant="body1">
                  <strong>Kullanıcı Adı:</strong> {user.nickname}
                </Typography>
              </Grid>
            </Grid>
            )
          }
        </Box>
        {
          isEditable ? (
            <Box sx={{width:"100%", display: "flex",justifyContent: "space-between", alignItems: "center"}}>
              <Button
              variant="contained"
              color="success"
              sx={{ mt: 2 }}
              onClick={handleSave}
              >
                Kaydet
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ mt: 2 }}
                onClick={handleUndo}
              >
                İptal
              </Button>
            </Box>
          ) : (
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleEdit}
            >
              Düzenle
            </Button>
          )
        }
      </Paper>
    </Container>
  );
}

export default ProfileManagement;

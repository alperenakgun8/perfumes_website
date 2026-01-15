import { Container, Paper, Avatar, Typography, Box, TextField, Button, Grid, Link } from "@mui/material"
import { useState } from "react";
import { FaRegRegistered } from "react-icons/fa";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import type { UserRegister } from "../../../features/users/api/types";
import { addUser } from "../../../features/users/api/userApi";

function RegisterPage() {

    const navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordValidation, setPasswordValidation] = useState<string>();
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [nickname, setNickname] = useState<string>("");

    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [passwordValidationError, setPasswordValidationError] = useState<string>("");
    const [nameError, setNameError] = useState<string>("");
    const [surnameError, setSurnameError] = useState<string>("");
    const [nicknameError, setNicknameError] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let valid = true;

        if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            setEmailError("Geçerli bir email giriniz");
            valid = false;
        } else {
            setEmailError("");
        }

        if (password.length < 8 || password.length >    16) {
            setPasswordError("Şifre 8-16 karakter arasında olmalı");
            valid = false;
        } else {
            setPasswordError("");
        }

        if (name.length === 0) {
            setNameError("Lütfen isim giriniz");
            valid = false;
        } else {
            setNameError("");
        }

        if (surname.length === 0) {
            setSurnameError("Lütfen soyisim giriniz");
            valid = false;
        } else {
            setSurnameError("");
        }

        if(nickname.length < 8 || nickname.length > 16) {
            setNicknameError("Kullanıcı adı 8-16 karakter arasında olmalı")
        } else {
            setNicknameError("");
        }

        if(!valid) return;

        if(password !== passwordValidation) {
            valid = false;
            setPasswordError("Şifreler aynı olmalı");
            setPasswordValidationError("Şifreler aynı olmalı");
        }

        if(!valid) return;

        const body: UserRegister = {
            first_name: name,
            last_name: surname,
            nickname: nickname,
            email: email,
            password: password,
        }

        const isRegister = await addUser(body);

        if(isRegister) {
            navigate("/login");
        }
    }

  return (
    <Container maxWidth="md" sx={{marginTop: "2rem"}}>
        <Paper elevation={10} sx={{marginTop: 1, padding: 1.3}}>
            <Avatar sx={{
                mx: 'auto',
                bgcolor: "#CB336B",
                textAlign: "center",
                mb: 1
            }}>
                <FaRegRegistered/>
            </Avatar>
            <Typography component="h1" variant="h5" sx={{textAlign: "center"}}>
                Kayıt Ol
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                <Grid container spacing={2}>
                    <Grid size = {{ xs: 12, md: 6}}>
                        <TextField 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ad:" 
                fullWidth 
                required 
                sx={{mb: 2}}
                error = {!!nameError}
                helperText = {nameError}
                />
                    </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <TextField 
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder="Soyad:" 
                fullWidth 
                required 
                sx={{mb: 2}}
                error = {!!surnameError}
                helperText = {surnameError}
                />
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <TextField 
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Kullanıcı Adı:" 
                fullWidth 
                required 
                sx={{mb: 2}}
                error = {!!nicknameError}
                helperText = {nicknameError}
                />
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <TextField 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email:" 
                fullWidth 
                required 
                sx={{mb: 2}}
                error = {!!emailError}
                helperText = {emailError}
                />
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <TextField 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Şifre:" 
                fullWidth 
                required 
                type="password"
                sx={{mb: 2}}
                error = {!!passwordError}
                helperText = {passwordError}
                />
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <TextField 
                value={passwordValidation}
                onChange={(e) => setPasswordValidation(e.target.value)}
                placeholder="Şifre Tekrar:" 
                fullWidth 
                required 
                type="password"
                sx={{mb: 2}}
                error={!!passwordValidationError}
                helperText={!!passwordValidationError}
                />
                </Grid>
                </Grid>
                <Grid container justifyContent="center">
                    <Grid>
                        <Button type="submit" variant="contained" fullWidth sx={{mt: 1, backgroundColor: "#CB336B"}}>
                    Kayıt Ol
                </Button>
                    </Grid>
                </Grid>
                <Grid container justifyContent="center" sx={{mt: 2}}>
                    <Grid>
                        <Link component={RouterLink} underline="none" to="/login" sx={{color: "#CB336B"}}>
                            Zaten üye misin?
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    </Container>
  )
}

export default RegisterPage
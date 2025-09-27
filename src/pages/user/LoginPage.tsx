import { Container, Paper, Avatar, Typography, Box, TextField, FormControlLabel, Checkbox, Button, Grid, Link } from "@mui/material"
import { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../app/store";
import type { UserLogin } from "../../features/users/api/types";
import { fetchLoginUser, fetchUserFavorites } from "../../features/users/thunks/userThunks";

function LoginPage() {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const isAuth = useSelector((state: RootState) => state.user.isAuthenticated);4

    const userId = useSelector((state: RootState) => state.user.user._id);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

        if (!valid) return;

        const body: UserLogin  = {
            email: email,
            password: password
        }
        dispatch(fetchLoginUser(body));
    }

    useEffect(() => {
        if(isAuth) {
            const body = {user_id: userId || ""};
            dispatch(fetchUserFavorites(body));
            console.log("çalışıyoru")
            navigate("/");
        }
    }, [isAuth, navigate]);

  return (
    <Container maxWidth="xs">
        <Paper elevation={10} sx={{marginTop: 8 , padding: 2 }}>
            <Avatar sx={{
                mx: 'auto',
                bgcolor: "secondary.main",
                textAlign: "center",
                mb: 1
            }}>
                <FaSignInAlt />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{textAlign: "center"}}>
                Giriş Yap
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                <TextField 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email:" 
                fullWidth 
                required 
                autoFocus 
                sx={{mb: 2}}
                error={!!emailError}
                helperText={emailError}
                />
                <TextField 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Şifre:" 
                fullWidth 
                required 
                type="password"
                sx={{mb: 2}}
                error = {!!passwordError}
                helperText={passwordError}
                />
                <FormControlLabel control={<Checkbox value="remember" color="primary"/>} 
                label="Beni hatırla"
                />
                <Button type="submit" variant="contained" fullWidth sx={{mt: 1}}>
                    Giriş Yap 
                </Button>
                <Grid container justifyContent="space-between" sx={{mt: 2}}>
                    <Grid>
                        <Link component={RouterLink} to="/forgot">
                        Şifremi Unuttum
                        </Link>
                    </Grid>
                    <Grid>
                        <Link component={RouterLink} to="/register">
                        Kayıt Ol
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    </Container>
  )
}

export default LoginPage
import { Container, Paper, Avatar, Typography, Box, TextField, Button } from "@mui/material"
import { useState } from "react"
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import type { UserUpdatePassword } from "../../features/users/api/types";
import { updatePassword } from "../../features/users/api/userApi";
import { useNavigate } from "react-router-dom";
import { MdOutlinePassword } from "react-icons/md";

function PasswordManagementPage() {

    const navigate = useNavigate();

    const user = useSelector((state: RootState) => state.user.user);

    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [newPasswordValidation, setNewPasswordValidation] = useState<string>("");

    const [oldPasswordError, setOldPasswordError] = useState<string>("");
    const [newPasswordError, setNewPasswordError] = useState<string>("");

    const handleSubmit =  async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let valid = true;

        if(oldPassword.length < 8 || oldPassword.length > 16) {
            setOldPasswordError("Mevcut şifreniz 8-16 karakter arasında olmalı");
            valid = false;
        } else {
            setOldPasswordError("");
        }

        if(newPassword.length < 8 || newPassword.length > 16) {
            setNewPasswordError("Şifre 8-16 karakter arasında olmalı");
            valid = false;
        } else {
            setNewPasswordError("");
        }

        if(newPassword !== newPasswordValidation) {
            setNewPasswordError("Şifre tekrarı aynı değil");
            valid = false;
        } else {
            setNewPasswordError("");
        }

        if(!valid) return;

        const body: UserUpdatePassword = {
            user_id: user._id || "",
            new_password: newPassword,
            old_password: oldPassword
        }

        console.log(body);

        const response = await updatePassword(body);

        if(response.success) {
            navigate("/profile/profile");
        } else {
            if(response.message === "does not matched old_password") {
                setOldPasswordError("Şifre yanlış");
                valid = false;
            } else {
                setOldPasswordError("");
            }
        }
    }

  return (
    <Container maxWidth="xs" sx={{margin: "0 auto"}}>
        <Paper elevation={10} sx={{marginTop: 8, padding: 2}}>
            <Avatar sx={{
                mx: 'auto',
                bgcolor: "secondary.main",
                textAlign: "center",
                mb: 1
            }}>
                <MdOutlinePassword/>
            </Avatar>
            <Typography component="h1" variant="h5" sx={{textAlign: "center", mb: 2}}>
                Şifre Değiştir
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                fullWidth
                autoFocus
                required
                type="password"
                placeholder="Mevcut Şifreniz"
                sx={{mb: 2}}
                error={!!oldPasswordError}
                helperText={oldPasswordError}
                />
                <TextField
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                fullWidth
                autoFocus
                required
                type="password"
                placeholder="Yeni Şifreniz"
                sx={{mb: 2}}
                error={!!newPasswordError}
                helperText={newPasswordError}
                />
                <TextField
                value={newPasswordValidation}
                onChange={(e) => setNewPasswordValidation(e.target.value)}
                fullWidth
                autoFocus
                required
                type="password"
                placeholder="Yeni Şifreniz Tekrar"
                sx={{mb: 2}}
                error={!!newPasswordError}
                helperText={newPasswordError}
                />
                <Button type="submit" variant="contained" fullWidth sx={{mt: 1}}>
                    Şifre Değiştir
                </Button>
            </Box>
        </Paper>
    </Container>
  )
}

export default PasswordManagementPage
import { Button, Box, TextField, Typography, Grid } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from "react";
import { AuthenticationRequest } from "../../requests/authentication.requests";
import { authenticationService } from "../../services/authentication.service";
import { Link, Navigate } from "react-router-dom";

export function Login() {
    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e: any) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setLoading(true);

        const request = new AuthenticationRequest(credentials.username, credentials.password);
        const response = await authenticationService.authenticate(request);

        setLoading(false);
    }

    if (authenticationService.isLoggedIn) {
        return (<Navigate to="/" />)
    }

    return (
        <Box sx={{ height: '100vh', alignContent: "center" }}>
            <Typography variant="h3" sx={{ textAlign: "center", paddingTop: 4 }}>Login</Typography>


            <Grid sx={{
                marginTop: 10,
                paddingX: 2,
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center' }}
                container
            >
                <Grid xs={12} sm={8} md={6} item component="form" onSubmit={handleSubmit}>
                    <TextField 
                        margin="normal"
                        fullWidth
                        label="Username"
                        name="username"
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        type="password"
                        label="Password"
                        name="password"
                        onChange={handleChange}
                    />
                    <LoadingButton
                        sx={{ width: '50%', mt: 4 }}
                        type="submit"
                        variant="contained"
                        loading={loading}
                    >
                        Sign In
                    </LoadingButton>
                </Grid>

                <Grid item sx={{ textAlign: "center", mt: 4 }}>
                    <Typography>Dont have an account?</Typography>
                    <Button>
                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/register">Register</Link>
                    </Button>
                </Grid>
            </Grid>

        </Box>
    );
}
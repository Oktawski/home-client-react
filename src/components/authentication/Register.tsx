import { LoadingButton } from "@mui/lab";
import { Box, Button, FormControl, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { RegisterRequest } from "../../requests/authentication.requests";
import { authenticationService } from "../../services/authentication.service";

export function Register() {
    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const handleChange = (e: any) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setLoading(true);

        const request = new RegisterRequest(
            credentials.username,
            credentials.email,
            credentials.password,
            credentials.passwordConfirm);

        const response = await authenticationService.register(request);

        // show response message
        console.log(response);
        
        setLoading(false);

        if (response.isSuccess) {
            alert("Account created")
        }
    }
    
    if (authenticationService.isLoggedIn) {
        return (<Navigate to="/" />)
    }

    return (
        <Box sx={{ mt: 2, alignContent: "center"}}>
            <Typography variant="h3" sx={{ textAlign: "center", my: 4 }}>Register</Typography>

            <Grid sx={{
                marginTop: 4,
                paddingX: 2,
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                alignItems: 'center' }}
                container
            >
                <Grid xs={12} sm={8} md={6} item component="form" onSubmit={handleSubmit}>
                    <TextField 
                        required
                        margin="normal"
                        fullWidth
                        label="Username"
                        name="username"
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        margin="normal"
                        fullWidth
                        type="email"
                        label="Email"
                        name="email"
                        onChange={handleChange}
                    />
                    <TextField 
                        required
                        margin="normal"
                        fullWidth
                        type="password"
                        label="Password "
                        name="password"
                        onChange={handleChange}
                    />
                    <TextField 
                        required
                        margin="normal"
                        fullWidth
                        type="password"
                        label="Confirm Password"
                        name="passwordConfirm"
                        onChange={handleChange}
                    />
                    <LoadingButton
                        sx={{ width: '50%', mt: 4 }}
                        type="submit"
                        variant="contained"
                        loading={loading}
                    >
                        Create account
                    </LoadingButton>
                </Grid>
               
                <Box sx={{ textAlign: "center", mt: 4 }}>
                    <Typography>Already have an account?</Typography>
                    <Button>
                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/login">Login</Link>
                    </Button>
                </Box>
            </Grid>



        </Box>
    );
}
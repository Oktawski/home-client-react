import { Button, Box, FormControl, FormGroup, TextField, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from "react";
import { AuthenticationRequest } from "../../requests/authentication.requests";
import { AuthenticationResponse } from "../../responses/authentication.responses";
import { authenticationService } from "../../services/authentication.service";
import { Link } from "react-router-dom";

export function Login() {
    const initialCredentials = {
        username: "",
        password: ""
    };

    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState(initialCredentials);

    const handleChange = (e: any) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setLoading(true);

        let request = new AuthenticationRequest(credentials.username, credentials.password);
        let response = await authenticationService.authenticate(request);

        console.log(response);

        if (response) {
            setLoading(false);
            // redirect to home page
        } else {
            // show modal or smth
        }

        alert(response == true ? "Logged in" : "Error");

        setLoading(false);
    }

    // if user is logged in redirect to home page

    return (
        <Box sx={{ mt: 2, alignContent: "center"}}>
            <Typography variant="h3" sx={{ textAlign: "center", my: 2 }}>Login</Typography>

        <Box sx={{
            marginTop: 8,
            marginX: 2,
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            alignItems: 'center' }}
        >
            <Box component="form" onSubmit={handleSubmit}>
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
                    sx={{ width: '50%', mt: 2 }}
                    type="submit"
                    variant="contained"
                    loading={loading}
                >
                    Sign In
                </LoadingButton>


            </Box>
        </Box>


            <Box sx={{ textAlign: "center", mt: 6 }}>
                <Typography>Dont have an account?</Typography>
                <Button>
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/register">Register</Link>
                </Button>
            </Box>
        </Box>
    );
}
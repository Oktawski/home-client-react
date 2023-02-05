import { Box, Button, Grid } from "@mui/material"
import { Link } from "react-router-dom"
import { authenticationService } from "../../services/authentication.service"
import { UserControl } from "./UserControl"

interface LoginControlProps {
    isLoggedIn: boolean
};

export function LoginControl(props: LoginControlProps) {
    if (props.isLoggedIn) 
        return (
            <UserControl /> 
        )

    return (
        <Grid container justifyContent="flex-end" marginLeft={2}>
            <Button>
                <Link style={{ textDecoration: 'none', color: 'white' }} to="/login">Login</Link>
            </Button>
            <Button>
                <Link style={{ textDecoration: 'none', color: 'white' }} to="/register">Register</Link>
            </Button>
        </Grid>
    )
}

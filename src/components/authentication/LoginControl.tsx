import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import { authenticationService } from "../../services/authentication.service"

interface LoginControlProps {
    isLoggedIn: boolean
};

export function LoginControl(props: LoginControlProps) {
    if (props.isLoggedIn) 
        return (
            <Button style={{ color: 'white' }} onClick={authenticationService.logout}>
                Logout
            </Button>
        )

    return (
        <>
            <Button>
                <Link style={{ textDecoration: 'none', color: 'white' }} to="/login">Login</Link>
            </Button>
            <Button>
                <Link style={{ textDecoration: 'none', color: 'white' }} to="/register">Register</Link>
            </Button>
        </>
    )
}

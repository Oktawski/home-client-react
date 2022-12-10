import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { LoginControl } from "./authentication/LoginControl";

interface TopBarProps {
    isLoggedIn: boolean
}


export function TopBar(props: TopBarProps) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        Menu Icon
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link style={{ textDecoration: 'none', color: 'white'}} to="/">Home</Link>
                    </Typography>
                    <LoginControl isLoggedIn={props.isLoggedIn} />
                </Toolbar>
            </AppBar>
        </Box>
    );
}
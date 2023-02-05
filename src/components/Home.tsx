import { Box, Button, Typography } from "@mui/material";
import { authenticationService } from "../services/authentication.service";

export function Home() {
    return (
        <Box sx={{
            marginTop: 8,
            textAlign: 'center'
        }}>
            <Typography>Welcome home</Typography>
            <Button 
                sx={{ marginTop: 4 }}
                variant="contained"
                onClick={() => { authenticationService.logout(); }}>
                Logout
            </Button>
        </Box>
    )
}
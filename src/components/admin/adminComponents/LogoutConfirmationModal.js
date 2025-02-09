import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { useAuth } from "contexts/AuthContext";

const modalCentralization = {
    
}

export const LogoutConfirmationModal = (setLogoutConfirmationModal) => {
    const { logout } = useAuth();
    return (
        <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh'
        }}>
            <Card>
                <Box>
                    <Typography level="title-md">
                        Tens a certeza que desejas sair da tua conta?
                    </Typography>
                    <Typography level="body-sm">
                        As alterações que fez serão salvas.
                    </Typography>
                    <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
                        <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                            <Button
                                size="sm"
                                variant="outlined"
                                color="neutral"
                                onClick={() => setLogoutConfirmationModal(false)}
                            >
                                Cancelar
                            </Button>
                            <Button
                                size="sm"
                                sx={{
                                backgroundColor: "red !important",
                                "&:hover": {
                                    backgroundColor: "#ba0000 !important",
                                    transition: "background-color 300ms !important",
                                },
                                }}
                                onClick={logout}
                            >
                                Apagar
                            </Button>
                        </CardActions>
                    </CardOverflow>
                </Box>
            </Card>
        </div>
    )
};
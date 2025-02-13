import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { useAuth } from "contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const modalCentralization = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh'
};

export const LogoutConfirmationModal = ({ setLogoutConfirmationModal }) => {
    const { logout } = useAuth();
    const NAVIGATE = useNavigate();
    return (
        <Box sx={modalCentralization}>
            <Card 
                sx={{
                    minHeight: "auto",
                    maxWidth: "30rem",
                }}
            >
                <Box>
                    <Typography level="title-md">
                        Tens a certeza que desejas sair da tua conta?
                    </Typography>
                    <Typography level="body-sm">
                        Assim que desejares voltar, terás de fazer login novamente.
                    </Typography>
                </Box>
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
                                backgroundColor: "#ff5a00 !important",
                                "&:hover": {
                                    backgroundColor: "#e64d00 !important",
                                    transition: "background-color 300ms !important",
                                },
                            }}
                            onClick={() => {
                                logout();
                                NAVIGATE('/');
                            }}
                        >
                            Sair
                        </Button>
                    </CardActions>
                </CardOverflow>
            </Card>
        </Box>
    )
};
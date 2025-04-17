import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import Stack from "@mui/joy/Stack";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";


export const LifeguardEditionModal = ({ lifeguardId, setModalOpen }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <Stack
            spacing={4}
            sx={{
            display: "flex",
            maxWidth: "800px",
            mx: "auto",
            px: { xs: 2, md: 6 },
            py: { xs: 2, md: 3 },
            }}
        >
            <Card sx={{
                overflowY: "auto",
                maxHeight: "70vh",
                minWidth: "80vh",
            }}>
                <Box sx={{ mb: 1 }}>
                    <Typography level="title-md">Informação relativa ao Salva-vidas</Typography>
                    <Typography level="body-sm">
                        Preencha os campos abaixo para editar a informação do salva-vidas.
                    </Typography>
                </Box>
                <Divider />
                <Stack
                    direction="row"
                    spacing={3}
                    sx={{ display: { md: "flex" }, my: 1 }}
                >

                </Stack>
                <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
                    <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                        <Button
                            size="sm"
                            variant="outlined"
                            color="neutral"
                            onClick={() => setModalOpen(false)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            size="sm"
                            sx={{
                            backgroundColor: "#ff5a00 !important",
                            "&:hover": {
                                backgroundColor: "#cc4100 !important",
                                transition: "background-color 300ms !important",
                            },
                            }}
                            onClick={() => setModalOpen(false)}
                        >
                            Salvar
                        </Button>
                    </CardActions>
                </CardOverflow>
            </Card>
        </Stack>
    </Box>
  )
};

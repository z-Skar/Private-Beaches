import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";

const modalCentralization = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh'
};

export const ExcelMessageModal = ({ setExcelMessageModal }) => {
    return (
        <Box sx={modalCentralization}>
            <Card 
                sx={{
                    minHeight: "auto",
                    width: "auto",
                }}
            >
                <Box>
                    <Typography level="title-md">
                        Não foi possível exportar os dados para Excel.
                    </Typography>
                    <Typography level="body-sm">
                        Para exportar dados para Excel, garante a existência de dados na sua tabela.
                    </Typography>
                </Box>
                <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
                    <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                        <Button
                            size="sm"
                            variant="outlined"
                            color="neutral"
                            onClick={() => setExcelMessageModal(false)}
                        >
                            Fechar
                        </Button>
                    </CardActions>
                </CardOverflow>
            </Card>
        </Box>
    )
};
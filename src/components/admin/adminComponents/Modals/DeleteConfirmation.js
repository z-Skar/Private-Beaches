import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

export const DeleteConfirmation = ({ entity, setSelectedIDsToDelete, selectedIDsToDelete, setDeletetionModalOpen, handleDelete }) => {
  return (
    <Box
      sx={{
          display: "flex",
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
      }}
    >
      <Stack
        spacing={4}
        sx={{
          maxWidth: "800px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Card
          sx={{
            minHeight: "auto",
            maxWidth: "30rem",
          }}
        >
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Tens a certeza que desejas apagar este(s) registo(s)?</Typography>
            <Typography level="body-sm">
              Esta ação é <span style={{ color: 'red'}}>irreversível</span> e deverá ser tomada com cuidado.
            </Typography>
          </Box>
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              <Button
                size="sm"
                variant="outlined"
                color="neutral"
                onClick={() => {
                  setDeletetionModalOpen(false);
                  setSelectedIDsToDelete(selectedIDsToDelete.filter((id) => id !== entity.id));
                  console.log(selectedIDsToDelete);
                }}
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
                onClick={handleDelete}
              >
                Apagar
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
  );
};

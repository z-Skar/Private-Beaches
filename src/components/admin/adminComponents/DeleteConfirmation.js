import { useEffect, useState } from "react";
import axios from "axios";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Autocomplete from "@mui/joy/Autocomplete";
import Input from "@mui/joy/Input";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import { useNavigate } from "react-router-dom";
import { checkOnlyNumbers, validateBeachFormFields } from "validation/validationFunctions";
import DropZone from "./DropZone";

export const DeleteConfirmation = ({ entity, setSelectedIDsToDelete, selectedIDsToDelete, setDeletetionModalOpen, handleDelete }) => {
  const [data, setData] = useState({});
  const [lifeguardOptions, setLifeguardOptions] = useState([]);
  const [lifeguardAutocomplete, setLifeguardAutocomplete] = useState(false);
  const [errors, setErrors] = useState({});

  const slotProps = {
    listbox: {
      sx: {
        position: "fixed",
        zIndex: 1300,
      },
    },
    input: {
      autoComplete: "new-password", // disable autocomplete and autofill
    },
  };

  const navigate = useNavigate();

  return (
    <Box sx={{ flex: 1, width: "100%" }}>
      <Box
        sx={{
          position: "sticky",
          top: { sm: -100, md: -110 },
          bgcolor: "background.body",
        }}
      ></Box>
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
        <Card
          sx={{
            overflowY: "auto",
            maxHeight: "70vh",
            width: "80vh",
          }}
        >
            <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Informação relativa à Praia</Typography>
            <Typography level="body-sm">
              Costumiza a forma que a informação será apresentada.
            </Typography>
            </Box>
            <Divider />
            <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
            >
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1} direction={{ xs: "column", md: "row" }}>
              <FormControl
                sx={{
                display: { sm: "flex-column", md: "flex-row" },
                flexGrow: 1,
                }}
              >
                <FormLabel>Nome da Praia</FormLabel>
                <Input
                  size="sm"
                  placeholder="Praia da Fonte da Telha"
                  value={data.BEACH_NAME || ""}
                  error={errors.BEACH_NAME ? true : false}
                  onChange={(e) => {
                    setErrors({ ...errors, BEACH_NAME: '' })
                    setData({ ...data, BEACH_NAME: e.target.value })
                  }}
                />
                {errors.BEACH_NAME && (<Typography level="body-xs" color="danger" sx={{ pl: '0.1rem', pt: 0.5, fontWeight: 'lighter' }}>{errors.BEACH_NAME}</Typography>)}
              </FormControl>
              </Stack>
              <Stack>
                <FormControl>
                  <FormLabel>Descrição da Praia</FormLabel>
                  <Textarea
                    size="sm"
                    placeholder="Praia com areia fina e água cristalina"
                    value={data.DESCRIPTION || ""}
                    error={errors.DESCRIPTION ? true : false}
                    onChange={(e) => {
                      setErrors({ ...errors, DESCRIPTION: '' })
                      const newValue = e.target.value;
                      if (newValue.length <= 300) {
                        setData({ ...data, DESCRIPTION: newValue });
                      }
                    }}
                  />
                  {errors.DESCRIPTION && (<Typography level="body-xs" color="danger" sx={{ pl: '0.1rem', pt: 0.5, fontWeight: 'lighter' }}>{errors.DESCRIPTION}</Typography>)}
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={2}>
                <FormControl sx={{ flex: 1 }}>
                  <FormLabel>Custo da reserva</FormLabel>
                  <Input
                    size="sm"
                    placeholder="200"
                    endDecorator="€"
                    value={data.RESERVATION_COST || ""}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if ( newValue.length <= 5 && checkOnlyNumbers(newValue)) {
                        setErrors({ ...errors, RESERVATION_COST: '' })
                        setData({ ...data, RESERVATION_COST: newValue });
                      }
                    }}
                    error={errors.RESERVATION_COST ? true : false}
                  />
                  {errors.RESERVATION_COST && (<Typography level="body-xs" color="danger" sx={{ pl: '0.1rem', pt: 0.5, fontWeight: 'lighter' }}>{errors.RESERVATION_COST}</Typography>)}
                </FormControl>
                <FormControl sx={{ flex: 2 }}>
                  <FormLabel>Salva-vidas</FormLabel>
                  <Autocomplete
                    size="sm"
                    autoHighlight
                    isOptionEqualToValue={(option, value) =>
                      option.value === value.value
                    }
                    options={lifeguardOptions}
                    value={
                      lifeguardOptions.find(
                        (lifeguard) => lifeguard.value === data.LIFEGUARD_ID
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      setErrors({ ...errors, LIFEGUARD_ID: '' })
                      setData({
                        ...data,
                        LIFEGUARD_ID: newValue ? newValue.value : null,
                      })}
                    }
                    open={lifeguardAutocomplete}
                    onOpen={() => setLifeguardAutocomplete(true)}
                    onClose={() => setLifeguardAutocomplete(false)}
                    placeholder={"António Manuel"}
                    noOptionsText={"Sem opções"}
                    slotProps={slotProps}
                    error={errors.LIFEGUARD_ID ? true : false}
                  />
                  {errors.LIFEGUARD_ID && (<Typography level="body-xs" color="danger" sx={{ pl: '0.1rem', pt: 0.5,  fontWeight: 'lighter' }}>{errors.LIFEGUARD_ID}</Typography>)}
                </FormControl>
              </Stack>
            </Stack>
          </Stack>
          <Divider />
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              <Button
                size="sm"
                variant="outlined"
                color="neutral"
                onClick={() => {
                  setDeletetionModalOpen(false);
                  setSelectedIDsToDelete(selectedIDsToDelete.filter((id) => id !== entity.id));
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

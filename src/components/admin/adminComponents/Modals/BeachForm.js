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
import DropZone from "../DropZone";

export const BeachForm = ({ entity, id, setEditionModalOpen }) => {
  const [data, setData] = useState({});
  const [imagePreview, setImagePreview] = useState(data.PICTURE);
  const [lifeguardOptions, setLifeguardOptions] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [lifeguardAutocomplete, setLifeguardAutocomplete] = useState(false);
  const [serviceTypeAutocomplete, setServiceTypeAutocomplete] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const getBeachData = async () => {
      try {
        const BEACH_DATA_RESPONSE = (
          await axios.get(`http://localhost:5000/${entity}/read/${id}`)
        ).data[0];
        setData({
          ...BEACH_DATA_RESPONSE,
          SERVICE_TYPE: serviceTypeOptions.find(
            (option) => option.value === BEACH_DATA_RESPONSE.SERVICE_TYPE
          ),
        });
      } catch (error) {
        console.log(error);
      }
    };

    const getLifeguardData = async () => {
      try {
        const LIFEGUARDS_DATA_RESPONSE = (
          await axios.get(`http://localhost:5000/lifeguards/?onlyNecessary=true`)
        ).data;
        const LIFEGUARDS_OPTIONS = LIFEGUARDS_DATA_RESPONSE.map((lifeguard) => ({
          label: lifeguard.FULL_NAME,
          value: lifeguard.LIFEGUARD_ID,
        }));
        setLifeguardOptions(LIFEGUARDS_OPTIONS);
      } catch (error) {
        console.log(error);
      }
    };

    id && getBeachData();
    getLifeguardData();

    const ModalCard = document.querySelector(".MuiCard-root");
    if (ModalCard) {
      ModalCard.addEventListener("scroll", () => {
        setServiceTypeAutocomplete(false);
        setLifeguardAutocomplete(false);
      });
    };

    return () => {
      if (ModalCard) {
        ModalCard.removeEventListener("scroll", () => {
          setServiceTypeAutocomplete(false);
          setLifeguardAutocomplete(false);
        });
      }
    };
  }, [id, entity]);

  const serviceTypeOptions = [
    { label: "Económico", value: "Económico" },
    { label: "Premium", value: "Premium" },
  ];

  const handleFileChange = (event) => {
    setErrors({ ...errors, PICTURE: '' })
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const DATA_TO_VALIDATE = { ...data, SERVICE_TYPE: data.SERVICE_TYPE?.value, PICTURE: selectedFile ||  data.PICTURE }
    const ERRORS = validateBeachFormFields(DATA_TO_VALIDATE);
    setErrors(ERRORS);

    const HAS_ERRORS = Object.values(ERRORS).some((error) => error !== "");
    if (HAS_ERRORS) return;

    const formData = new FormData();

    formData.append("BEACH_NAME", data.BEACH_NAME);
    formData.append("COUNTRY_LOCATION", data.COUNTRY_LOCATION);
    formData.append("CITY_LOCATION", data.CITY_LOCATION);
    formData.append("DESCRIPTION", data.DESCRIPTION);
    formData.append("SERVICE_TYPE", data.SERVICE_TYPE?.value);
    formData.append("RESERVATION_COST", data.RESERVATION_COST);
    formData.append("LIFEGUARD_ID", data.LIFEGUARD_ID);
    if (selectedFile) {
      formData.append("PICTURE", selectedFile);
    };
    
    try {
      if (id) {
        await fetch(`http://localhost:5000/beaches/edit/${data.BEACH_ID}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        await fetch(`http://localhost:5000/beaches/add`, {
          method: "POST",
          body: formData,
        });
      };
      navigate(0);
      window.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
    }
  };

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
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          maxWidth: { xs: "90%", md: "800px" },
          mx: "auto",
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Card
          sx={{
            overflowY: "auto",
            maxHeight: { xs: "80vh", md: "70vh" },
            minWidth: { xs: "100%", md: "80vh" },
          }}
          onScroll={() => {
            setServiceTypeAutocomplete(false);
            setLifeguardAutocomplete(false);
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
              direction={{ xs: "column", md: "row" }}
              spacing={3}
              sx={{ my: 1 }}
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
              <FormControl>
                <FormLabel>Tipo de Serviço</FormLabel>
                <Autocomplete
                  size="sm"
                  autoHighlight
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
                  value={data.SERVICE_TYPE || null}
                  onChange={(event, newValue) => {
                    setErrors({ ...errors, SERVICE_TYPE: '' })
                    setData({ ...data, SERVICE_TYPE: newValue })}
                  }
                  options={serviceTypeOptions}
                  placeholder={"Económico"}
                  noOptionsText={"Sem opções"}
                  open={serviceTypeAutocomplete}
                  onOpen={() => setServiceTypeAutocomplete(true)}
                  onClose={() => setServiceTypeAutocomplete(false)}
                  slotProps={slotProps}
                  error={errors.SERVICE_TYPE ? true : false}
                />
                {errors.SERVICE_TYPE && (<Typography level="body-xs" color="danger" sx={{ pl: '0.1rem', pt: 0.5, fontWeight: 'lighter' }}>{errors.SERVICE_TYPE}</Typography>)}
              </FormControl>
              </Stack>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel>País</FormLabel>
                <Input
                  size="sm"
                  placeholder="Portugal"
                  value={data.COUNTRY_LOCATION || ""}
                  error={errors.COUNTRY_LOCATION ? true : false}
                  onChange={(e) => {
                    setErrors({ ...errors, COUNTRY_LOCATION: '' })
                    setData({ ...data, COUNTRY_LOCATION: e.target.value })}
                  }
                />
                {errors.COUNTRY_LOCATION && (<Typography level="body-xs" color="danger" sx={{ pl: '0.1rem', pt: 0.5, fontWeight: 'lighter' }}>{errors.COUNTRY_LOCATION}</Typography>)}
              </FormControl>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel>Cidade</FormLabel>
                <Input
                  size="sm"
                  type="text"
                  placeholder="Lisboa"
                  value={data.CITY_LOCATION || ""}
                  error={errors.CITY_LOCATION ? true : false}
                  onChange={(e) => {
                    setErrors({ ...errors, CITY_LOCATION: '' })
                    setData({ ...data, CITY_LOCATION: e.target.value })
                  }}
                />
                {errors.CITY_LOCATION && (<Typography level="body-xs" color="danger" sx={{ pl: '0.1rem', pt: 0.5, fontWeight: 'lighter' }}>{errors.CITY_LOCATION}</Typography>)}
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
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
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
                <FormControl sx={{ flex: 2 }}> {/* Ajuste para evitar overflow */}
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
                    slotProps={{
                      ...slotProps,
                      listbox: {
                        sx: {
                          ...slotProps.listbox.sx,
                          maxHeight: "200px", // Limitar altura para evitar overflow
                          overflowY: "auto",
                        },
                      },
                    }}
                    error={errors.LIFEGUARD_ID ? true : false}
                  />
                  {errors.LIFEGUARD_ID && (<Typography level="body-xs" color="danger" sx={{ pl: '0.1rem', pt: 0.5, fontWeight: 'lighter' }}>{errors.LIFEGUARD_ID}</Typography>)}
                </FormControl>
              </Stack>
            </Stack>
          </Stack>
          <Box sx={{ mb: 1, mt: 2 }}>
            <Typography level="title-md">Imagem da Praia</Typography>
          </Box>
          <Divider />
          <Stack spacing={2} sx={{ my: 1 }}>
            <DropZone
              imgSrc={data.PICTURE}
              onChange={handleFileChange}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
            />
            {errors.PICTURE && (<Typography level="body-xs" color="danger" sx={{ pl: '0.1rem', fontWeight: 'lighter' }}>{errors.PICTURE}</Typography>)}
          </Stack>
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              <Button
                size="sm"
                variant="outlined"
                color="neutral"
                onClick={() => setEditionModalOpen(false)}
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
                onClick={handleSubmit}
              >
                {id ? "Salvar" : "Criar"}
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
  );
};

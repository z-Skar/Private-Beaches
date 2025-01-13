import { useEffect, useState } from "react"
import axios from "axios";
import AspectRatio from "@mui/joy/AspectRatio"
import Box from "@mui/joy/Box"
import Button from "@mui/joy/Button"
import Divider from "@mui/joy/Divider"
import FormControl from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import FormHelperText from "@mui/joy/FormHelperText"
import Input from "@mui/joy/Input"
import IconButton from "@mui/joy/IconButton"
import Textarea from "@mui/joy/Textarea"
import Stack from "@mui/joy/Stack"
import Select from "@mui/joy/Select"
import Option from "@mui/joy/Option"
import Typography from "@mui/joy/Typography"
import Tabs from "@mui/joy/Tabs"
import TabList from "@mui/joy/TabList"
import Tab, { tabClasses } from "@mui/joy/Tab"
import Breadcrumbs from "@mui/joy/Breadcrumbs"
import Link from "@mui/joy/Link"
import Card from "@mui/joy/Card"
import CardActions from "@mui/joy/CardActions"
import CardOverflow from "@mui/joy/CardOverflow"

import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded"
import EmailRoundedIcon from "@mui/icons-material/EmailRounded"
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded"
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded"
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded"
import EditRoundedIcon from "@mui/icons-material/EditRounded"

import DropZone from "./DropZone"
import FileUpload from "./FileUpload"
import Selector from "./Selector";
import EditorToolbar from "./EditorToolbar"

import { useParams, useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import { checkOnlyNumbers } from "validation/validationFunctions";
import { Autocomplete, List, ListItem } from "@mui/joy";
import zIndex from "@mui/material/styles/zIndex";


export const BeachForm = ({ entity, id, setEditionModalOpen }) => {
  const [data, setData] = useState({});
  const [imagePreview, setImagePreview] = useState(data.PICTURE);
  const [lifeguardOptions, setLifeguardOptions] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  // Controlam a abertura das opções de cada input com uma dropdown box.
  const [lifeguardAutocomplete, setLifeguardAutocomplete] = useState(false);
  const [serviceTypeAutocomplete, setServiceTypeAutocomplete] = useState(false)

  useEffect(() => {
    const getUserData = async () => {
      try {
        const RESPONSE = (await axios.get(`http://localhost:5000/${entity}/read/${id}`)).data[0];
        setData({
          ...RESPONSE,
          SERVICE_TYPE: serviceTypeOptions.find(option => option.value === RESPONSE.SERVICE_TYPE)
        });
      } catch (error) {
        console.log(error);
      };
    };

    const getLifeguardData = async () => {
      try {
        const LIFEGUARDS_DATA_RESPONSE = (await axios.get(`http://localhost:5000/lifeguards/?onlyNecessary=true`)).data;
        const LIFEGUARDS_OPTIONS = LIFEGUARDS_DATA_RESPONSE.map(lifeguard => ({ label: lifeguard.FULL_NAME, value: lifeguard.LIFEGUARD_ID }));
        setLifeguardOptions(LIFEGUARDS_OPTIONS);
      } catch (error) {
        console.log(error);
      };
    };

    id && getUserData();
    getLifeguardData();

    const ModalCard = document.querySelector('.MuiCard-root')
    if (ModalCard) {
      ModalCard.addEventListener('scroll', setServiceTypeAutocomplete(false), setLifeguardAutocomplete(false));
    };

    return () => {
      if (ModalCard) {
        ModalCard.addEventListener('scroll', setServiceTypeAutocomplete(false), setLifeguardAutocomplete(false));
      };
    };
  }, [id, entity]);

  const serviceTypeOptions = [
    { label: "Económico", value: "Económico" },
    { label: "Premium", value: "Premium" },
  ];

  const handleFileChange = (event) => {
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
    const formData = new FormData();

    formData.append('BEACH_NAME', data.BEACH_NAME);
    formData.append('COUNTRY_LOCATION', data.COUNTRY_LOCATION);
    formData.append('CITY_LOCATION', data.CITY_LOCATION);
    formData.append('DESCRIPTION', data.DESCRIPTION);
    formData.append('SERVICE_TYPE', data.SERVICE_TYPE.value);
    formData.append('RESERVATION_COST', data.RESERVATION_COST);
    formData.append('LIFEGUARD_ID', data.LIFEGUARD_ID);
    if (selectedFile) {
      formData.append('beachImage', selectedFile);
    };

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    try {
      if (id) {
        const RESPONSE = await fetch(`http://localhost:5000/beaches/edit/${data.BEACH_ID}`, {
          method: 'PUT',
          body: formData
        });
      } else {
        const RESPONSE = await fetch(`http://localhost:5000/beaches/add`, {
          method: 'POST',
          body: formData
        });
      };
    } catch (error) {
      console.log(error);
    };
  };

  const slotProps = {
    listbox: {
      sx: {
        position: 'fixed',
        zIndex: 1300,
      },
    },
    input: {
      autoComplete: "new-password" // disable autocomplete and autofill
    },
  };

  const NAVIGATE = useNavigate();

  return (
    <Box sx={{ flex: 1, width: "100%" }}>
      <Box
        sx={{
          position: "sticky",
          top: { sm: -100, md: -110 },
          bgcolor: "background.body",
        }}
      >

      </Box>
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          maxWidth: "800px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 }
        }}
      >
        <Card 
          sx={{
              overflowY: "auto",
              maxHeight: "70vh",
              width: '80vh',
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
                  <Input size="sm" placeholder="Praia da Fonte da Telha"
                    value={data.BEACH_NAME || ''}
                    onChange={(e) => setData({...data, BEACH_NAME: e.target.value})}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Tipo de Serviço</FormLabel>
                  <Autocomplete
                    size="sm"
                    autoHighlight
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    value={data.SERVICE_TYPE || null}
                    onChange={(event, newValue) => setData({ ...data, SERVICE_TYPE: newValue})}
                    options={serviceTypeOptions}
                    placeholder={'Económico'}
                    noOptionsText={'Sem opções'}
                    open={serviceTypeAutocomplete}
                    onOpen={() => setServiceTypeAutocomplete(true)}
                    onClose={() => setServiceTypeAutocomplete(false)}
                    slotProps={slotProps}
                  />
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={2}>
                <FormControl sx={{ flex: 1 }}>
                  <FormLabel>País</FormLabel>
                  <Input size="sm" placeholder="Portugal"
                    value={data.COUNTRY_LOCATION || ''}
                    onChange={(e) => setData({ ...data, COUNTRY_LOCATION: e.target.value})}
                  />
                </FormControl>
                <FormControl sx={{ flex: 1 }}> 
                  <FormLabel>Cidade</FormLabel>
                  <Input
                    size="sm"
                    type="text"
                    placeholder="Lisboa"
                    value={data.CITY_LOCATION || ''}
                    onChange={e => setData({ ...data, CITY_LOCATION: e.target.value })}
                  />
                </FormControl>
              </Stack>
              <Stack>
                <FormControl>
                  <FormLabel>Descrição da Praia</FormLabel>
                  <Textarea
                    size="sm"
                    placeholder="Praia com areia fina e água cristalina"
                    value={data.DESCRIPTION || ''}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (newValue.length <= 300) {
                        setData({ ...data, DESCRIPTION: newValue });
                      }
                    }}
                  />
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={2}>
                <FormControl sx={{ flex: 1 }}>
                  <FormLabel>Custo da reserva</FormLabel>
                  <Input
                    size="sm"
                    placeholder="200"
                    endDecorator='€'
                    value={data.RESERVATION_COST || ''}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (newValue.length <= 5 && checkOnlyNumbers(newValue)) {
                        setData({ ...data, RESERVATION_COST: newValue });
                      }
                    }}
                  />
                </FormControl>
                <FormControl sx={{ flex: 2 }}>
                  <FormLabel>Salva-vidas</FormLabel>
                  <Autocomplete
                    size="sm"
                    autoHighlight
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    options={lifeguardOptions}
                    value={lifeguardOptions.find(lifeguard => lifeguard.value === data.LIFEGUARD_ID) || null }
                    onChange={(event, newValue) => setData({ ...data, LIFEGUARD_ID: newValue ? newValue.value : null })}
                    open={lifeguardAutocomplete}
                    onOpen={() => setLifeguardAutocomplete(true)}
                    onClose={() => setLifeguardAutocomplete(false)}
                    placeholder={'António Manuel'}
                    noOptionsText={'Sem opções'}
                    slotProps={slotProps}
                  />
                </FormControl>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            direction="column"
            spacing={2}
            sx={{ display: { xs: "flex", md: "none" }, my: 1 }}
          >
            <Stack direction="row" spacing={2}>
              <Stack spacing={1} sx={{ flexGrow: 1 }}>
                <FormLabel>Name</FormLabel>
                <FormControl
                  sx={{
                    display: {
                      sm: "flex-column",
                      md: "flex-row"
                    },
                    gap: 2
                  }}
                >
                  <Input size="sm" placeholder="First name" />
                </FormControl>
              </Stack>
            </Stack>
            <FormControl>
              <FormLabel>Role</FormLabel>
              <Input size="sm" defaultValue="UI Developer" />
            </FormControl>
          </Stack>
          <Box sx={{ mb: 1, mt: 2}}>
            <Typography level="title-md">Imagem da Praia</Typography>
          </Box>
          <Divider />
          <Stack spacing={2} sx={{ my: 1 }}>
            <DropZone imgSrc={data.PICTURE} onChange={handleFileChange} imagePreview={imagePreview} setImagePreview={setImagePreview} />
          </Stack>
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              <Button size="sm" variant="outlined" color="neutral" onClick={() => setEditionModalOpen(false)}>
                Cancelar
              </Button>
              <Button size="sm"
                sx={{ backgroundColor: '#ff5a00 !important',
                      '&:hover': {
                        backgroundColor: '#cc4100 !important',
                        transition: 'background-color 300ms !important'
                      }
                }}
                onClick={() => {
                  handleSubmit();
                  NAVIGATE(0);
                  window.scrollTo(0, 0);
                }}
              >
                {id ? 'Salvar' : 'Criar'}
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
  )
}

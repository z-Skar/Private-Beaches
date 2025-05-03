import { useState, useEffect } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import Stack from "@mui/joy/Stack";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import { Autocomplete, FormControl, FormLabel, Input } from "@mui/joy";
import { validateAdminLifeguardFields } from "validation/validationFunctions";
import { useNavigate } from "react-router-dom";
import DropZone from "../DropZone";

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

export const LifeguardEditionModal = ({ lifeguardData, handleEditionForLifeguard }) => {
    const [updatedLifeguardData, setUpdatedLifeguardData] = useState({ ...lifeguardData, Salário: lifeguardData.Salário.replace("€", "").slice(0, -3) });
    const [errors, setErrors] = useState({});
    const [profilePicture, setProfilePicture] = useState(lifeguardData.Perfil ? `http://localhost:5000${lifeguardData.Perfil}` : null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [usingDefaultImage, setUsingDefaultImage] = useState(false);
    const navigate = useNavigate();

    const statusOptions = [
        { label: "Ativo", value: "Ativo" },
        { label: "Em Espera", value: "Em Espera" },
        { label: "Férias", value: "Férias" },
    ];

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        const DATA = updatedLifeguardData;
        const ERRORS = validateAdminLifeguardFields(DATA);

        setErrors(ERRORS);

        const HAS_ERRORS = Object.values(ERRORS).some((error) => error !== "");
        if (HAS_ERRORS) return;
    
        const formData = new FormData();
        formData.append("Nome", DATA.Nome);
        formData.append("Salary", DATA.Salário);
        formData.append("Estado", DATA.Estado);

        if (usingDefaultImage) {
            formData.append("Perfil", null);
        } else if (selectedFile) {
            formData.append("Perfil", selectedFile);
        }

        try {
            await fetch(`http://localhost:5000/lifeguards/edit/${DATA['Salva-Vidas-ID']}`, {
                method: "PUT",
                body: formData,
            });
        } catch (error) {
            console.error(error);
        };
        navigate(0);
        window.scroll(0, 0);
    };

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
                    maxHeight: { xs: "80vh", md: "70vh" },
                    minWidth: { xs: "100%", md: "80vh" },
                }}>
                    <Box sx={{ mb: 1 }}>
                        <Typography level="title-md">Informação relativa ao Salva-vidas</Typography>
                        <Typography level="body-sm">
                            Preencha os campos abaixo para editar a informação do salva-vidas.
                        </Typography>
                    </Box>
                    <Divider />
                    <Typography level="title-md">Foto de Perfil do Salva-vidas</Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", my: 2 }}>
                        <DropZone
                            imgSrc={lifeguardData.Perfil ? `http://localhost:5000${lifeguardData.Perfil}` : null}
                            onChange={handleFileChange}
                            imagePreview={profilePicture}
                            setImagePreview={setProfilePicture}
                            isCircular={true}
                            setUsingDefaultImage={setUsingDefaultImage}
                        />
                        {errors.Perfil && (<Typography level="body-xs" color="danger" sx={{ pl: '0.1rem', fontWeight: 'lighter' }}>{errors.Perfil}</Typography>)}
                    </Box>
                    <Divider />
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={{ xs: 2, md: 3 }}
                        sx={{ my: 1 }}
                    >
                        <FormControl sx={{ flex: 1, minWidth: "200px" }}>
                            <FormLabel>Nome do Salva-vidas</FormLabel>
                            <Input 
                                size="sm"
                                placeholder="André Silva"
                                value={updatedLifeguardData.Nome || ""}
                                onChange={(e) => {
                                    setUpdatedLifeguardData((prevData) => ({
                                        ...prevData,
                                        Nome: e.target.value,
                                    }));
                                    setErrors((prevErrors) => ({
                                        ...prevErrors,
                                        Nome: '',
                                    }));
                                }}
                                error={errors.Nome ? true : false}
                            />
                            {errors.Nome && (<Typography level="body-xs" color="danger" sx={{ pl: '0.1rem', pt: 0.5, fontWeight: 'lighter' }}>{errors.Nome}</Typography>)}
                        </FormControl>
                        <FormControl sx={{ flex: 1, minWidth: "200px" }}>
                            <FormLabel>Email</FormLabel>
                            <Input
                                size="sm"
                                type="email"
                                placeholder="exemplo@gmail.com"
                                value={lifeguardData.Email}
                                disabled
                            />
                        </FormControl>
                    </Stack>
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={{ xs: 2, md: 3 }}
                        sx={{ my: 1 }}
                    >
                        <FormControl sx={{ flex: 1, minWidth: "200px" }}>
                            <FormLabel>NIF</FormLabel>
                            <Input 
                                size="sm"
                                placeholder="987654321"
                                value={lifeguardData.NIF}
                                disabled
                            />
                        </FormControl>
                        <FormControl sx={{ flex: 1, minWidth: "200px" }}>
                            <FormLabel>Data de Nascimento</FormLabel>
                            <Input 
                                size="sm"
                                type="date"
                                value={lifeguardData['Data de Nascimento']}
                                disabled
                            />
                        </FormControl>
                        <FormControl sx={{ flex: 1, minWidth: "200px" }}>
                            <FormLabel>Contacto</FormLabel>
                            <Input 
                                size="sm"
                                placeholder="912345678"
                                value={lifeguardData.Contacto}
                                disabled
                            />
                        </FormControl>
                    </Stack>
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={{ xs: 2, md: 3 }}
                        sx={{ my: 1 }}
                    >
                        <FormControl sx={{ flex: 1, minWidth: "200px" }}>
                            <FormLabel>Salário</FormLabel>
                            <Input
                                size="sm"
                                placeholder="1400"
                                value={updatedLifeguardData['Salário'] || ""}
                                onChange={(e) => {
                                    setUpdatedLifeguardData((prevData) => ({
                                        ...prevData,
                                        'Salário': e.target.value,
                                    }));
                                    setErrors((prevErrors) => ({
                                        ...prevErrors,
                                        'Salário': '',
                                    }));
                                }
                                }
                                endDecorator="€"
                                error={errors['Salário'] ? true : false}
                            />
                            {errors['Salário'] && (<Typography level="body-xs" color="danger" sx={{ pl: '0.1rem', pt: 0.5, fontWeight: 'lighter' }}>{errors['Salário']}</Typography>)}
                        </FormControl>
                        <FormControl sx={{ flex: 1, minWidth: "200px" }}>
                            <FormLabel>Estado</FormLabel>
                            <Autocomplete
                                size="sm"
                                autoHighlight
                                placeholder="Selecione o estado do Salva-vidas"
                                options={statusOptions}
                                slotProps={slotProps}
                                value={
                                    statusOptions.find((option) => option.value === updatedLifeguardData.Estado) || null
                                }
                                onChange={(event, newValue) => {
                                    setErrors((prevErrors) => ({
                                        ...prevErrors,
                                        Estado: '',
                                    }));
                                    setUpdatedLifeguardData((prevData) => ({
                                        ...prevData,
                                        Estado: newValue ? newValue.value : '',
                                    }));
                                }}
                                isOptionEqualToValue={(option, value) => option.value === value?.value}
                                getOptionLabel={(option) => option.label}
                                error={errors.Estado ? true : false }
                            />
                            {errors.Estado && (<Typography level="body-xs" color="danger" sx={{ pl: '0.1rem', pt: 0.5, fontWeight: 'lighter' }}>{errors.Estado}</Typography>)}
                        </FormControl>
                    </Stack>
                    <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
                        <CardActions sx={{ alignSelf: "flex-end", pt: 2, flexWrap: { xs: "wrap", md: "nowrap" } }}>
                            <Button
                                size="sm"
                                variant="outlined"
                                color="neutral"
                                onClick={() => handleEditionForLifeguard()}
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
                                Salvar
                            </Button>
                        </CardActions>
                    </CardOverflow>
                </Card>
            </Stack>
        </Box>
    )
};

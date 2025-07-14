import { useState } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import Stack from "@mui/joy/Stack";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import Autocomplete  from "@mui/joy/Autocomplete";
import { FormControl, FormLabel, Input } from "@mui/joy";
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

export const ClientEditionModal = ({ clientData, handleEditionForClient }) => {
    const [updatedClientData, setUpdatedClientData] = useState({ ...clientData });
    const [errors, setErrors] = useState({});
    const [profilePicture, setProfilePicture] = useState(clientData.Perfil ? `http://localhost:5000${clientData.Perfil}` : null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [usingDefaultImage, setUsingDefaultImage] = useState(false);
    const PERMISSIONS = [
        { label: "Cliente", value: "Cliente" },
        { label: "Administrador", value: "Administrador" },
    ];
    const navigate = useNavigate();

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
        const DATA = updatedClientData;
        console.log(DATA)
        // Validate required fields
        const ERRORS = {};
        if (!DATA.Nome || DATA.Nome.trim() === "") {
            ERRORS.Nome = "O nome é obrigatório.";
        };

        if (!DATA['Permissão'] || DATA['Permissão'].trim() === '') {
            ERRORS['Permissão'] = 'A permissão é obrigatória.';
        };
        setErrors(ERRORS);
        const HAS_ERRORS = Object.values(ERRORS).some((error) => error !== "");
        if (HAS_ERRORS) return;

        const formData = new FormData();
        formData.append("Nome", DATA.Nome);
        formData.append("Nascimento", DATA['Data de Nascimento']?.trim() || '');
        formData.append("Permission", DATA['Permissão'])

        if (usingDefaultImage) {
            formData.append("Perfil", null);
        } else if (selectedFile) {
            formData.append("Perfil", selectedFile);
        };

        try {
            await fetch(`http://localhost:5000/clients/edit/${DATA['Cliente-ID']}`, {
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
                <Card
                    sx={{
                        overflowY: "auto",
                        maxHeight: { xs: "80vh", md: "70vh" },
                        minWidth: { xs: "100%", md: "80vh" },
                    }}
                >
                    <Box sx={{ mb: 1 }}>
                        <Typography level="title-md">Informação relativa ao Cliente</Typography>
                        <Typography level="body-sm">
                            Preencha os campos abaixo para editar a informação do cliente.
                        </Typography>
                    </Box>
                    <Divider />
                    <Typography level="title-md">Foto de Perfil do Cliente</Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", my: 2 }}>
                        <DropZone
                            imgSrc={clientData.Perfil ? `http://localhost:5000${clientData.Perfil}` : null}
                            onChange={handleFileChange}
                            imagePreview={profilePicture}
                            setImagePreview={setProfilePicture}
                            isCircular={true}
                            setUsingDefaultImage={setUsingDefaultImage}
                        />
                        {errors.Perfil && (
                            <Typography level="body-xs" color="danger" sx={{ pl: "0.1rem", fontWeight: "lighter" }}>
                                {errors.Perfil}
                            </Typography>
                        )}
                    </Box>
                    <Divider />
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={{ xs: 2, md: 3 }}
                        sx={{ my: 1 }}
                    >
                        <FormControl sx={{ flex: 1, minWidth: "200px" }}>
                            <FormLabel>Nome do Cliente</FormLabel>
                            <Input
                                size="sm"
                                placeholder="João Silva"
                                value={updatedClientData.Nome || ""}
                                onChange={(e) => {
                                    setUpdatedClientData((prevData) => ({
                                        ...prevData,
                                        Nome: e.target.value,
                                    }));
                                    setErrors((prevErrors) => ({
                                        ...prevErrors,
                                        Nome: "",
                                    }));
                                }}
                                error={errors.Nome ? true : false}
                            />
                            {errors.Nome && (
                                <Typography level="body-xs" color="danger" sx={{ pl: "0.1rem", pt: 0.5, fontWeight: "lighter" }}>
                                    {errors.Nome}
                                </Typography>
                            )}
                        </FormControl>
                        <FormControl sx={{ flex: 1, minWidth: "200px" }}>
                            <FormLabel>Email</FormLabel>
                            <Input
                                size="sm"
                                type="email"
                                placeholder="exemplo@gmail.com"
                                value={clientData.Email || ""}
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
                            <FormLabel>Data de Nascimento</FormLabel>
                            <Input
                                size="sm"
                                type="date"
                                value={updatedClientData['Data de Nascimento'] || ""}
                                onChange={(e) => {
                                    setUpdatedClientData((prevData) => ({
                                        ...prevData,
                                        'Data de Nascimento': e.target.value,
                                    }));
                                    setErrors((prevErrors) => ({
                                        ...prevErrors,
                                        'Data de Nascimento': "",
                                    }));
                                }}
                                error={errors['Data de Nascimento'] ? true : false}
                            />
                            {errors['Data de Nascimento'] && (
                                <Typography level="body-xs" color="danger" sx={{ pl: "0.1rem", pt: 0.5, fontWeight: "lighter" }}>
                                    {errors['Data de Nascimento']}
                                </Typography>
                            )}
                        </FormControl>
                        <FormControl sx={{ flex: 1, minWidth: "200px" }}>
                            <FormLabel>Contacto</FormLabel>
                            <Input
                                size="sm"
                                placeholder="912345678"
                                value={clientData.Contacto || ""}
                                disabled
                            />
                        </FormControl>
                        <FormControl sx={{ flex: 1, minWidth: "200px" }}>
                            <FormLabel>Permissão</FormLabel>
                            <Autocomplete
                                size="sm"
                                placeholder="Seleciona a permissão do utilizador"
                                autoHighlight
                                options={PERMISSIONS}
                                slotProps={slotProps}
                                value={
                                    PERMISSIONS.find((option) => option.value === updatedClientData['Permissão']) || null
                                }
                                onChange={(event, newValue) => {
                                    setErrors((prevErrors) => ({
                                        ...prevErrors,
                                        'Data de Nascimento': "",
                                        'Permissão': "",
                                    }));
                                    setUpdatedClientData((prevData) => ({
                                        ...prevData,
                                        'Permissão': newValue ? newValue.value : '',
                                    }));
                                }}
                                isOptionEqualToValue={(option, value) => option.value === value?.value}
                                getOptionLabel={(option) => option.label}
                                error={errors['Permissão'] ? true : false}
                            />
                            {errors['Permissão'] && (
                                <Typography level="body-xs" color="danger" sx={{ pl: "0.1rem", pt: 0.5, fontWeight: "lighter" }}>
                                    {errors['Permissão']}
                                </Typography>
                            )}
                        </FormControl>
                    </Stack>
                    <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
                        <CardActions sx={{ alignSelf: "flex-end", pt: 2, flexWrap: { xs: "wrap", md: "nowrap" } }}>
                            <Button
                                size="sm"
                                variant="outlined"
                                color="neutral"
                                onClick={() => handleEditionForClient()}
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
    );
};

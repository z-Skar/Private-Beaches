import { useEffect, useState } from "react";
import { useAuth } from "contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import styled from "styled-components";
import { TextField } from "@mui/material";
import PencilIcon from "../components/my_components/PencilIcon";
import Modal from "../components/my_components/Modal";
import LifeguardFormModal from "../components/my_components/LifeguardFormModal";
import ProfilePicture from '../images/default-profile-picture.webp'
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import { validateClientFields, validatePasswordChangeFields } from "validation/validationFunctions";
import { Button as MuiButton } from "@mui/material";
import ReservationCancelModal from "../components/my_components/ReservationCancelModal";
import SignOutConfirmModal from "components/my_components/SignOutConfirmModal";

const Container = tw.div`bg-white p-8 rounded-lg shadow-2xl max-w-screen-xl mx-auto mt-10`;
const TwoColumnLayout = tw.div`flex flex-col lg:flex-row gap-16`;
const LeftColumn = tw.div`flex-[0.5] flex flex-col items-center justify-center`;
const AnimatedRightColumn = styled(motion.div)`
  ${tw`flex-[0.5] bg-gray-200 p-6 rounded-lg shadow-lg w-full flex flex-col items-center min-w-[150px] justify-center`}
`;
const Heading = tw.h2`text-2xl font-bold mt-4 text-center`;
const Subheading = tw.h3`text-lg font-semibold mt-2 text-gray-600 text-center`;
const InfoRow = tw.div`flex flex-col gap-6 mt-8 w-full`;
const InfoRowToEdit = tw.div`flex flex-col mt-8 w-full`;
const InfoItem = tw.div`flex flex-row items-start w-full gap-3`;
const LabelContainer = tw.div`bg-white rounded px-3 py-2 shadow text-gray-700 font-semibold min-w-[170px] max-w-[185px] w-[185px] text-left flex-shrink-0`;
const ValueContainer = tw.div`bg-gray-100 rounded px-3 py-2 shadow text-gray-900 flex-1 ml-2 overflow-hidden whitespace-nowrap text-ellipsis`;
const EditButton = tw.button`mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-700 transition min-w-[50px] max-w-[500px]`;
const CancelButton = tw.button`mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition min-w-[200px] max-w-[500px] w-full`;
const ConfirmButton = tw.button`mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-700 transition min-w-[200px] max-w-[500px] w-full`;
const ButtonRow = tw.div`w-full flex flex-row justify-around mt-4 gap-4`;
const ButtonStack = tw.div`min-w-[50px] max-w-[500px] w-[25rem] flex flex-col items-stretch`;

const ProfilePictureContainer = tw.div`flex flex-col items-center pb-2`;
const RelativeContainer = tw.div`relative`;
const ProfilePictureForm = tw.img`w-[150px] h-[150px] rounded-full border-4 border-gray-400`;
const Button = tw.button`absolute left-0 right-0 m-auto p-[.35rem] rounded-full bg-gray-400 hover:bg-gray-200 border border-gray-600 -bottom-[0.75rem] w-[1.75rem]`;

const commonStyles = {
  marginTop: 2.5,
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: `solid ${tw`border-gray-300`}`,
      borderWidth: 2,
    },
    '&:hover fieldset, &.Mui-focused fieldset': {
      transition: 'border-color 500ms',
      borderBottomColor: tw`border-primary-500`,
      color: tw`text-primary-500`,
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: tw`text-primary-500`,
  },
};

const AnimatedContainer = styled(motion.div)`${tw`bg-white p-8 rounded-lg shadow-2xl max-w-screen-xl mx-auto mt-10`}`;
const AnimatedLeftColumn = styled(motion.div)`${tw`flex-[0.5] flex flex-col items-center justify-center`}`;

const ReservationsContainer = styled.div`${tw`bg-white rounded-lg shadow-2xl max-w-screen-xl mx-auto mt-10 mb-10 p-8`}
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ReservationGrid = tw.div`grid grid-cols-1 md:grid-cols-2 gap-8 w-full`;

const ReservationCard = styled.div`
  ${tw`bg-gray-200 rounded-lg shadow-lg p-6 flex flex-col justify-between w-full`}
  min-width: 260px;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  }
`;

const ReservationOuterContainer = tw.div`flex flex-col items-center w-full`;

const ReservationCardContainer = tw.div`w-full flex justify-center`;

const CardHeading = tw.h4`text-xl font-bold mb-2 text-orange-500`;
const CardFooter = tw.div`flex flex-row justify-end mt-4`;

const NoReservationsContainer = tw.div`w-full flex flex-col items-center justify-center py-12 text-center`;
const NoReservationsImage = tw.img`w-24 h-24 mb-4 opacity-75`;
const NoReservationsTitle = tw.p`text-lg text-primary-600 font-semibold`;
const NoReservationsSubtitle = tw.p`text-sm text-gray-500 mt-1`;

export default () => {
  const { clientID, logout } = useAuth();
  const { id } = useParams();
  const [client, setClient] = useState(null); // Estado que armazena os dados do cliente que já estão carregados
  const [isEditing, setEditing] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [editData, setEditData] = useState(null); // Estado que armazena os dados do cliente para edição

  const [avatarUrl, setAvatarUrl] = useState(ProfilePicture); // imagem final
  const [tempAvatar, setTempAvatar] = useState(null);         // imagem temporária
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState({});
  const [showLifeguardModal, setShowLifeguardModal] = useState(false);
  const [nifInput, setNifInput] = useState("");
  const [nifError, setNifError] = useState("");
  const [reservations, setReservations] = useState([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSignoutModal, setShowSignoutModal] = useState(false);
  const [reservationToCancel, setReservationToCancel] = useState(null);

  const [passwordData, setPasswordData] = useState({});

  const NAVIGATE = useNavigate();
  
  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/clients/profile/${id}`);
        setClient(res.data[0]);
        setEditData(res.data[0]);
        const path = res.data[0].PROFILE_PICTURE;
        setAvatarUrl(path ? `http://localhost:5000${path}` : ProfilePicture)
      } catch (err) {
        console.error('Não foi possível obter os dados do cliente: ', err);
      };
    };
    const fetchReservations = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/reservations/client/${clientID}`);
        setReservations(res.data);
      } catch (error) {
        console.error("Erro ao obter as reservas: ", error);
      }
    };
    fetchClient();
    fetchReservations();
  }, [id]);

  if (!client) {
    return (
      <AnimationRevealPage>
        <Header />
        <Container style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          padding: '2rem'
        }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/456/456212.png"
            alt="Utilizador não encontrado"
            style={{ width: 96, height: 96, opacity: 0.7 }}
          />
          <Heading style={{ color: "#F56565", marginTop: "2rem" }}>Perfil não encontrado</Heading>
          <p style={{ color: "#718096", marginTop: "1rem", fontSize: "1.1rem", textAlign: "center" }}>
            O utilizador que procura não existe ou não foi possível carregar os dados.<br />
            Por favor, verifique o link ou tente novamente mais tarde.
          </p>
        </Container>
        <Footer />
      </AnimationRevealPage>
    );
  };

  const NOT_DEFINED_MESSAGE = "Não definido";
  const WELCOME_MESSAGE = String(clientID) === String(id) ? `Bem-vindo(a) de volta ${client.FULL_NAME.split(" ")[0]}!` : `Perfil de ${client.FULL_NAME.split(" ")[0]}.`;
  const SUBHEADING_MESSAGE = String(clientID) === String(id) ? `Aqui poderá gerir as suas informações pessoais.` : `Aqui estão as informações pessoais de ${client.FULL_NAME.split(" ")[0]}.`;

  const handleEditChange = (e) => {
    if(error[e.target.name]) {
      setError({
        ...error,
        [e.target.name]: undefined
      });
    };

    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditPassword = (e) => {
    if (error[e.target.name]) {
      setError({
        ...error,
        [e.target.name]: undefined
      });
    };

    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (inputDate) => {
    if (error.YEAR_OF_BIRTH) setError({ ...error, YEAR_OF_BIRTH: undefined });
    try {
        inputDate = inputDate.format('YYYY-MM-DD');
    } catch (error) {
        inputDate = '';
    }
    setEditData({
        ...editData,
        YEAR_OF_BIRTH: inputDate === 'Invalid Date' ? '' : inputDate,
    });
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    const ERRORS = validateClientFields(editData);
    setError(ERRORS);

    const HAS_ERRORS = Object.values(ERRORS).some((error) => error !== "");
    if (HAS_ERRORS) return;
    
    try {
      const formData = new FormData();

      for (const key in editData) {
        formData.append(key, editData[key]);
      };

      if (selectedFile) {
        formData.append("Perfil", selectedFile);
      };

      if (tempAvatar) setAvatarUrl(tempAvatar);
      setTempAvatar(null);
      setSelectedFile(null);
      setEditing(false);

      await axios.put(`http://localhost:5000/clients/user/edit/${clientID}`, formData, {
        headers: {
          'Content-Type': "multipart/form-data",
        },
      });
      NAVIGATE(0);
      window.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
    };
  };

  const handleCancel = () => {
    setTempAvatar(null);
    setEditData(client);
    setEditing(false);
    setError({});
  };

  const updateAvatar = (imgSrc) => {
    setTempAvatar(imgSrc);
    setEditData({
      ...editData,
      PROFILE_PICTURE: imgSrc
    });
  };
  const USER_IS_ADULT = client.YEAR_OF_BIRTH ? dayjs().diff(dayjs(client.YEAR_OF_BIRTH), 'year') >= 18 : false;

  const handleLifeguardModalOpen = () => {
    setShowLifeguardModal(true);
    setNifInput("");
    setNifError("");
  };

  const handleLifeguardModalClose = () => {
    setShowLifeguardModal(false);
    setNifInput("");
    setNifError("");
  };

  const handleNifChange = (e) => {
    setNifInput(e.target.value);
    if (nifError) setNifError("");
  };

  const handleLifeguardSubmit = async (e) => {
    e.preventDefault();
    if (!nifInput || nifInput.length !== 9 || !/^\d+$/.test(nifInput)) {
      setNifError("Insira um NIF válido (9 dígitos).");
      return;
    };

    try {
      await axios.post(`http://localhost:5000/lifeguards/register`, {
        clientID,
        NIF: nifInput
      });
      setShowLifeguardModal(false);
      NAVIGATE(0);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setNifError(error.response.data.error);
      } else {
        setNifError("Ocorreu um erro ao submeter a candidatura.");
      }
    }
  };

  const handleCancelReservationClick = (reservation) => {
    setReservationToCancel(reservation);
    setShowCancelModal(true);
  };

  const handleConfirmCancelReservation = async (e) => {
    e.preventDefault();
    if (!reservationToCancel) return;
    try {
      await axios.delete(`http://localhost:5000/reservations/delete/${reservationToCancel.RESERVATION_ID}`);
      NAVIGATE(0);
    } catch (err) {
      console.error('Erro ao eliminar reserva: ', err);
    }
  };

  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
    setReservationToCancel(null);
  };

  const handleSignOut = () => {
    logout();
    NAVIGATE('/Login.js');
  };

  const handleEditPasswordSubmit = async () => {
	const ERRORS = validatePasswordChangeFields(passwordData);
	setError(ERRORS);

	const HAS_ERRORS = Object.values(ERRORS).some((error) => error !== "");
	if (HAS_ERRORS) return;
    console.log(passwordData);
	try {
		await axios.put(`http://localhost:5000/clients/edit-password/${clientID}`, {
			OLD_PASSWORD: passwordData.OLD_PASSWORD,
			NEW_PASSWORD: passwordData.NEW_PASSWORD
		});
    logout();
    NAVIGATE(`/Login.js`);

    } catch (error) {
      if (error.response?.status === 401 && error.response.data?.error?.toLowerCase().includes("atual incorreta")) {
        setError(prev => ({
          ...prev,
          OLD_PASSWORD: "Palavra-passe atual incorreta."
        }));
      } else {
        // Erro inesperado
        console.error("Erro inesperado ao atualizar a palavra-passe: ", error);
        setError(prev => ({
          ...prev,
          NEW_PASSWORD: "Erro ao atualizar a palavra-passe. Tente novamente."
        }));
      };
    };
  };


  return (
    <AnimationRevealPage>
      <div style={{ marginTop: '2.5rem' }}>
        <Header />
      </div>
      <AnimatedContainer
        key="container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.4 }}
      >
        <TwoColumnLayout>
          <AnimatePresence mode="wait">
            <AnimatedLeftColumn
              key={isEditing ? "left-edit" : "left-view"}
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.3 }}
            >
              <ProfilePictureContainer>
                <RelativeContainer>
                  <ProfilePictureForm
                    src={tempAvatar || avatarUrl}
                    alt="Avatar"
                  />
                  <AnimatePresence mode="wait">
                    {isEditing && (
                      <motion.div
                        key="edit-avatar-btn"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.25 }}
                      >
                        <Button
                          type="button"
                          title="Change photo"
                          onClick={() => setModalOpen(true)}
                        >
                          <PencilIcon />
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </RelativeContainer>
                {modalOpen && (
                  <Modal
                    updateAvatar={updateAvatar}
                    setSelectedFile={setSelectedFile}
                    closeModal={() => setModalOpen(false)}
                  />
                )}
              </ProfilePictureContainer>
              <Heading>{WELCOME_MESSAGE}</Heading>
              <Subheading>{SUBHEADING_MESSAGE}</Subheading>
              <AnimatePresence mode="wait">
                {!isEditing && !isEditingPassword ? (
                  <motion.div
                    key="edit-btn"
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{ duration: 0.3 }}
                  >
                    { String(clientID) === String(id) && (
                      <>
                        <ButtonStack>
                          <EditButton onClick={() => setEditing(true)}>Editar Informações Pessoais</EditButton>
                          {USER_IS_ADULT && !editData.LIFEGUARD_STATUS && (
                            <EditButton onClick={handleLifeguardModalOpen}>Candidatar-se a Salva-vidas</EditButton>
                          )}
                          <EditButton onClick={() => setIsEditingPassword(true)}>Alterar Palavra-passe</EditButton>
                          <EditButton onClick={() => setShowSignoutModal(true)}>Terminar Sessão</EditButton>
                        </ButtonStack>
                        <SignOutConfirmModal
                          open={showSignoutModal}
                          handleClose={() => setShowSignoutModal(false)}
                          onSubmit={handleSignOut}
                          clientID={clientID}
                        />
                      </>
                    )}
                    
                  </motion.div>
                ) : isEditing ? (
                  <motion.div
                    key="edit-actions"
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ButtonRow>
                      <CancelButton onClick={handleCancel}>Cancelar</CancelButton>
                      <ConfirmButton onClick={handleConfirm}>Confirmar</ConfirmButton>
                    </ButtonRow>
                  </motion.div>
                ) : (
                  <motion.div
                    key="edit-password-actions"
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ButtonRow>
                      <CancelButton onClick={() => {
                        setIsEditingPassword(false);
                        setError({
                          OLD_PASSWORD: '',
                          NEW_PASSWORD: '',
                          CONFIRM_PASSWORD: ''
                        });
                      }}>Cancelar</CancelButton>
                      <ConfirmButton onClick={handleEditPasswordSubmit}>Confirmar</ConfirmButton>
                    </ButtonRow>
                  </motion.div>
                )}
              </AnimatePresence>
              {showLifeguardModal && (
                <LifeguardFormModal
                  open={showLifeguardModal}
                  onClose={handleLifeguardModalClose}
                  onSubmit={handleLifeguardSubmit}
                  nifValue={nifInput}
                  onNifChange={handleNifChange}
                  nifError={nifError}
                />
              )}
            </AnimatedLeftColumn>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {!isEditing && !isEditingPassword && (
              <AnimatedRightColumn
                key="view"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.3 }}
              >
                <Heading>Informações Pessoais</Heading>
                <InfoRow>
                  <InfoItem>
                    <LabelContainer>Nome Completo</LabelContainer>
                    <ValueContainer title={client.FULL_NAME || NOT_DEFINED_MESSAGE}>{client.FULL_NAME || NOT_DEFINED_MESSAGE}</ValueContainer>
                  </InfoItem>
                  {editData.LIFEGUARD_NIF && String(clientID) === String(id) && editData.LIFEGUARD_STATUS !== 'Em Espera' && (
                    <>
                      <InfoItem>
                        <LabelContainer>NIF</LabelContainer>
                        <ValueContainer title={client.LIFEGUARD_NIF || NOT_DEFINED_MESSAGE}>{client.LIFEGUARD_NIF || NOT_DEFINED_MESSAGE}</ValueContainer>
                      </InfoItem>
                      <InfoItem>
                        <LabelContainer>Salário</LabelContainer>
                        <ValueContainer title={client.SALARY + '€' || NOT_DEFINED_MESSAGE}>{client.SALARY + '€' || NOT_DEFINED_MESSAGE}</ValueContainer>
                      </InfoItem>
                    </>
                  )}
                  <InfoItem>
                    <LabelContainer>Email</LabelContainer>
                    <ValueContainer title={client.EMAIL || NOT_DEFINED_MESSAGE}>{client.EMAIL || NOT_DEFINED_MESSAGE}</ValueContainer>
                  </InfoItem>
                  <InfoItem>
                    <LabelContainer>Data de Nascimento</LabelContainer>
                    <ValueContainer title={client.YEAR_OF_BIRTH || NOT_DEFINED_MESSAGE}>{client.YEAR_OF_BIRTH || NOT_DEFINED_MESSAGE}</ValueContainer>
                  </InfoItem>
                  <InfoItem>
                    <LabelContainer>Contacto</LabelContainer>
                    <ValueContainer title={client.CONTACT || NOT_DEFINED_MESSAGE}>{client.CONTACT || NOT_DEFINED_MESSAGE}</ValueContainer>
                  </InfoItem>
                  { editData.LIFEGUARD_STATUS && String(id) === String(clientID) && editData.LIFEGUARD_STATUS !== 'Em Espera' && (
                    <InfoItem>
                      <LabelContainer title="Status de Salva-vidas">Status</LabelContainer>
                      <ValueContainer title={client.LIFEGUARD_STATUS || NOT_DEFINED_MESSAGE}>{client.LIFEGUARD_STATUS || NOT_DEFINED_MESSAGE}</ValueContainer>
                    </InfoItem>
                  )}
                </InfoRow>
              </AnimatedRightColumn>
            )}
            {isEditing && (
              <AnimatedRightColumn
                key="edit"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.3 }}
              >
                <Heading>Editar Informações Pessoais</Heading>
                <InfoRowToEdit>
                  <TextField
                    name="FULL_NAME"
                    label="Nome completo"
                    value={editData?.FULL_NAME || ""}
                    onChange={handleEditChange}
                    variant="outlined"
                    size="normal"
                    fullWidth
                    sx={commonStyles}
                  /> {error.FULL_NAME && <p tw="text-red-700 text-xs pl-1 pt-1">{error.FULL_NAME}</p>}
                  <TextField
                    name="EMAIL"
                    label="Endereço de email"
                    value={editData?.EMAIL || ""}
                    disabled
                    variant="outlined"
                    size="normal"
                    fullWidth
                    sx={commonStyles}
                  />
                  <DatePicker
                    label="Data de nascimento"
                    value={editData?.YEAR_OF_BIRTH ? dayjs(editData.YEAR_OF_BIRTH) : null}
                    onChange={handleDateChange}
                    disableFuture
                    format="YYYY-MM-DD"
                    minDate={dayjs('1925-01-01')}
                    slotProps={{
                      textField: {
                        variant: "outlined",
                        size: "normal",
                        fullWidth: true,
                        sx: commonStyles,
                      }
                    }}
                  />  {error.YEAR_OF_BIRTH && <p tw="text-red-700 text-xs pl-1 pt-1">{error.YEAR_OF_BIRTH}</p>}
                  <TextField
                    name="CONTACT"
                    label="Número de telemóvel"
                    value={editData?.CONTACT || ""}
                    onChange={handleEditChange}
                    variant="outlined"
                    size="normal"
                    fullWidth
                    sx={commonStyles}
                  />  {error.CONTACT && <p tw="text-red-700 text-xs pl-1 pt-1">{error.CONTACT}</p>}
                </InfoRowToEdit>
              </AnimatedRightColumn>
            )}
            {isEditingPassword && (
              <AnimatedRightColumn
                key="edit-password"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.3 }}
              >
                <Heading>Alterar Palavra-passe</Heading>
                <InfoRowToEdit>
                  <TextField
                    name="OLD_PASSWORD"
                    label="Palavra-passe Atual"
                    type="password"
                    onChange={handleEditPassword}
                    variant="outlined"
                    size="normal"
                    fullWidth
                    sx={commonStyles}
                  /> {error.OLD_PASSWORD && <p tw="text-red-700 text-xs pl-1 pt-1">{error.OLD_PASSWORD}</p>}
                  <TextField
                    name="NEW_PASSWORD"
                    label="Nova Palavra-passe"
                    type="password"
                    onChange={handleEditPassword}
                    variant="outlined"
                    size="normal"
                    fullWidth
                    sx={commonStyles}
                  /> {error.NEW_PASSWORD && <p tw="text-red-700 text-xs pl-1 pt-1">{error.NEW_PASSWORD}</p>}
                  <TextField
                    name="CONFIRM_PASSWORD"
                    label="Confirmar Nova Palavra-passe"
                    type="password"
                    onChange={handleEditPassword}
                    variant="outlined"
                    size="normal"
                    fullWidth
                    sx={commonStyles}
                  /> {error.CONFIRM_PASSWORD && <p tw="text-red-700 text-xs pl-1 pt-1">{error.CONFIRM_PASSWORD}</p>}
                </InfoRowToEdit>
              </AnimatedRightColumn>
            )}
          </AnimatePresence>
        </TwoColumnLayout>
      </AnimatedContainer>

      {String(id) === String(clientID) ? (
        <ReservationsContainer>
          <h3 tw="font-bold text-xl mb-8 text-orange-500">Minhas Reservas</h3>
            {reservations.length > 0 ? (
              <ReservationOuterContainer>
              <ReservationGrid>
                {reservations.map(reservation => {
                  const startDate = dayjs(reservation.RESERVATION_START);
                  const endDate = dayjs(reservation.RESERVATION_END);
                const now = dayjs();
                const canCancel = now.isBefore(startDate.subtract(5, 'days'));

                return (
                  <ReservationCardContainer key={reservation.RESERVATION_ID}>
                    <ReservationCard>
                      <CardHeading>{reservation.BEACH_NAME}</CardHeading>
                      <InfoRow style={{gap: '0.75rem'}}>
                        <InfoItem>
                          <LabelContainer>Início</LabelContainer>
                          <ValueContainer>{startDate.format("YYYY-MM-DD")}</ValueContainer>
                        </InfoItem>
                        <InfoItem>
                          <LabelContainer>Fim</LabelContainer>
                          <ValueContainer>{endDate.format("YYYY-MM-DD")}</ValueContainer>
                        </InfoItem>
                        <InfoItem>
                          <LabelContainer>Preço</LabelContainer>
                          <ValueContainer>{reservation.BILL_COST}€</ValueContainer>
                        </InfoItem>
                      </InfoRow>
                      <CardFooter>
                        {canCancel && (
                          <MuiButton
                            variant="contained"
                            color="error"
                            tw="max-w-[180px]"
                            onClick={() => handleCancelReservationClick(reservation)}
                          >
                            Cancelar Reserva
                          </MuiButton>
                        )}
                      </CardFooter>
                    </ReservationCard>
                  </ReservationCardContainer>
                );
              })}
            </ReservationGrid>
          </ReservationOuterContainer>
          ) : (
            <NoReservationsContainer>
              <NoReservationsImage
                src="https://uxwing.com/wp-content/themes/uxwing/download/time-and-date/remove-date-calendar-icon.png"
                alt="Sem reservas"
              />
              <NoReservationsTitle>Ainda não tem reservas marcadas.</NoReservationsTitle>
              <NoReservationsSubtitle>
                Quando fizer uma reserva, ela aparecerá aqui.
              </NoReservationsSubtitle>
            </NoReservationsContainer>
          )}
        </ReservationsContainer>
      ) : null}
      <ReservationCancelModal
        open={showCancelModal}
        onClose={handleCloseCancelModal}
        onSubmit={handleConfirmCancelReservation}
        reservation={reservationToCancel}
      />
      <Footer />
    </AnimationRevealPage>
  );
};
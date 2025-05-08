import { useState, useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";
import { ReactComponent as StarIcon } from "feather-icons/dist/icons/star.svg";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { TextField } from "@mui/material";
import { validateReservationFields } from "validation/validationFunctions";
import { DatePicker } from "@mui/x-date-pickers";
import { useAuth } from "contexts/AuthContext";
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import axios from "axios";
import tw from "twin.macro";
import styled from "styled-components";

const Container = tw.div`bg-white p-8 rounded-lg shadow-lg max-w-screen-xl mx-auto mt-10`;
const ImageContainer = tw.div`relative w-full h-96 rounded-lg overflow-hidden bg-gray-200`;
const FallbackImage = tw.div`absolute inset-0 flex items-center justify-center text-gray-500`;
const Image = styled.img`${tw`w-full h-96 object-cover rounded-lg`}`;
const Heading = tw.h2`text-2xl font-bold mt-4`;
const Subheading = tw.h3`text-lg font-semibold mt-2 text-gray-600`;
const Description = tw.p`mt-4 text-gray-500 italic leading-relaxed`;
const InfoRow = tw.div`flex flex-wrap mt-4`;
const InfoItem = tw.div`w-full mt-5`;
const Label = tw.span`font-semibold text-gray-600`;
const Value = tw.span`ml-2 text-gray-800`;
const TwoColumnLayout = tw.div`flex flex-col lg:flex-row gap-16`;
const LeftColumn = tw.div`flex-[0.6]`;
const RightColumn = tw.div`flex-[0.4] bg-gray-100 p-6 rounded-lg shadow-lg w-full`;
const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`
const SubmitButton = tw(PrimaryButtonBase)`inline-block`
const FinalPrice = tw.div`text-5xl font-extrabold text-green-500 mt-12 text-center`;
const ReservationHeading = tw(Heading)`text-3xl text-orange-500`;
const ErrorMessage = tw.p`text-red-700 text-xs pl-1 pt-1`;
const ButtonRow = tw.div`flex justify-between items-center mt-8`;
const CheckPriceButton = tw(PrimaryButtonBase)`bg-green-500 hover:bg-green-700 hocus:bg-green-700`; // Green button for "Verificar Preço"

export default function BeachReservation() {
    const { id } = useParams();
    const { clientID } = useAuth();
    const [beach, setBeach] = useState(null);
    const [reservationData, setReservationData] = useState({
        RESERVATION_START: "",
        RESERVATION_END: "",
        CREDIT_CARD_NUMBER: "",
        NUMBER_OF_PEOPLE: "",
    });
    const [reservationPrice, setReservationPrice] = useState();
    const [error, setError] = useState({});

    useEffect(() => {
        const FETCH_BEACH_BY_ID = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/beaches/read/${id}`);
                setBeach(response.data[0]);
            } catch (error) {
                console.error("Error fetching beach data:", error);
            };
        };
        FETCH_BEACH_BY_ID();
    }, [id]);

    const NAVIGATE = useNavigate();
    
    if (!beach) return <p>Loading...</p>;

    const PRAIA = {
        NAME: beach.BEACH_NAME || "Nome indisponível",
        CITY: beach.CITY_LOCATION || "Cidade indisponível",
        COUNTRY: beach.COUNTRY_LOCATION || "País indisponível",
        DESCRIPTION: beach.DESCRIPTION || "Descrição indisponível",
        SERVICE: beach.SERVICE_TYPE || "Tipo de serviço indisponível",
        COST: beach.RESERVATION_COST || "Custo indisponível",
        LIFEGUARD_ID: beach.LIFEGUARD_ID || "ID do salva-vidas indisponível",
        LIFEGUARD_NAME: beach.LIFEGUARD_NAME || "Nome do salva-vidas indisponível",
        SCORE: beach.SCORE || "Sem avaliações",
        PICTURE: beach.PICTURE,
    };

    const RESERVATION_INPUT_STYLE = {
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

    const HANDLE_DATE_CHANGE = (fieldName, inputDate) => {
        if (error[fieldName]) setError({ ...error, [fieldName]: undefined });
        try {
            inputDate = inputDate.format('YYYY-MM-DD');
        } catch (error) {
            inputDate = '';
        }
        setReservationData({
            ...reservationData,
            [fieldName]: inputDate === 'Invalid Date' ? '' : inputDate,
        });
    };

    const HANDLE_INPUT_CHANGE = (e) => {
        if(error[e.target.name]) {
          setError({
            ...error,
            [e.target.name]: undefined
          });
        };
    
        setReservationData({
          ...reservationData,
          [e.target.name]: e.target.value,
        });
    };

    const HANDLE_SUBMIT = async (event)  => {
        event?.preventDefault();
        const ERRORS = validateReservationFields(reservationData);
        setError(ERRORS);

        const HAS_ERRORS = Object.values(ERRORS).some((error) => error !== "");
        if (HAS_ERRORS) return;

        try {
            const DATA = {
                CLIENT_ID: localStorage.getItem("CLIENT_ID"),
                BEACH_ID: id,
                RESERVATION_START: reservationData.RESERVATION_START,
                RESERVATION_END: reservationData.RESERVATION_END,
                CREDIT_CARD_NUMBER: reservationData.CREDIT_CARD_NUMBER,
                BILL_COST: GET_BILL_COST(),
            };
            await ADD_RESERVATION(DATA);
            NAVIGATE("/Beaches.js");
            window.scrollTo(0, 0);
        } catch (error) {
            console.log(error);
        };
    };

    const ADD_RESERVATION = async (data) => {
        try {
            const response = await fetch('http://localhost:5000/reservations/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.log('Fetch Error: ', error);
        };
    };

    const GET_BILL_COST = () => {
        const startDate = new Date(reservationData.RESERVATION_START);
        const endDate = new Date(reservationData.RESERVATION_END);

        const NUMBER_OF_MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;
        const DAYS = Math.ceil((endDate - startDate) / NUMBER_OF_MILLISECONDS_IN_A_DAY);
        const TOTAL_COST = DAYS * PRAIA.COST * reservationData.NUMBER_OF_PEOPLE;

        return TOTAL_COST;
    };

    const HANDLE_CONFIRM_PRICE = (event) => {
        event?.preventDefault();
        const ERRORS = validateReservationFields(reservationData);
        setError(ERRORS);
    
        if (ERRORS.RESERVATION_START || ERRORS.RESERVATION_END || ERRORS.NUMBER_OF_PEOPLE) return;
        setReservationPrice(GET_BILL_COST());
    };

    return (
        <AnimationRevealPage>
            <div style={{ marginTop: '2.5rem' }}>
                <Header />
            </div>
            <Container>
                <TwoColumnLayout>
                    <LeftColumn>
                        <ImageContainer>
                            {PRAIA.PICTURE ? (
                                <Image src={PRAIA.PICTURE} alt={PRAIA.NAME} />
                            ) : (
                                <FallbackImage>Imagem indisponível</FallbackImage>
                            )}
                        </ImageContainer>
                        <Heading>{PRAIA.NAME}</Heading>
                        <Subheading>{PRAIA.CITY}, {PRAIA.COUNTRY}</Subheading>
                        <Description>&quot;{PRAIA.DESCRIPTION}&quot;</Description>
                        <InfoRow>
                            <InfoItem>
                                <Label>Serviço de Nível</Label>
                                <Value style={{color: PRAIA.SERVICE === 'Premium' ? '#ed8936' : '#ecc94b', fontWeight: 'bold' }}>{PRAIA.SERVICE}</Value>
                            </InfoItem>
                            <InfoItem>
                                <Label>Custo da Reserva a</Label>
                                <Value style={{ color: '#48bb78', fontWeight: 'bold' }}>{PRAIA.COST}€</Value>
                            </InfoItem>
                            <InfoItem>
                                <Label>Salva-vidas Responsável:</Label>
                                <Value style={{ color: PRAIA.LIFEGUARD_NAME === 'Indisponível' ? '#f56565' : '#4299e1', fontWeight: 'bold' }}>{PRAIA.LIFEGUARD_NAME}</Value>
                            </InfoItem>
                            <InfoItem style={{ display: 'flex' }}>
                                <Label>Avaliação dos utilizadores {"-->"}</Label>
                                <Value style={{ fontWeight: 'bold' }}>{PRAIA.SCORE}</Value>
                                <StarIcon style={{ fill: '#ecc94b' }} />
                            </InfoItem>
                        </InfoRow>
                    </LeftColumn>
                    <RightColumn style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <ReservationHeading style={{ textAlign: 'center' }}>Criar Reserva</ReservationHeading>
                        <Form style={{ width: '100%' }}>
                            <DatePicker
                                name="RESERVATION_START"
                                label="Data do Início da Reserva"
                                disablePast
                                format="YYYY-MM-DD"
                                sx={RESERVATION_INPUT_STYLE}
                                onChange={(date) => HANDLE_DATE_CHANGE("RESERVATION_START", date)}
                            />
                            {error.RESERVATION_START && <ErrorMessage>{error.RESERVATION_START}</ErrorMessage>}

                            <DatePicker
                                name="RESERVATION_END"
                                label="Data do Fim da Reserva"
                                disablePast
                                format="YYYY-MM-DD"
                                sx={RESERVATION_INPUT_STYLE}
                                onChange={(date) => HANDLE_DATE_CHANGE("RESERVATION_END", date)}
                            />
                            {error.RESERVATION_END && <ErrorMessage>{error.RESERVATION_END}</ErrorMessage>}

                            <TextField
                                name="CREDIT_CARD_NUMBER"
                                label="Número do Cartão de Crédito"
                                type="password"
                                sx={RESERVATION_INPUT_STYLE}
                                onChange={HANDLE_INPUT_CHANGE}
                            />
                            {error.CREDIT_CARD_NUMBER && <ErrorMessage>{error.CREDIT_CARD_NUMBER}</ErrorMessage>}

                            <TextField
                                name="NUMBER_OF_PEOPLE"
                                label="Número de Pessoas"
                                sx={RESERVATION_INPUT_STYLE}
                                onChange={HANDLE_INPUT_CHANGE}
                            />
                            {error.NUMBER_OF_PEOPLE && <ErrorMessage>{error.NUMBER_OF_PEOPLE}</ErrorMessage>}

                            <FinalPrice>{reservationPrice || PRAIA.COST}€</FinalPrice>
                            <ButtonRow>
                                <SubmitButton type="submit" onClick={HANDLE_SUBMIT}>Confirmar Reserva</SubmitButton>
                                <CheckPriceButton onClick={HANDLE_CONFIRM_PRICE}>Verificar Preço</CheckPriceButton>
                            </ButtonRow>
                        </Form>
                    </RightColumn>
                </TwoColumnLayout>
            </Container>
            <Footer />
        </AnimationRevealPage>
    );
};
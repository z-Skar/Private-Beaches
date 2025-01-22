import React, { useState, useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { ReactComponent as StarIcon } from "images/star-icon.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-7.svg";
import Header from "components/headers/light.js";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Typography } from "@mui/material";
import Autocomplete  from '@mui/material/Autocomplete';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { validateReservationCostFields } from "validation/validationFunctions";
import Footer from "components/footers/MiniCenteredFooter.js";

const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row w-full`;
const Heading = tw(SectionHeading)`text-gray-700 mb-3`
const TabsControl = tw.div`bg-gray-200 px-2 py-2 rounded leading-none mt-12 xl:mt-0`;
  /*<TabsControl>
  {Object.keys(tabs).map((tabName, index) => (
    <TabControl key={index} active={activeTab === tabName} onClick={() => setActiveTab(tabName)}>
      {tabName}
    </TabControl>
  ))}
  </TabsControl>*/

const TabControl = styled.div`
  ${tw`cursor-pointer px-6 py-3 mt-2 sm:mt-0 sm:mr-2 last:mr-0 text-gray-600 font-medium rounded-sm transition duration-300 text-sm sm:text-base w-1/2 sm:w-auto text-center`}
  &:hover {
    ${tw`bg-gray-300 text-gray-700`}
  }
  ${props => props.active && tw`bg-primary-500! text-gray-100!`}
  }
`;

const Actions = styled.div`
  ${tw`relative max-w-md text-center mx-auto lg:mx-0 w-full`}
  input {
    ${tw`sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500`}
  }
  button {
    ${tw`w-full sm:absolute right-0 top-0 bottom-0 bg-primary-500 text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:w-40 sm:leading-none focus:outline-none hover:bg-primary-900 transition duration-300`}
  }
`;

const TabContent = tw(motion.div)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;
const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12`;
const Card = tw(motion.a)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;
const CardImageContainer = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-56 xl:h-64 bg-center bg-cover relative rounded-t`}
`;
const CardRatingContainer = tw.div`leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end`;
const CardRating = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-end`}
  svg {
    ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
  }
`;

const CardHoverOverlay = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  ${tw`absolute inset-0 flex justify-center items-center`}
`;
const CardButton = tw(PrimaryButtonBase)`text-sm`;

const CardReview = tw.div`font-medium text-xs text-gray-600`;

const CardText = tw.div`p-4 text-gray-900`;
const CardTitle = tw.h5`text-lg font-semibold group-hover:text-primary-500`;
const CardContent = tw.p`mt-1 text-sm font-medium text-gray-600 line-clamp-2`;

const CardPrice = tw.p`mt-4 text-xl font-bold`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

const commonStyles = {
  marginTop: '0.5rem',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: `solid ${tw`border-gray-100`}`,
      borderWidth: 2,
    },
    '&:hover fieldset, &.Mui-focused fieldset': {
      transition: 'border-color 500ms',
      borderBottomColor: tw`border-primary-500`,
    },
  },
  '& .MuiInputLabel-root': {
    '&:hover': {
      color: tw`text-primary-500`,
    },
    '&.Mui-focused': {
      color: tw`text-primary-500`,
    },
  },
};

export default ({
  heading = "Vem conhecer as nossas Praias",
}) => {
  /*
   * To customize the tabs, pass in data using the `tabs` prop. It should be an object which contains the name of the tab
   * as the key and value of the key will be its content (as an array of objects).
   * To see what attributes are configurable of each object inside this array see the example above for "Starters".
   */

  // Use States
  const [beaches, setBeaches] = useState([{}]);
  const [animationDirection, setAnimationDirection] = useState('left')

  // Parâmetros de Filtragem
  const [filterText, setFilterText] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [minCost, setMinCost] = useState("0");
  const [maxCost, setMaxCost] = useState("999999");

  // Opções para as ComboBoxs
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);

  // Mensagens de Erro
  const [errors, setErrors] = useState({
    minCostMessage: '',
    maxCostMessage: ''
  });

  // Trigger para a Pesquisa
  const [trigger, setTrigger] = useState(Date.now());

  useEffect(() => {
    const getData = async () => {
      try {
        // DEFINIÇÃO DA URL COM OS SEUS PARÂMETROS.
        const query_parameters = new URLSearchParams();

        //-- PARÂMETROS DEFAULT.
        query_parameters.append('orderBy', 'Beaches.BEACH_ID');
        query_parameters.append('orderDireciton', 'DESC')

        //-- PARÂMETROS DE FILTRAGEM DE DADOS.
        filterText && query_parameters.append('textParameter', filterText);
        country && query_parameters.append('countryParameter', country);
        city && query_parameters.append('cityParameter', city);
        serviceType && query_parameters.append('serviceTypeParameter', serviceType);

        //-- PARÂMETROS DE FILTRAGEM DE DADOS EM FUNÇÃO DO CUSTO DE RESERVA, PARÂMETROS ESSES QUE NUNCA SERÃO "falsy".
        query_parameters.append('minCostParameter', minCost);
        query_parameters.append('maxCostParameter', maxCost);


        //-- EXECUÇÃO DAS URLs. OS DADOS SERÃO CHAMADOS PARA PREENCHER A INTERFACE DO SITE.
        const beaches = await fetch(`http://localhost:5000/beaches?${query_parameters.toString()}`);
        const location = await fetch('http://localhost:5000/beaches/location');
        const services = await fetch('http://localhost:5000/beaches/services');

        //-- DADOS EM FORMATO JSON.
        const beachesData = await beaches.json();
        const locationData = await location.json();
        const servicesData = await services.json();
        
        //-- CRIAÇÃO DO CAMINHO DA IMAGEM VINDA DO SERVIDOR.
        const updatedBeaches = beachesData.map(beach => ({
          ...beach,
          PICTURE: `http://localhost:5000${beach.PICTURE}`
        }));

        //-- ATRIBUIÇÃO DOS VALORES AOS ESTADOS QUE RETORNARÃO OS DADOS NECESSÁRIOS
        //-- PARA MOSTRAR A INTERFACE E OS INPUTS DE MANEIRA CORRETA.
        setBeaches(updatedBeaches);
        setCountries(locationData.map(record => record.COUNTRY_LOCATION));
        setCities(locationData.flatMap(record => record.CITIES.split(', ')));
        setServiceTypes(servicesData.map(record => record.SERVICE_TYPE));
      } catch (error) {
        console.log('Fetch Error: ', error);
      };
    };
    getData();
  }, [trigger]);
  
  /*const tabs = {
    Starters: [
      {
        imageSrc:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
        title: "Veg Mixer",
        content: "Tomato Salad & Carrot",
        price: "$5.99",
        rating: "5.0",
        Avaliações: "87",
        url: "#"
      },
      {
        imageSrc:
          "https://images.unsplash.com/photo-1432139555190-58524dae6a55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
        title: "Macaroni",
        content: "Cheese Pizza",
        price: "$2.99",
        rating: "4.8",
        Avaliações: "32",
        url: "#"
      },
      {
        imageSrc:
          "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327??ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
        title: "Nelli",
        content: "Hamburger & Fries",
        price: "$7.99",
        rating: "4.9",
        Avaliações: "89",
        url: "#"
      },
      {
        imageSrc:
          "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
        title: "Jalapeno Poppers",
        content: "Crispy Soyabeans",
        price: "$8.99",
        rating: "4.6",
        Avaliações: "12",
        url: "#"
      },
      {
        imageSrc:
          "https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
        title: "Cajun Chicken",
        content: "Roasted Chicken & Egg",
        price: "$7.99",
        rating: "4.2",
        Avaliações: "19",
        url: "#"
      },
      {
        imageSrc:
          "https://images.unsplash.com/photo-1550461716-dbf266b2a8a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
        title: "Chillie Cake",
        content: "Deepfried Chicken",
        price: "$2.99",
        rating: "5.0",
        Avaliações: "61",
        url: "#"
      },
      {
        imageSrc:
          "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
        title: "Guacamole Mex",
        content: "Mexican Chilli",
        price: "$3.99",
        rating: "4.2",
        Avaliações: "95",
        url: "#"
      },
      {
        imageSrc:
          "https://images.unsplash.com/photo-1565310022184-f23a884f29da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
        title: "Carnet Nachos",
        content: "Chilli Crispy Nachos",
        price: "$3.99",
        rating: "3.9",
        Avaliações: "26",
        url: "#"
      }
    ],
    Main: getRandomCards(),
    Soup: getRandomCards(),
    Desserts: getRandomCards()
  }; */
  
  const SEARCH = () => {
    setAnimationDirection('right');
    const errorMessages = validateReservationCostFields((minCost || '0'), (maxCost || '999999'));

    setErrors(errorMessages);
    
    if(!errorMessages.minCostMessage && !errorMessages.maxCostMessage) {
      setTrigger(Date.now());
    };
  };

  const CLEAR_INPUTS = () => {
    document.getElementById('textInput').value = '';
    setFilterText('');

    document.getElementById('country').value = '';
    setCountry('');

    document.getElementById('city').value = '';
    setCity('');

    document.getElementById('serviceType').value = '';
    setServiceType('');

    document.getElementById('minCost').value = '';
    setMinCost('0');

    document.getElementById('maxCost').value = '';
    setMaxCost('999999');

    setErrors({
      minCostMessage: '',
      maxCostMessage: ''
    });

    setTrigger(Date.now());
  };
  console.log(beaches);
  const tabs = beaches.length > 0 ? {
    Starters: beaches.map(beach => ({
      imageSrc: beach.PICTURE || 'Imagem indisponível',
      title: beach.BEACH_NAME || 'Título indisponível',
      content: beach.DESCRIPTION || 'Descrição indisponível',
      price: `€${beach.RESERVATION_COST}` || 'Preço indisponível',
      rating: beach.SCORE || '...',
      Evaluations: beach.EVALUATIONS || '0',
      url: '#'
    }))
  } : {};

  const tabsKeys = Object.keys(tabs);
  const [activeTab, setActiveTab] = useState(tabsKeys[0]);

  return (
    <AnimationRevealPage>
      <Container>
        <Header />
        <ContentWithPaddingXl>
          <HeaderRow>
            <Heading>{heading}</Heading>
            <Actions>
              <input
                type="text"
                placeholder="Nome ou descrição da Praia"
                id="textInput"
                onChange={e => setFilterText(e.target.value)}
                onKeyDown={(key) => key.code === 'Enter' && SEARCH()}
              />
              <button onClick={SEARCH}>
                Pesquisar
              </button>
            </Actions>
          </HeaderRow>
          <HeaderRow>
            <Accordion
              style={{
                backgroundColor: '#EDF2F7',
                borderWidth: '2px',
                borderColor: 'E2E8F0',
                borderRadius: '10px',
                marginTop: '1.5rem',
                marginBottom: '-3.5rem',
                width: '100%',
                maxWidth: '1200px',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id="filterSection"
                style={{ height: '4rem' }}
              >
                <Typography
                  component="span"
                  style={{ fontFamily: 'Inter', fontWeight: '600', color: '#4a5568'}}>
                    MAIS FILTROS
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div style={{ borderTopWidth: '2px', display: 'flex', justifyContent: 'center', alignContent: 'center', flexWrap: 'wrap', gap: '0.5rem'}}>
                  <Autocomplete options={countries} sx={{ width: '14rem', ...commonStyles}}
                    value={country}
                    renderInput={(params) => <TextField {...params} label="País" />}
                    noOptionsText='Sem opções'
                    onChange={(event, newValue) => setCountry(newValue)}
                    id="country"
                  />
                  <Autocomplete options={cities} sx={{ width: '14rem', ...commonStyles}}
                    value={city}
                    renderInput={(params) => <TextField {...params} label="Cidade" />}
                    noOptionsText='Sem opções'
                    onChange={(event, newValue) => setCity(newValue)}
                    id="city"
                  />
                  <Autocomplete options={serviceTypes} sx={{ width: '14rem', ...commonStyles}}
                    value={serviceType}
                    renderInput={(params) => <TextField {...params} label="Serviço" />}
                    noOptionsText='Sem opções'
                    onChange={(event, newValue) =>setServiceType(newValue)}
                    id="serviceType"
                  />
                  <div>
                    <TextField label='Preço minímo' sx={{marginTop: '0.5rem', ...commonStyles }} placeholder="Valor em euros (ex: 100)"
                      slotProps={{
                        input: {
                          endAdornment: <InputAdornment position="end">€</InputAdornment>
                        },
                        htmlInput: {
                          maxLength: 6
                        },
                      }}
                      onChange={event => {
                        errors.minCostMessage = '';
                        setMinCost(event.target.value);
                      }}
                      id="minCost"
                    />
                    {errors.minCostMessage && <p tw="text-red-700 text-xs pt-1">{errors.minCostMessage}</p>}
                  </div>
                  <div>
                    <TextField label='Preço máximo' sx={{marginTop: '0.5rem', ...commonStyles }} placeholder="Valor em euros (ex: 750)"
                      slotProps={{
                        input: {
                          endAdornment: <InputAdornment position="end">€</InputAdornment>
                        },
                        htmlInput: {
                          maxLength: 6
                        },
                      }}
                      onChange={event => {
                        errors.maxCostMessage = '';
                        setMaxCost(event.target.value);
                      }}
                      id='maxCost'
                    />
                    {errors.maxCostMessage && <p tw="text-red-700 text-xs pt-1">{errors.maxCostMessage}</p>}
                  </div>
                </div>
                <div
                style={{
                    bottom: '1rem', // Distância do fundo
                    left: '1rem', // Alinha à esquerda com uma margem
                    display: 'flex',
                    gap: '1rem',
                    marginTop: '1rem',
                  }}
                >
                  <Button sx={{
                      backgroundColor: tw`!bg-primary-500`,
                      color: tw`!text-white`,
                      ":hover": tw`hover:!bg-primary-900 transition duration-300`,
                    }}
                    disableRipple
                    onClick={SEARCH}
                  >
                    PESQUISAR
                  </Button>
                  <Button sx={{
                      backgroundColor: tw`!bg-gray-500`,
                      color: tw`!text-white`,
                      ":hover": tw`hover:!bg-gray-600 transition duration-300`,
                    }}
                    disableRipple
                    onClick={CLEAR_INPUTS}
                  >
                    LIMPAR
                  </Button>
                </div>
              </AccordionDetails>
            </Accordion>
          </HeaderRow>
          {tabsKeys.map((tabKey, index) => (
            <AnimationRevealPage key={trigger} direction={animationDirection}>
              <TabContent
                key={index}
                variants={{
                  current: {
                    opacity: 1,
                    scale:1,
                    display: "flex",
                  },
                  hidden: {
                    opacity: 0,
                    scale:0.8,
                    display: "none",
                  }
                }}
                transition={{ duration: 0.4 }}
                initial={activeTab === tabKey ? "current" : "hidden"}
                animate={activeTab === tabKey ? "current" : "hidden"}
              >
                {tabs[tabKey].map((card, index) => (
                  <CardContainer key={index}>
                    <Card className="group" href={card.url} initial="rest" whileHover="hover" animate="rest">
                      <CardImageContainer imageSrc={card.imageSrc}>
                        <CardRatingContainer>
                          <CardRating>
                            <StarIcon />
                            {card.rating}
                          </CardRating>
                          <CardReview>({card.Evaluations})</CardReview>
                        </CardRatingContainer>
                        <CardHoverOverlay
                          variants={{
                            hover: {
                              opacity: 1,
                              height: "auto"
                            },
                            rest: {
                              opacity: 0,
                              height: 0
                            }
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <CardButton>Reservar</CardButton>
                        </CardHoverOverlay>
                      </CardImageContainer>
                      <CardText>
                        <CardTitle>{card.title}</CardTitle>
                        <CardContent title={card.content}>{card.content}</CardContent>
                        <CardPrice>{card.price}</CardPrice>
                      </CardText>
                    </Card>
                  </CardContainer>
                ))}
              </TabContent>
            </AnimationRevealPage>
          ))}
        </ContentWithPaddingXl>
        <DecoratorBlob1 />
        <DecoratorBlob2 />
        <Footer />
      </Container>
    </AnimationRevealPage>
  );
};

/* This function is only there for demo purposes. It populates placeholder cards */
/*const getRandomCards = () => {
  const cards = [
    {
      imageSrc:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
      title: "Chicken Chilled",
      content: "Chicken Main Course",
      price: "$5.99",
      rating: "5.0",
      Avaliações: "87",
      url: "#"
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1582254465498-6bc70419b607?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
      title: "Samsa Beef",
      content: "Fried Mexican Beef",
      price: "$3.99",
      rating: "4.5",
      Avaliações: "34",
      url: "#"
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1565310022184-f23a884f29da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
      title: "Carnet Nachos",
      content: "Chilli Crispy Nachos",
      price: "$3.99",
      rating: "3.9",
      Avaliações: "26",
      url: "#"
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
      title: "Guacamole Mex",
      content: "Mexican Chilli",
      price: "$3.99",
      rating: "4.2",
      Avaliações: "95",
      url: "#"
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1550461716-dbf266b2a8a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
      title: "Chillie Cake",
      content: "Deepfried Chicken",
      price: "$2.99",
      rating: "5.0",
      Avaliações: "61",
      url: "#"
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327??ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
      title: "Nelli",
      content: "Hamburger & Fries",
      price: "$7.99",
      rating: "4.9",
      Avaliações: "89",
      url: "#"
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
      title: "Jalapeno Poppers",
      content: "Crispy Soyabeans",
      price: "$8.99",
      rating: "4.6",
      Avaliações: "12",
      url: "#"
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
      title: "Cajun Chicken",
      content: "Roasted Chicken & Egg",
      price: "$7.99",
      rating: "4.2",
      Avaliações: "19",
      url: "#"
    }
  ];

  // Shuffle array
  return cards.sort(() => Math.random() - 0.5);
}; */
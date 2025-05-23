import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryLink as PrimaryLinkBase } from "components/misc/Links.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
import { ReactComponent as TimeIcon } from "feather-icons/dist/icons/clock.svg";
import { ReactComponent as TrendingIcon } from "feather-icons/dist/icons/trending-up.svg";
import { ReactComponent as ArrowRightIcon } from "images/arrow-right-icon.svg";
import { useNavigate } from "react-router-dom";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const ThreeColumn = tw.div`flex flex-wrap`;
const Column = tw.div``;
const HeadingColumn = tw(Column)`w-full xl:w-1/3`;
const CardColumn = tw(Column)`w-full md:w-1/2 xl:w-1/3 mt-16 xl:mt-0`;

const HeadingInfoContainer = tw.div`text-center xl:text-left max-w-lg xl:max-w-none mx-auto xl:mx-0`;
const HeadingTitle = tw(SectionHeading)`xl:text-left leading-tight`;
const HeadingDescription = tw.p`text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100 mt-8`;
const PrimaryLink = styled(PrimaryLinkBase)`
  ${tw`inline-flex justify-center xl:justify-start items-center mt-8 text-lg`}
  svg {
    ${tw`ml-2 w-5 h-5`}
  }
`;

const Card = tw.div`mx-auto xl:mx-0 xl:ml-auto max-w-sm md:max-w-xs lg:max-w-sm xl:max-w-xs`;
const CardImage = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`h-80 bg-cover bg-center rounded`
]);

const CardText = tw.div`mt-4`;

const CardHeader = tw.div`flex justify-between items-center`;
const CardType = tw.div`text-primary-500 font-bold text-lg`;
const CardPrice = tw.div`font-semibold text-sm text-gray-600`;
const CardPriceAmount = tw.span`font-bold text-gray-800 text-lg`;

const CardTitle = tw.h5`text-xl mt-4 font-bold`;

const CardMeta = styled.div`
  ${tw`flex flex-row flex-wrap justify-between sm:items-center font-semibold tracking-wide text-gray-600 uppercase text-xs`}
`;

const CardMetaFeature = styled.div`
  ${tw`flex items-center mt-4`}
  svg {
    ${tw`w-5 h-5 mr-1`}
  }
`;
const CardAction = tw(PrimaryButtonBase)`w-full mt-8`;

export default () => {
  const [luxuryTravelData, setLuxuryTravelData] = useState([{}]);
  const NAVIGATE = useNavigate();

  useEffect(() => {
    const getLuxuryTravelsData = async () => {
      try {
        const response = await fetch('http://localhost:5000/beaches/luxury')
        const jsonData = await response.json();

        const updatedLuxuryTravelData = jsonData.map(luxuryTravel => ({
          ...luxuryTravel,
          PICTURE: `http://localhost:5000${luxuryTravel.PICTURE}`
        }));
        setLuxuryTravelData(updatedLuxuryTravelData);
      } catch (error) {
        console.log('Fetch Error: ', error);
      };
    };
    getLuxuryTravelsData();
  }, []);

  const cards = luxuryTravelData.length > 1 ? [
    {
      beach_id: luxuryTravelData[0].BEACH_ID,
      imageSrc: luxuryTravelData[0].PICTURE
        /*"https://images.unsplash.com/photo-1553194587-b010d08c6c56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80"*/,
      type: "Beira-Mar",
      pricePerDay: `€${luxuryTravelData[0].RESERVATION_COST}`,
      title: "Viagem à Praia da Rocha com arribas espétaculares",
      trendingText: luxuryTravelData[0].SERVICE_TYPE,
      durationText: "7 Dias",
      locationText: luxuryTravelData[0].COUNTRY_LOCATION
    },
    {
      beach_id: luxuryTravelData[1].BEACH_ID,
      imageSrc: luxuryTravelData[1].PICTURE
        /*"https://images.unsplash.com/photo-1584200186925-87fa8f93be9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80"*/,
      type: "Competição de Surf",
      pricePerDay: `€${luxuryTravelData[1].RESERVATION_COST}`,
      title: "Competição de surf na Praia do Guincho entre amigos",
      trendingText: luxuryTravelData[1].SERVICE_TYPE,
      durationText: "15 dias",
      locationText: luxuryTravelData[1].COUNTRY_LOCATION
    }
  ] : [];

  return (
    <Container>
      <Content>
        <ThreeColumn>
          <HeadingColumn>
            <HeadingInfoContainer>
              <HeadingTitle>Viagens de Luxo</HeadingTitle>
              <HeadingDescription>
              Vive uma experiência inesquecível, com cada detalhe pensado para oferecer luxo e exclusividade. <br /><br />
              Descubre destinos deslumbrantes, acomodações impecáveis e serviços personalizados que superam as tuas expectativas.
              </HeadingDescription>
              <PrimaryLink onClick={() => NAVIGATE('/Beaches.js')}>
                Vê Todas as Praias <ArrowRightIcon />
              </PrimaryLink>
            </HeadingInfoContainer>
          </HeadingColumn>
          {cards.map((card, index) => (
            <CardColumn key={index}>
              <Card>
                <CardImage imageSrc={card.imageSrc} />
                <CardText>
                  <CardHeader>
                    <CardType>{card.type}</CardType>
                    <CardPrice>
                      <CardPriceAmount>{card.pricePerDay}</CardPriceAmount> por dia
                    </CardPrice>
                  </CardHeader>
                  <CardTitle>{card.title}</CardTitle>
                  <CardMeta>
                    <CardMetaFeature>
                      <TrendingIcon /> {card.trendingText}
                    </CardMetaFeature>
                    <CardMetaFeature>
                      <TimeIcon /> {card.durationText}
                    </CardMetaFeature>
                    <CardMetaFeature>
                      <LocationIcon /> {card.locationText}
                    </CardMetaFeature>
                  </CardMeta>
                  <CardAction onClick={() => {
                    NAVIGATE(`/Praia/${card.beach_id}`);
                    window.scrollTo(0, 0);
                  }}>
                    Reserva Agora
                  </CardAction>
                </CardText>
              </Card>
            </CardColumn>
          ))}
        </ThreeColumn>
      </Content>
    </Container>
  );
};

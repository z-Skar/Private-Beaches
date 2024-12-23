import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import EmailIllustrationSrc from "images/email-illustration.svg";
import { validateLifeguardFields } from "validation/validationFunctions";
import { DatePicker } from "@mui/x-date-pickers";
import Header from "components/headers/light.js";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import { TextField } from "@mui/material";
import Profile from "components/my_components/Profile";
import "react-image-crop/dist/ReactCrop.css";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`,
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(SectionHeading)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`

const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`
const Input = tw.input`pl-4 mt-6 first:mt-0 border-2 rounded-sm py-3 focus:border-primary-500 font-medium transition duration-300 text-gray-700 hocus:border-primary-500`
const Textarea = styled(Input).attrs({as: "textarea"})`
  ${tw`h-24`}
`

const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-8`

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
};

export default ({
  subheading = "Vem fazer parte da segurança das pessoas!",
  heading = <>Candidata-te a ser um <span tw="text-primary-500">Salva-Vidas!</span><wbr/></>,
  description = <>Sê a diferença que salva vidas! Como salva-vidas, tu garantes a segurança, prevines acidentes e atuas em resgates com coragem e preparo.<br />Enviaremos um e-mail caso seja aceite com as informações necessárias.</>,
  submitButtonText = "Enviar",
  formAction = "#",
  formMethod = "get",
  textOnLeft = true,
}) => {
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.

  const [lifeguardData, setLifeguardData] = useState({
    NIF: '',
    FULL_NAME: '',
    YEAR_OF_BIRTH: '',
    EMAIL: '',
    CONTACT: ''
  });
  const [date, setDate] = useState('');
  const [error, setError] = useState({});

  const handleDateChange = (inputDate) => {
    if(error.YEAR_OF_BIRTH) setError({...error, YEAR_OF_BIRTH: undefined});
    try {
      inputDate = inputDate.format('YYYY-MM-DD')
    } catch (error) {
      inputDate = ''
    };
    setLifeguardData({
      ...lifeguardData,
      YEAR_OF_BIRTH: inputDate === 'Invalid Date' ? '' : inputDate
    });
  };

  const handleInputChange = (e) => {
    if(error[e.target.name]) {
      setError({
        ...error,
        [e.target.name]: undefined
      });
    };

    setLifeguardData({
      ...lifeguardData,
      [e.target.name]: e.target.value,
    });
  };

  const addLifeguard = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/clients/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
      );
      console.log(response.json());
    } catch (error) {
      console.log('Fetch Error: ', error)
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ERRORS = validateLifeguardFields(lifeguardData);
    if(Object.keys(ERRORS).length > 0) {
      setError(ERRORS);
    } else {
      try {
        // await addLifeguard();
        // document.location.href = 'http://localhost:3000/';
      } catch (error) {
        alert(error);
      };
    };
  };

  return (
    <AnimationRevealPage>
      <Container>
        <Header tw="mt-4"/>
        <TwoColumn tw="pt-10">
          <ImageColumn>
            <Image imageSrc={EmailIllustrationSrc} />
          </ImageColumn>
          <TextColumn textOnLeft={textOnLeft}>
            <TextContent>
              {subheading && <Subheading>{subheading}</Subheading>}
              <Heading>{heading}</Heading>
              {description && <Description>{description}</Description>}
              <Form onSubmit={handleSubmit}>
                <Profile />
                <TextField  name='NIF' label="Número de Identificação Fiscal" onChange={handleInputChange}
                sx={{...commonStyles, '& .MuiInputLabel-root.Mui-focused': {
                      color: tw`text-primary-500`,
                  },
                }} />
                {error.NIF && <p tw="text-red-700 text-xs pl-1 pt-1">{error.NIF}</p>}

                <TextField name='FULL_NAME' label="Nome completo" onChange={handleInputChange}
                  sx={{...commonStyles, '& .MuiInputLabel-root.Mui-focused': {
                    color: tw`text-primary-500`,
                  },
                }} 
                />
                {error.FULL_NAME && <p tw="text-red-700 text-xs pl-1 pt-1">{error.FULL_NAME}</p>}

                <TextField name='EMAIL' label="Endereço de email" onChange={handleInputChange}
                  sx={{...commonStyles, '& .MuiInputLabel-root.Mui-focused': {
                    color: tw`text-primary-500`,
                    },
                  }} 
                />
                {error.EMAIL && <p tw="text-red-700 text-xs pl-1 pt-1">{error.EMAIL}</p>}

                <TextField name='CONTACT' label="Número de telemóvel" onChange={handleInputChange}
                  sx={{...commonStyles, '& .MuiInputLabel-root.Mui-focused': {
                    color: tw`text-primary-500`,
                    },
                  }} 
                />
                {error.CONTACT && <p tw="text-red-700 text-xs pl-1 pt-1">{error.CONTACT}</p>}

                <DatePicker disableFuture format="YYYY-MM-DD" label="Data de nascimento" onChange={handleDateChange}
                  sx={{...commonStyles, '& .MuiInputLabel-root.Mui-focused': {
                    color: tw`text-primary-500`,
                    },
                  }}
                />
                {error.YEAR_OF_BIRTH && <p tw="text-red-700 text-xs pl-1 pt-1">{error.YEAR_OF_BIRTH}</p>}
                <SubmitButton type="submit">{submitButtonText}</SubmitButton>
              </Form>
            </TextContent>
          </TextColumn>
        </TwoColumn>
      </Container>
    </AnimationRevealPage>
  );
};

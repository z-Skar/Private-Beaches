import React, { useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "images/signup-illustration.svg";
import logo from "images/logo192.png";
import googleIconImageSrc from "images/google-icon.png";
import twitterIconImageSrc from "images/twitter-icon.png";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";
import { validateSignUpFields } from "validation/validationFunctions";
import { useNavigate } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";

const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a`cursor-pointer`;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold text-center`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const SocialButtonsContainer = tw.div`flex flex-col items-center`;
const SocialButton = styled.a`
  ${tw`w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
  .iconContainer {
    ${tw`bg-white p-2 rounded-full`}
  }
  .icon {
    ${tw`w-4`}
  }
  .text {
    ${tw`ml-4`}
  }
`;

const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
const DividerText = tw.div`leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;

export default (props) => {
  const { login } = useAuth();
  const NAVIGATE = useNavigate();
  const {
    logoLinkUrl = "/",
    illustrationImageSrc = illustration,
    headingText = "Regista-te na Tropical Dreams",
    socialButtons = [
      {
        iconImageSrc: googleIconImageSrc,
        text: "Registar com o Google",
        url: "https://google.com"
      }
    ],
    submitButtonText = "Registar",
    SubmitButtonIcon = SignUpIcon,
    termsOfServiceUrl = "/TermsOfService.js",
    privacyPolicyUrl = "/PrivacyPolicy.js",
    signInUrl = "/Login.js",
    
  } = props;

  const [clientData, setClientData] = useState({
    FULL_NAME: "",
    EMAIL: "",
    PASSWORD: "",
  });

  let ERRORS = {
    FULL_NAME: '',
    EMAIL: '',
    PASSWORD: ''
  };

  const addClient = async () => {
    try {
      const response = await fetch('http://localhost:5000/clients/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(clientData)
        }
      );

      const data = await response.json();
      if (!response.ok) {
        ERRORS = data;
        setError(ERRORS);
        return;
      };

      const { token, payload: {EMAIL, FULL_NAME, PICTURE}} = data;
      login(token, FULL_NAME, EMAIL, PICTURE);
      NAVIGATE('/');
      window.scrollTo(0, 0);
    } catch (error) {
      console.log('Fetch Error: ', error);
    };
  };

  const [error, setError] = useState({});
  const handleInputChange = (e) => {
    if(error[e.target.name]) {
      setError({
        ...error,
        [e.target.name]: undefined
      });
    };

    setClientData({
      ...clientData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ERRORS = validateSignUpFields(clientData);
    setError(ERRORS);

    const HAS_ERRORS = Object.values(ERRORS).some((error) => error !== "");
    if (HAS_ERRORS) return;

    try {
      await addClient();

    } catch (error) {
      console.log(error);
    };
  };

  return (
    <AnimationRevealPage>
      <Container>
        <Content>
          <MainContainer>
            <LogoLink onClick={() => NAVIGATE('/')}>
              <LogoImage src={logo} />
            </LogoLink>
            <MainContent>
              <Heading>{headingText}</Heading>
              <FormContainer>
                <SocialButtonsContainer>
                  {socialButtons.map((socialButton, index) => (
                    <SocialButton key={index} href={socialButton.url}>
                      <span className="iconContainer">
                        <img src={socialButton.iconImageSrc} className="icon" alt="" />
                      </span>
                      <span className="text">{socialButton.text}</span>
                    </SocialButton>
                  ))}
                </SocialButtonsContainer>
                <DividerTextContainer>
                  <DividerText>Ou regista-te com o teu e-mail</DividerText>
                </DividerTextContainer>
                <Form onSubmit={handleSubmit}>
                  <Input
                    type="text"
                    name='FULL_NAME'
                    placeholder="Nome Completo"
                    onChange={handleInputChange}
                  />
                  {error.FULL_NAME && <p tw="text-red-700 text-xs pl-1 pt-1">{error.FULL_NAME}</p>}
                  <Input
                    name="EMAIL"
                    placeholder="Email"
                    onChange={handleInputChange}
                  />
                  {error.EMAIL && <p tw="text-red-700 text-xs pl-1 pt-1">{error.EMAIL}</p>}
                  <Input
                    type="password"
                    name='PASSWORD'
                    placeholder="Password"
                    onChange={handleInputChange}
                  />
                  {error.PASSWORD && <p tw="text-red-700 text-xs pl-1 pt-1">{error.PASSWORD}</p>}
                  <SubmitButton type="submit">
                    <SubmitButtonIcon className="icon" />
                    <span className="text">{submitButtonText}</span>
                  </SubmitButton>
                  <p tw="mt-6 text-xs text-gray-600 text-center">
                    Concordo em cumprir os {" "}
                    <a onClick={() => NAVIGATE(termsOfServiceUrl)} tw="border-b border-gray-500 border-dotted cursor-pointer">
                      Termos de Serviço
                    </a>{" "}
                    e a{" "}
                    <a onClick={() => NAVIGATE(privacyPolicyUrl)} tw="border-b border-gray-500 border-dotted cursor-pointer">
                      Política de Privacidade
                    </a>{" "}
                    da Tropical Dreams
                  </p>

                  <p tw="mt-8 text-sm text-gray-600 text-center">
                    Já tens uma conta?{" "}
                    <a onClick={() => NAVIGATE(signInUrl)} tw="border-b border-gray-500 border-dotted cursor-pointer">
                      Entrar
                    </a>
                  </p>
                </Form>
              </FormContainer>
            </MainContent>
          </MainContainer>
          <IllustrationContainer>
            <IllustrationImage imageSrc={illustrationImageSrc} />
          </IllustrationContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
  );
};
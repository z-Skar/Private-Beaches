import React, { useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import {css} from "styled-components/macro"; //eslint-disable-line
import illustration from "images/login-illustration.svg";
import logo from "images/logo192.png";
import googleIconImageSrc from "images/google-icon.png";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import { useState } from "react";
import { validateLoginFields } from "validation/validationFunctions";
import { useAuth } from "contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex flex-col justify-center`;
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
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;

export default ({
  logoLinkUrl = "/",
  illustrationImageSrc = illustration,
  headingText = (
    <>
      Faz Login na <br />
      Tropical Dreams
    </>
  ),
  socialButtons = [
    {
      iconImageSrc: googleIconImageSrc,
      text: "Login com o Google",
      url: "https://google.com"
    },
  ],
  submitButtonText = "Login",
  SubmitButtonIcon = LoginIcon,
  forgotPasswordUrl = "#",
  signupUrl = "/Signup.js",

}) => {
  const { login } = useAuth();

  const NAVIGATE = useNavigate();
  const [loginData, setLoginData] = useState({
    EMAIL: '',
    PASSWORD: ''
  });

  const [error, setError] = useState({
    EMAIL: "",
    PASSWORD: "",
  });

  let ERRORS = {
    EMAIL: '',
    PASSWORD: ''
  };

  const handleInputChange = (e) => {
    if(error[e.target.name]) {
      setError({
        ...error,
        [e.target.name]: undefined
      });
    };

    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const Login = async () => {
    try {
      const response = await fetch('http://localhost:5000/clients/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginData)
        }
      );

      const data = await response.json();
      if (!response.ok) {
        ERRORS = data;
        setError(ERRORS);
        return;
      };

      const { token, payload: {CLIENT_ID, EMAIL, FULL_NAME, PICTURE, ROLE }} = data;
      login({
        newToken: token,
        newClientID: CLIENT_ID,
        newFullName: FULL_NAME,
        newEmail: EMAIL,
        newProfilePicture: PICTURE,
        newRole: ROLE
      });
    } catch (error) {
      console.log('Fetch Error: ', error);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    ERRORS = validateLoginFields(loginData)
    setError(ERRORS);

    const HAS_ERRORS = Object.values(ERRORS).some((error) => error !== "");
    if (HAS_ERRORS) return;

    try {
      const RESPONSE = await Login();
      if (ERRORS.EMAIL === '' && ERRORS.PASSWORD === '') {
        NAVIGATE('/');
        window.scrollTo(0, 0);
      };
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
                <Form onSubmit={handleSubmit}>
                  <Input value={loginData.EMAIL} type="text" placeholder="Email" name='EMAIL' onChange={handleInputChange} />
                  {error.EMAIL && <p tw="text-red-700 text-xs pl-1 pt-1">{error.EMAIL}</p>}
                  <Input value={loginData.PASSWORD} type="password" placeholder="Password" name='PASSWORD' onChange={handleInputChange} />
                  {error.PASSWORD && <p tw="text-red-700 text-xs pl-1 pt-1">{error.PASSWORD}</p>}
                  <SubmitButton type="submit">
                    <SubmitButtonIcon className="icon" />
                    <span className="text">{submitButtonText}</span>
                  </SubmitButton>
                </Form>
                <p tw="mt-8 text-sm text-gray-600 text-center">
                  Não tens uma conta?{" "}
                  <a onClick={() => NAVIGATE('/Signup.js')} tw="border-b border-gray-500 border-dotted cursor-pointer">
                    Registar
                  </a>
                </p>
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

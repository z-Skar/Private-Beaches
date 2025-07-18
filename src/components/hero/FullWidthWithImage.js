import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

import Header, { LogoLink, NavLinks, NavLink as NavLinkBase } from "../headers/light.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "contexts/AuthContext.js";

const StyledHeader = styled(Header)`
  ${tw`justify-between`}
  ${LogoLink} {
    ${tw`mr-8 pb-0`}
  }
`;

const NavLink = tw(NavLinkBase)`
  sm:text-sm sm:mx-6
`;

const Container = tw.div`relative -mx-8 -mt-8`;
const TwoColumn = tw.div`flex flex-col lg:flex-row bg-gray-100`;
const LeftColumn = tw.div`ml-8 mr-8 xl:pl-10 py-8`;
const RightColumn = styled.div`
  background-image: url("https://images.unsplash.com/photo-1551918120-9739cb430c6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&width=1440&height=1024&q=75");
  ${tw`bg-green-500 bg-cover bg-center xl:ml-24 h-96 lg:h-auto lg:w-1/2 lg:flex-1`}
`;

const Content = tw.div`mt-24 lg:mt-24 lg:mb-24 flex flex-col sm:items-center lg:items-stretch`;
const Heading = tw.h1`text-3xl sm:text-5xl md:text-6xl lg:text-5xl font-black leading-none`;
const Paragraph = tw.p`max-w-md my-8 lg:my-5 lg:my-8 sm:text-lg lg:text-base xl:text-lg leading-loose`;

const Actions = styled.div`
  ${tw`mb-8 lg:mb-0`}
  .action {
    ${tw`text-center inline-block w-full sm:w-48 py-4 font-semibold tracking-wide rounded hocus:outline-none focus:shadow-outline transition duration-300`}
  }
  .primaryAction {
    ${tw`bg-primary-500 text-gray-100 hover:bg-primary-700`}
  }
  .secondaryAction {
    ${tw`mt-4 sm:mt-0 sm:ml-4 bg-gray-300 text-gray-700 hover:bg-gray-400 hover:text-gray-800`}
  }
`;



export default ({
  heading = (
    <>
      Praias Privadas
      <wbr />
      <br />
      <span>{' no '}</span>
      <span tw="text-primary-500">mundo inteiro!</span>
    </>
  ),
  description = "Temos estado no negócio de Praias Privadas durante 5 anos. Nós lhe garantimos que irá adorar estar connosco e escolher os nossos serviços.",
  primaryActionUrl = "/Login.js",
  primaryActionText = "Faz Login",
  secondaryActionUrl = "/Beaches.js",
  secondaryActionText = "Pesquisa Praias",
}) => {
  const { token, clientID, role } = useAuth();

  const NAVIGATE = useNavigate();
  const navigateTo = (destination) => {
    NAVIGATE(destination);
    window.scrollTo(0, 0);
  };

  const navLinks = [
    <NavLinks key={1}>
      {token && role === "Administrador" && <NavLink onClick={() => navigateTo('/Admin.js')}>Admin</NavLink>}
      {token && <NavLink onClick={() => navigateTo(`/Perfil/${clientID}`)}>Perfil</NavLink>}
      {<NavLink onClick={() => navigateTo(`/Sobre`)}>Sobre</NavLink>}
      {<NavLink onClick={() => navigateTo(`/Beaches.js`)}>Praias</NavLink>}
    </NavLinks>
  ];

  return (
    <Container>
      <TwoColumn>
        <LeftColumn>
          <StyledHeader links={navLinks} collapseBreakpointClass="sm" />
          <Content>
            <Heading>{heading}</Heading>
            <Paragraph>{description}</Paragraph>
            <Actions>
              {!token ? (
                <>
                  <button onClick={() => navigateTo(primaryActionUrl)} className="action primaryAction">
                    {primaryActionText}
                  </button>
                  <button onClick={() => navigateTo(secondaryActionUrl)} className="action secondaryAction">
                    {secondaryActionText}
                  </button>
                </>
                ) : (
                  <button onClick={() => navigateTo(secondaryActionUrl)} className="action primaryAction">
                    {secondaryActionText}
                  </button>
                )
              }
            </Actions>
          </Content>
        </LeftColumn>
        <RightColumn></RightColumn>
      </TwoColumn>
    </Container>
  );
};

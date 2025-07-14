import React from "react";
import tw from "twin.macro";
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import Logo from '../images/logo192.png';
import People from '../images/people.png';
import Reservation from '../images/reservation.png';
import Admin from '../images/admin.png';

import AnimationRevealPage from "helpers/AnimationRevealPage.js";

const Container = tw.div`max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-10`;
const Section = tw.section`py-20 lg:py-24`;
const Heading = tw.h2`text-4xl lg:text-5xl font-black text-center text-primary-500 mb-6`;
const Subheading = tw.p`text-center max-w-2xl mx-auto text-lg text-gray-700 mb-12`;
const Content = tw.div`grid gap-12 lg:grid-cols-2 items-center`;
const Image = tw.img`h-auto h-[12rem] w-auto mx-auto rounded-lg shadow-lg`;
const Text = tw.div`text-gray-800`;
const Title = tw.h3`text-2xl font-bold mb-4 text-primary-500`;
const Paragraph = tw.p`mb-6 text-base leading-relaxed`;

export default function Sobre() {
  return (
    <AnimationRevealPage>
      <Container>
        <Header />
        <Section>
          <Heading>Sobre a Tropical Dreams</Heading>
          <Subheading>
            Um sistema inovador para gestão de praias, salva-vidas e reservas em tempo real. 
            Criado no âmbito da PAP, com foco em tecnologia, segurança e experiência de utilizador.
          </Subheading>
          <Content>
            <Image src={Logo} alt="Tropical Dreams" />
            <Text>
              <Title>Quem Somos</Title>
              <Paragraph>
                A <strong>Tropical Dreams</strong> nasceu como um projeto da PAP (Prova de Aptidão Profissional), 
                com o objetivo de ser um serviço perfeito para a gestão de praias e as suas reservas correspondentes criadas pelos seus clientes.<br/>
              </Paragraph>
              <Paragraph>
                O projeto nasceu de dois templates que utilizam tecnologias modernas como o <strong>React</strong> e a partir daí as páginas foram sendo criadas.
                <br/> Este projeto conta com a ajuda do <strong>Tailwind CSS</strong> para a aparência das páginas, e o <strong>MYSQL[MariaDB]</strong> para o fornecimento dos dados.
              </Paragraph>
            </Text>
          </Content>
        </Section>

        <Section>
          <Content>
            <Text>
              <Title>Registo de Clientes</Title>
              <Paragraph>
                Os utilizadores podem registar as suas contas para tornarem-se clientes da aplicação, assim, tendo acesso ao painel de reserva de praias tanto como o da gestão do perfil da sua conta.
              </Paragraph>
              <Paragraph>
                Quando os clientes entram no painel de uma praia ele podem agora avaliar a mesma, permitindo uma visualização rápida da opinião geral dos clientes acerca de uma praia específica. <br />
              </Paragraph>
            </Text>
            <Image src={People} alt="Gestão de salva-vidas" />
          </Content>
        </Section>

        <Section>
          <Content>
            <Image src={Reservation} alt="Família na praia" />
            <Text>
              <Title>Reservas Disponíveis!</Title>
              <Paragraph>
               O da Tropical Dreams permite a filtragem de praias de acordo com as preferências dos seus clientes, assim que um utilizador tiver a sua conta criada, ele pode reservar uma praia por um período de tempo.
              </Paragraph>
              <Paragraph>
                As reservas têm uma data de início e uma data de fim, caso a data de ínicio ainda não tenha cheagado, o cliente pode aceder à sua conta e cancelar a sua reserva na secção das reservas que criou.
              </Paragraph>
            </Text>
          </Content>
        </Section>

        <Section>
          <Content>
            <Text>
              <Title>Foco na Experiência e Segurança</Title>
              <Paragraph>
                A <strong>Tropical Dreams</strong> valoriza tanto a experiência do utilizador como a fiabilidade da informação. 
                O dono do negócio, ou administrador, pode criar, editar e consultar todas as informações relacionadas à Tropical Dreams, garantindo que as informações estejam sempre coerentes e atualizadas.
              </Paragraph>
              <Paragraph>
                Para auxiliar o administrador, a aplicação conta com um painel administrativo, onde ele pode executar as ações mencionadas acima, além de poder exportar os dados para Excel para análise posterior.
              </Paragraph>
            </Text>
            <Image src={Admin} alt="Segurança e gestão" />
          </Content>
        </Section>

        <Section tw="text-center">
          <Heading>Obrigado por visitar a Tropical Dreams!</Heading>
          <Subheading>
            Um projeto criado com dedicação, esforço e várias diretas — para um futuro mais seguro e organizado nas nossas praias!
          </Subheading>
        </Section>
      </Container>
      <Footer />
    </AnimationRevealPage>
  );
}
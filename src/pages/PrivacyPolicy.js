import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import { SectionHeading } from "components/misc/Headings";

const HeadingRow = tw.div`flex`;
const Heading = tw(SectionHeading)`text-gray-900 mb-10`;
const Text = styled.div`
  ${tw`text-lg  text-gray-800`}
  p {
    ${tw`mt-2 leading-loose`}
  }
  h1 {
    ${tw`text-3xl font-bold mt-10`}
  }
  h2 {
    ${tw`text-2xl font-bold mt-8`}
  }
  h3 {
    ${tw`text-xl font-bold mt-6`}
  }
  ul {
    ${tw`list-disc list-inside`}
    li {
      ${tw`ml-2 mb-3`}
      p {
        ${tw`mt-0 inline leading-normal`}
      }
    }
  }
`;
export default ({ headingText = "Privacy Policy" }) => {
  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <ContentWithPaddingXl>
          <HeadingRow>
            <Heading>{headingText}</Heading>
          </HeadingRow>
          <Text>
            <p>Última atualização: 21 de abril de 2023</p>

            <p>
              Esta Política de Privacidade descreve as nossas políticas e procedimentos sobre a recolha, utilização e divulgação das suas informações quando utiliza o Serviço e informa-o sobre os seus direitos de privacidade e como a lei o protege.
            </p>

            <p>
              Utilizamos os seus dados pessoais para fornecer e melhorar o Serviço. Ao utilizar o Serviço, concorda com a recolha e utilização das informações de acordo com esta Política de Privacidade.
            </p>

            <h1>Interpretação e Definições</h1>
            <h2>Interpretação</h2>
            <p>
              As palavras cuja inicial é maiúscula têm significados definidos nas condições seguintes.
            </p>
            <p>
              As definições seguintes terão o mesmo significado, independentemente de aparecerem no singular ou no plural.
            </p>

            <h2>Definições</h2>
            <p>Para os fins desta Política de Privacidade:</p>
            <ul>
              <li>
                <p>
                  <strong>Você</strong> refere-se ao indivíduo que acede ou utiliza o Serviço, ou à empresa ou outra entidade legal em nome da qual esse indivíduo está a aceder ou a utilizar o Serviço, conforme aplicável.
                </p>
              </li>
              <li>
                <p>
                  <strong>Empresa</strong> (referida como "a Empresa", "Nós", "Nos" ou "Nosso" neste Acordo) refere-se a Tropical Dreams.
                </p>
              </li>
              <li>
                <strong>Afiliada</strong> significa uma entidade que controla, é controlada por ou está sob controlo comum com uma parte, onde "controlo" significa a propriedade de 50% ou mais das ações, participações ou outros títulos com direito de voto na eleição de diretores ou outra autoridade de gestão.
              </li>
              <li>
                <strong>Conta</strong> refere-se a uma conta única criada para si para aceder ao nosso Serviço ou partes do nosso Serviço.
              </li>
              <li>
                <strong>Website</strong> refere-se a Tropical Dreams, acessível em https://TropicalDreams.com
              </li>
              <li>
                <strong>Serviço</strong> refere-se ao Website.
              </li>
              <li>
                <strong>País</strong> refere-se a: Maharashtra, Índia.
              </li>
              <li>
                <p>
                  <strong>Fornecedor de Serviços</strong> significa qualquer pessoa física ou jurídica que processe os dados em nome da Empresa. Refere-se a empresas ou indivíduos terceiros contratados pela Empresa para facilitar o Serviço, fornecer o Serviço em nome da Empresa, realizar serviços relacionados com o Serviço ou ajudar a Empresa a analisar como o Serviço é utilizado.
                </p>
              </li>
              <li>
                <strong>Serviço de Redes Sociais de Terceiros</strong> refere-se a qualquer website ou rede social através do qual um utilizador pode iniciar sessão ou criar uma conta para usar o Serviço.
              </li>
              <li>
                <p>
                  <strong>Dados Pessoais</strong> refere-se a qualquer informação relacionada com uma pessoa identificada ou identificável.
                </p>
              </li>
              <li>
                <strong>Cookies</strong> são pequenos ficheiros colocados no seu computador, dispositivo móvel ou qualquer outro dispositivo por um website, contendo detalhes do seu histórico de navegação nesse website, entre outras utilizações.
              </li>
              <li>
                <strong>Dados de Utilização</strong> refere-se aos dados recolhidos automaticamente, gerados pelo uso do Serviço ou pela própria infraestrutura do Serviço (por exemplo, a duração de uma visita a uma página).
              </li>
            </ul>

            <h1>Recolha e Utilização dos seus Dados Pessoais</h1>
            <h2>Tipos de Dados Recolhidos</h2>

            <h3>Dados Pessoais</h3>
            <p>
              Durante a utilização do nosso Serviço, podemos pedir-lhe que nos forneça certas informações pessoais identificáveis que podem ser utilizadas para o contactar ou identificar. As informações pessoais identificáveis podem incluir, mas não estão limitadas a:
            </p>
            <ul>
              <li>Endereço de email</li>
              <li>Nome próprio e apelido</li>
              <li>Número de telefone</li>
              <li>Endereço, Estado, Província, Código Postal, Cidade</li>
              <li>Dados de Utilização</li>
            </ul>
            <h3>Dados de Utilização</h3>
            <p>Os Dados de Utilização são recolhidos automaticamente durante a utilização do Serviço.</p>
            <p>
              Os Dados de Utilização podem incluir informações como o endereço IP do seu dispositivo (por exemplo, endereço IP), tipo de navegador, versão do navegador, as páginas do nosso Serviço que visita, a data e hora da sua visita, o tempo despendido nessas páginas, identificadores únicos de dispositivos e outros dados de diagnóstico.
            </p>
            <p>
              Quando acede ao Serviço através de um dispositivo móvel, podemos recolher automaticamente certas informações, incluindo, mas não limitado a, o tipo de dispositivo móvel que utiliza, o ID exclusivo do seu dispositivo móvel, o endereço IP do seu dispositivo móvel, o sistema operativo do seu dispositivo móvel, o tipo de navegador de Internet móvel que utiliza, identificadores exclusivos de dispositivos e outros dados de diagnóstico.
            </p>
            <p>
              Podemos também recolher informações que o seu navegador envia sempre que visita o nosso Serviço ou quando acede ao Serviço através de um dispositivo móvel.
            </p>

            <h3>Tecnologias de Rastreamento e Cookies</h3>
            <p>
              Utilizamos Cookies e tecnologias de rastreamento semelhantes para monitorizar a atividade no nosso Serviço e armazenar certas informações. As tecnologias de rastreamento utilizadas incluem beacons, tags e scripts para recolher e rastrear informações e melhorar e analisar o nosso Serviço.
            </p>
            <p>
              Pode configurar o seu navegador para recusar todos os Cookies ou para indicar quando um Cookie está a ser enviado. No entanto, se não aceitar Cookies, poderá não conseguir usar algumas partes do nosso Serviço.
            </p>
            <p>
              Os Cookies podem ser "Persistentes" ou "de Sessão". Cookies persistentes permanecem no seu computador ou dispositivo móvel quando está offline, enquanto Cookies de sessão são apagados assim que fecha o seu navegador. Saiba mais sobre cookies: <a href="https://www.termsfeed.com/blog/cookies/">Tudo Sobre Cookies</a>.
            </p>
            <p>Usamos tanto Cookies de sessão como Cookies persistentes para os fins descritos abaixo:</p>
            <ul>
              <li>
                <p>
                  <strong>Cookies Necessários / Essenciais</strong>
                </p>
                <p>Tipo: Cookies de Sessão</p>
                <p>Administrados por: Nós</p>
                <p>
                  Finalidade: Estes Cookies são essenciais para lhe fornecer serviços disponíveis através do Website e permitir que utilize algumas das suas funcionalidades. Ajudam a autenticar utilizadores e prevenir o uso fraudulento de contas de utilizadores. Sem estes Cookies, os serviços que solicitou não podem ser fornecidos, e só utilizamos estes Cookies para lhe fornecer esses serviços.
                </p>
              </li>
              <li>
                <p>
                  <strong>Cookies de Aceitação da Política de Cookies</strong>
                </p>
                <p>Tipo: Cookies Persistentes</p>
                <p>Administrados por: Nós</p>
                <p>Finalidade: Estes Cookies identificam se os utilizadores aceitaram o uso de cookies no Website.</p>
              </li>
              <li>
                <p>
                  <strong>Cookies de Funcionalidade</strong>
                </p>
                <p>Tipo: Cookies Persistentes</p>
                <p>Administrados por: Nós</p>
                <p>
                  Finalidade: Estes Cookies permitem-nos lembrar as escolhas que faz ao utilizar o Website, como lembrar os seus detalhes de login ou a sua preferência de idioma. O objetivo destes Cookies é proporcionar-lhe uma experiência mais personalizada e evitar que tenha de reinserir as suas preferências cada vez que utiliza o Website.
                </p>
              </li>
            </ul>
            <p>
              Para mais informações sobre os cookies que utilizamos e as suas escolhas em relação a cookies, consulte a nossa Política de Cookies.
            </p>

            <h2>Utilização dos Seus Dados Pessoais</h2>
            <p>A Empresa pode utilizar os Dados Pessoais para os seguintes fins:</p>
            <ul>
              <li>
                <strong>Para fornecer e manter o nosso Serviço</strong>, incluindo para monitorizar a utilização do nosso Serviço.
              </li>
              <li>
                <strong>Para gerir a sua Conta:</strong> para gerir o seu registo como utilizador do Serviço. Os Dados Pessoais que fornecer podem dar-lhe acesso a diferentes funcionalidades do Serviço disponíveis para si como utilizador registado.
              </li>
              <li>
                <strong>Para a execução de um contrato:</strong> o desenvolvimento, cumprimento e execução do contrato de compra dos produtos, itens ou serviços que adquiriu ou de qualquer outro contrato connosco através do Serviço.
              </li>
              <li>
                <strong>Para o contactar:</strong> Para o contactar por email, chamadas telefónicas, SMS ou outras formas equivalentes de comunicação eletrónica, como notificações push de aplicações móveis sobre atualizações ou comunicações informativas relacionadas com as funcionalidades, produtos ou serviços contratados, incluindo atualizações de segurança, quando necessário ou razoável para a sua implementação.
              </li>
              <li>
                <strong>Para lhe fornecer</strong> notícias, ofertas especiais e informações gerais sobre outros bens, serviços e eventos que oferecemos, semelhantes aos que já adquiriu ou sobre os quais se informou, a menos que tenha optado por não receber essas informações.
              </li>
              <li>
                <strong>Para gerir os seus pedidos:</strong> Para atender e gerir os seus pedidos feitos a nós.
              </li>
            </ul>

            <p>Podemos partilhar as suas informações pessoais nas seguintes situações:</p>
            <ul>
              <li>
                <strong>Com Fornecedores de Serviços:</strong> Podemos partilhar as suas informações pessoais com Fornecedores de Serviços para monitorizar e analisar a utilização do nosso Serviço, para o contactar.
              </li>
              <li>
                <strong>Para Transferências de Negócios:</strong> Podemos partilhar ou transferir as suas informações pessoais em conexão com, ou durante negociações de, qualquer fusão, venda de ativos da Empresa, financiamento ou aquisição de toda ou parte do nosso negócio por outra empresa.
              </li>
              <li>
                <strong>Com Afiliadas:</strong> Podemos partilhar as suas informações com as nossas afiliadas, caso em que exigiremos que essas afiliadas cumpram esta Política de Privacidade. As afiliadas incluem a nossa empresa-mãe e quaisquer outras subsidiárias, parceiros de joint venture ou outras empresas que controlamos ou que estão sob controlo comum connosco.
              </li>
              <li>
                <strong>Com Parceiros de Negócio:</strong> Podemos partilhar as suas informações com os nossos parceiros de negócios para lhe oferecer determinados produtos, serviços ou promoções.
              </li>
              <li>
                <strong>Com outros utilizadores:</strong> Quando partilha informações pessoais ou interage nas áreas públicas com outros utilizadores, essas informações podem ser vistas por todos os utilizadores e podem ser distribuídas publicamente fora. Se interagir com outros utilizadores ou se registar através de um Serviço de Redes Sociais de Terceiros, os seus contactos nesse serviço poderão ver o seu nome, perfil, fotografias e descrição da sua atividade. Da mesma forma, outros utilizadores poderão ver descrições da sua atividade, comunicar consigo e visualizar o seu perfil.
              </li>
            </ul>
            <h2>Retenção dos Seus Dados Pessoais</h2>
            <p>
              A Empresa reterá seus Dados Pessoais apenas pelo tempo necessário para os fins estabelecidos nesta Política de Privacidade. Reteremos e utilizaremos seus Dados Pessoais na medida necessária para cumprir nossas obrigações legais (por exemplo, se formos obrigados a reter seus dados para cumprir leis aplicáveis), resolver disputas e fazer cumprir nossos acordos e políticas legais.
            </p>
            <p>
              A Empresa também reterá Dados de Uso para fins de análise interna. Os Dados de Uso geralmente são mantidos por um período mais curto, exceto quando esses dados são usados para fortalecer a segurança ou melhorar a funcionalidade do Nosso Serviço, ou quando somos legalmente obrigados a reter esses dados por períodos mais longos.
            </p>

            <h2>Transferência dos Seus Dados Pessoais</h2>
            <p>
              Suas informações, incluindo Dados Pessoais, são processadas nos escritórios operacionais da Empresa e em qualquer outro lugar onde as partes envolvidas no processamento estejam localizadas. Isso significa que essas informações podem ser transferidas para — e mantidas em — computadores localizados fora do seu estado, província, país ou outra jurisdição governamental onde as leis de proteção de dados podem diferir das da sua jurisdição.
            </p>
            <p>
              Seu consentimento com esta Política de Privacidade, seguido pelo envio de tais informações, representa seu acordo com essa transferência.
            </p>
            <p>
              A Empresa tomará todas as medidas razoavelmente necessárias para garantir que seus dados sejam tratados de forma segura e de acordo com esta Política de Privacidade, e nenhuma transferência dos seus Dados Pessoais ocorrerá para uma organização ou país, a menos que haja controles adequados em vigor, incluindo a segurança de seus dados e outras informações pessoais.
            </p>

            <h2>Divulgação dos Seus Dados Pessoais</h2>
            <h3>Transações Comerciais</h3>
            <p>
              Se a Empresa estiver envolvida em uma fusão, aquisição ou venda de ativos, seus Dados Pessoais poderão ser transferidos. Forneceremos um aviso antes que seus Dados Pessoais sejam transferidos e fiquem sujeitos a uma Política de Privacidade diferente.
            </p>
            <h3>Cumprimento da Lei</h3>
            <p>
              Em determinadas circunstâncias, a Empresa pode ser obrigada a divulgar seus Dados Pessoais se exigido por lei ou em resposta a solicitações válidas de autoridades públicas (por exemplo, um tribunal ou agência governamental).
            </p>
            <h3>Outros Requisitos Legais</h3>
            <p>
              A Empresa pode divulgar seus Dados Pessoais na crença de boa-fé de que tal ação é necessária para:
            </p>
            <ul>
              <li>Cumprir uma obrigação legal</li>
              <li>Proteger e defender os direitos ou propriedade da Empresa</li>
              <li>Prevenir ou investigar possíveis irregularidades relacionadas ao Serviço</li>
              <li>Proteger a segurança pessoal dos Usuários do Serviço ou do público</li>
              <li>Proteger contra responsabilidade legal</li>
            </ul>

            <h2>Segurança dos Seus Dados Pessoais</h2>
            <p>
              A segurança dos seus Dados Pessoais é importante para nós, mas lembre-se de que nenhum método de transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro. Embora nos esforcemos para usar meios comercialmente aceitáveis para proteger seus Dados Pessoais, não podemos garantir sua segurança absoluta.
            </p>

            <h1>Privacidade de Crianças</h1>
            <p>
              Nosso Serviço não se destina a menores de 13 anos. Não coletamos intencionalmente informações pessoalmente identificáveis de menores de 13 anos. Se você for pai, mãe ou responsável e souber que seu filho nos forneceu Dados Pessoais, entre em contato conosco. Se tomarmos conhecimento de que coletamos Dados Pessoais de menores de 13 anos sem a verificação do consentimento dos pais, tomaremos medidas para remover essas informações de nossos servidores.
            </p>
            <p>
              Se precisarmos confiar no consentimento como base legal para processar suas informações e seu país exigir o consentimento de um responsável, poderemos exigir o consentimento dos pais antes de coletar e usar essas informações.
            </p>

            <h1>Links para Outros Sites</h1>
            <p>
              Nosso Serviço pode conter links para outros sites que não são operados por nós. Se você clicar em um link de terceiros, será direcionado para o site desse terceiro. Recomendamos fortemente que você revise a Política de Privacidade de cada site que visitar.
            </p>
            <p>
              Não temos controle nem assumimos responsabilidade pelo conteúdo, políticas de privacidade ou práticas de sites ou serviços de terceiros.
            </p>

            <h1>Alterações a Esta Política de Privacidade</h1>
            <p>
              Podemos atualizar nossa Política de Privacidade de tempos em tempos. Notificaremos você sobre quaisquer alterações publicando a nova Política de Privacidade nesta página.
            </p>
            <p>
              Avisaremos você por e-mail e/ou por meio de um aviso destacado em nosso Serviço antes que a alteração se torne efetiva e atualizaremos a data de "Última atualização" no topo desta Política de Privacidade.
            </p>
            <p>
              Recomendamos que você revise esta Política de Privacidade periodicamente para verificar quaisquer alterações. As alterações nesta Política de Privacidade são efetivas quando publicadas nesta página.
            </p>
          </Text>
        </ContentWithPaddingXl>
      </Container>
      <Footer />
    </AnimationRevealPage>
  );
};

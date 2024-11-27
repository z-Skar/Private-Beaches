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

export default ({ headingText = "Termos e Condições" }) => {
  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <ContentWithPaddingXl>
          <HeadingRow>
            <Heading>{headingText}</Heading>
          </HeadingRow>
          <Text>

            <p>Última atualização: 21 de Abril de 2023</p>

            <p>Por favor, leia atentamente estes termos e condições antes de utilizar o nosso Serviço.</p>

            <h1>Interpretação e Definições</h1>
            <h2>Interpretação</h2>
            <p>
              As palavras cujo inicial está em maiúscula têm os significados definidos nas seguintes condições.
            </p>
            <p>
              As seguintes definições terão o mesmo significado, independentemente de aparecerem no singular ou no plural.
            </p>

            <h2>Definições</h2>
            <p>Para os efeitos destes Termos e Condições:</p>
            <ul>
              <li>
                <strong>Afiliada</strong> significa uma entidade que controla, é controlada por ou está sob controle comum
                com uma parte, sendo que "controle" significa a posse de 50% ou mais das ações, participação acionária ou outros
                títulos com direito a voto para eleição de diretores ou outra autoridade de gestão.
              </li>
              <li>
                <strong>Empresa</strong> (referida como "a Empresa", "Nós", "Nos" ou "Nosso" neste Acordo)
                refere-se à Tropical Dreams Inc., Navi Mumbai.
              </li>
              <li>
                <strong>País</strong> refere-se a: Maharashtra, Índia
              </li>
              <li>
                <strong>Serviço</strong> refere-se ao Website.
              </li>
              <li>
                <strong>Termos e Condições</strong> (também referidos como "Termos") significam estes Termos e Condições que
                formam o acordo completo entre o utilizador e a Empresa relativamente ao uso do Serviço.
              </li>
              <li>
                <strong>Serviço de Mídia Social de Terceiros</strong> significa quaisquer serviços ou conteúdos (incluindo dados,
                informações, produtos ou serviços) fornecidos por terceiros que possam ser exibidos, incluídos ou disponibilizados pelo Serviço.
              </li>
              <li>
                <strong>Website</strong> refere-se ao Tropical Dreams, acessível através de https://Tropical Dreams.com
              </li>
              <li>
                <strong>Utilizador</strong> significa o indivíduo que acede ou utiliza o Serviço, ou a empresa, ou outra entidade legal em nome da qual
                tal indivíduo acede ou utiliza o Serviço, conforme aplicável.
              </li>
            </ul>

            <h1>Reconhecimento</h1>
            <p>
              Estes são os Termos e Condições que regem o uso deste Serviço e o acordo que opera entre o utilizador e a Empresa. Estes Termos e Condições definem os direitos e obrigações de todos os usuários relativamente ao uso do Serviço.
            </p>
            <p>
              O seu acesso e utilização do Serviço estão condicionados à aceitação e conformidade com estes Termos e Condições. Estes Termos e Condições aplicam-se a todos os visitantes, usuários e outros que acedam ou utilizem o Serviço.
            </p>
            <p>
              Ao aceder ou utilizar o Serviço, o utilizador concorda em ficar vinculado a estes Termos e Condições. Se o utilizador discordar de qualquer parte destes Termos e Condições, não poderá aceder ao Serviço.
            </p>
            <p>
              O seu acesso e utilização do Serviço estão também condicionados à aceitação e conformidade com a Política de Privacidade da Empresa. A nossa Política de Privacidade descreve as nossas políticas e procedimentos sobre a coleta,
              uso e divulgação das suas informações pessoais quando o utilizador utiliza a Aplicação ou o Website e informa-o sobre os seus direitos de privacidade e como a lei o protege. Por favor, leia cuidadosamente a nossa Política de Privacidade antes de usar o nosso Serviço.
            </p>

            <h1>Links para Outros Websites</h1>
            <p>
              O nosso Serviço pode conter links para websites ou serviços de terceiros que não são propriedade ou controlados pela Empresa.
            </p>
            <p>
              A Empresa não tem controle sobre, nem assume qualquer responsabilidade pelo conteúdo, políticas de privacidade ou práticas de quaisquer websites ou serviços de terceiros. O utilizador reconhece e concorda ainda que a Empresa não será responsável ou culpada, direta ou indiretamente, por quaisquer danos ou perdas causadas ou alegadamente causadas pelo uso ou confiança em qualquer conteúdo, bens ou serviços disponíveis em ou através de tais websites ou serviços.
            </p>
            <p>
              Aconselhamos fortemente que leia os termos e condições e as políticas de privacidade de quaisquer websites ou serviços de terceiros que visitar.
            </p>

            <h1>Rescisão</h1>
            <p>
              Podemos rescindir ou suspender o seu acesso imediatamente, sem aviso prévio ou responsabilidade, por qualquer motivo,
              incluindo, sem limitação, se o utilizador violar estes Termos e Condições.
            </p>
            <p>Após a rescisão, o seu direito de utilizar o Serviço cessará imediatamente.</p>

            <h1>Limitação de Responsabilidade</h1>
            <p>
              Não obstante quaisquer danos que o utilizador possa incorrer, a responsabilidade total da Empresa e de qualquer um dos seus
              fornecedores sob qualquer disposição destes Termos e o seu exclusivo recurso para todos os itens acima será
              limitada ao valor efetivamente pago pelo utilizador através do Serviço ou 100 USD, caso o utilizador não tenha adquirido
              nada através do Serviço.
            </p>
            <p>
              Na máxima extensão permitida pela lei aplicável, em nenhum caso a Empresa ou seus fornecedores serão responsáveis por
              quaisquer danos especiais, incidentais, indiretos ou consequenciais (incluindo, mas não se limitando a, danos por perda de lucros,
              perda de dados ou outras informações, interrupção de negócios, lesões pessoais, perda de privacidade decorrentes ou de qualquer forma
              relacionadas com o uso ou incapacidade de usar o Serviço, software de terceiros e/ou hardware de terceiros utilizado com o
              Serviço, ou de outra forma em conexão com qualquer disposição destes Termos), mesmo que a Empresa ou qualquer fornecedor tenha sido
              avisado da possibilidade de tais danos e mesmo que o remédio falhe em seu propósito essencial.
            </p>
            <p>
              Alguns estados não permitem a exclusão de garantias implícitas ou a limitação de responsabilidade por danos incidentais ou
              consequenciais, o que significa que algumas das limitações acima podem não se aplicar. Nestes estados, a responsabilidade de cada parte
              será limitada na maior extensão permitida pela lei.
            </p>

            <h1>Isenção de Responsabilidade "COMO ESTÁ" e "COMO DISPONÍVEL"</h1>
            <p>
              O Serviço é fornecido ao utilizador "COMO ESTÁ" e "COMO DISPONÍVEL", com todos os defeitos, sem qualquer garantia de qualquer tipo.
              Na máxima extensão permitida pela lei aplicável, a Empresa, em seu próprio nome e em nome das suas Afiliadas e seus respectivos licenciadores e
              prestadores de serviços, renuncia expressamente a todas as garantias, sejam expressas, implícitas, legais ou de outra forma, em relação ao
              Serviço, incluindo todas as garantias implícitas de comercialização, adequação a um fim específico, titularidade e não violação,
              bem como garantias que possam surgir no curso da negociação, desempenho, uso ou prática comercial.
            </p>
            <p>
              Sem limitar o exposto, nem a Empresa nem qualquer fornecedor da empresa faz qualquer representação ou garantia de qualquer tipo,
              expressa ou implícita: (i) quanto à operação ou disponibilidade do Serviço, ou da informação, conteúdo e materiais ou produtos
              incluídos no mesmo; (ii) que o Serviço será ininterrupto ou livre de erros; (iii) quanto à precisão, confiabilidade ou atualidade
              de qualquer informação ou conteúdo fornecido através do Serviço; ou (iv) que o Serviço, seus servidores, o conteúdo, ou e-mails
              enviados pela Empresa estão livres de vírus, scripts, cavalos de troia, worms, malware, bombas-relógio ou outros componentes prejudiciais.
            </p>
            <p>
              Algumas jurisdições não permitem a exclusão de certos tipos de garantias ou limitações nos direitos estatutários aplicáveis de um consumidor,
              portanto, algumas ou todas as exclusões e limitações acima podem não se aplicar ao utilizador. Mas, nesse caso, as exclusões e limitações
              estabelecidas nesta seção serão aplicadas na maior extensão aplicável pela lei.
            </p>

            <h1>Legislação Aplicável</h1>
            <p>
              As leis do País, excluindo as suas regras de conflitos de leis, regerão estes Termos e o seu uso do Serviço. O seu uso da Aplicação
              também pode estar sujeito a outras leis locais, estaduais, nacionais ou internacionais.
            </p>

            <h1>Resolução de Disputas</h1>
            <p>
              Se o utilizador tiver alguma preocupação ou disputa sobre o Serviço, concorda em tentar resolver a disputa de forma informal, entrando em
              contato com a Empresa.
            </p>

            <h1>Para Utilizadores da União Europeia (UE)</h1>
            <p>
              Se o utilizador for um consumidor da União Europeia, beneficiará de quaisquer disposições obrigatórias da legislação do país onde
              reside.
            </p>

            <h1>Conformidade Legal dos Estados Unidos</h1>
            <p>
              O utilizador declara e garante que (i) Não está localizado num país sujeito ao embargo do governo dos Estados Unidos,
              ou que tenha sido designado pelo governo dos Estados Unidos como um país "que apoia o terrorismo", e (ii) Não está listado
              em nenhuma lista de partes proibidas ou restritas do governo dos Estados Unidos.
            </p>

            <h1>Divisibilidade e Renúncia</h1>
            <h2>Divisibilidade</h2>
            <p>
              Se alguma disposição destes Termos for considerada inaplicável ou inválida, tal disposição será alterada e interpretada
              para atingir os objetivos dessa disposição na maior medida possível, conforme a lei aplicável, e as disposições restantes
              continuarão em pleno vigor e efeito.
            </p>

            <h2>Renúncia</h2>
            <p>
              Exceto conforme previsto neste documento, a falha em exercer um direito ou exigir o cumprimento de uma obrigação
              sob estes Termos não afetará a capacidade de uma parte em exercer tal direito ou exigir tal cumprimento a qualquer
              momento após isso, nem a renúncia de uma violação constituirá uma renúncia a qualquer violação subsequente.
            </p>

            <h1>Interpretação da Tradução</h1>
            <p>
              Estes Termos e Condições podem ter sido traduzidos se os tivermos disponibilizado para o utilizador no nosso Serviço.
            </p>
            <p>O utilizador concorda que o texto original em inglês prevalecerá em caso de disputa.</p>

            <h1>Alterações a Estes Termos e Condições</h1>
            <p>
              Reservamo-nos o direito, a nosso exclusivo critério, de modificar ou substituir estes Termos a qualquer momento. Se uma revisão
              for substancial, faremos esforços razoáveis para fornecer pelo menos 30 dias de aviso antes de quaisquer novos termos entrarem em vigor.
              O que constitui uma alteração substancial será determinado a nosso exclusivo critério.
            </p>
            <p>
              Ao continuar a aceder ou utilizar o nosso Serviço após essas alterações entrarem em vigor, o utilizador concorda em ficar vinculado aos novos termos.
              Se não concordar com os novos termos, no todo ou em parte, por favor pare de utilizar o website e o Serviço.
            </p>

            <h1>Contacte-nos</h1>
            <p>Se tiver alguma dúvida sobre estes Termos e Condições, pode contactar-nos:</p>

            <ul>
              <li>Por e-mail: support@example.com</li>
              <li>Por número de telefone: 408.996.1010</li>
            </ul>
          </Text>
        </ContentWithPaddingXl>
      </Container>
      <Footer />
    </AnimationRevealPage>
  );
};

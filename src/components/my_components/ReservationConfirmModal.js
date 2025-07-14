import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { motion } from "framer-motion";

const Overlay = tw.div`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`;
const ModalContainer = styled(motion.div)`
  ${tw`bg-white rounded-lg shadow-2xl p-10 max-w-2xl w-full flex flex-col items-center relative`}
`;
const ModalHeader = tw.div`w-full flex items-center justify-between mb-4`;
const Heading = tw.h2`text-3xl font-bold`;
const CloseButton = tw.button`text-gray-500 hover:text-gray-800 text-2xl font-bold bg-transparent border-none cursor-pointer`;
const InfoRow = tw.div`flex flex-col gap-2 w-full mb-6`;
const InfoItem = tw.div`flex flex-row gap-2 items-center`;
const LabelContainer = tw.div`bg-white rounded px-3 py-2 shadow text-gray-700 font-semibold min-w-[170px] text-left flex-shrink-0`;
const ValueContainer = tw.div`bg-gray-100 rounded px-3 py-2 shadow text-gray-900 flex-1 ml-2`;
const Form = tw.form`w-full flex flex-col gap-4`;
const SubmitButton = tw.button`mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-700 transition w-full font-semibold`;

export default function ReservationConfirmModal({
  open,
  onClose,
  onSubmit,
  praia,
  reservationData,
  price
}) {
  if (!open) return null;
  return (
    <Overlay>
      <ModalContainer
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.25 }}
      >
        <ModalHeader>
          <Heading>Confirmação da Reserva</Heading>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <InfoRow>
          <InfoItem>
            <LabelContainer>Praia</LabelContainer>
            <ValueContainer>{praia.NAME}</ValueContainer>
          </InfoItem>
          <InfoItem>
            <LabelContainer>Localização</LabelContainer>
            <ValueContainer>{praia.CITY}, {praia.COUNTRY}</ValueContainer>
          </InfoItem>
          <InfoItem>
            <LabelContainer>Serviço</LabelContainer>
            <ValueContainer>{praia.SERVICE}</ValueContainer>
          </InfoItem>
          <InfoItem>
            <LabelContainer>Salva-vidas</LabelContainer>
            <ValueContainer>{praia.LIFEGUARD_NAME}</ValueContainer>
          </InfoItem>
          <InfoItem>
            <LabelContainer>Data de Início</LabelContainer>
            <ValueContainer>{reservationData.RESERVATION_START}</ValueContainer>
          </InfoItem>
          <InfoItem>
            <LabelContainer>Data de Fim</LabelContainer>
            <ValueContainer>{reservationData.RESERVATION_END}</ValueContainer>
          </InfoItem>
          <InfoItem>
            <LabelContainer>Nº de Pessoas</LabelContainer>
            <ValueContainer>{reservationData.NUMBER_OF_PEOPLE}</ValueContainer>
          </InfoItem>
          <InfoItem>
            <LabelContainer>Preço Total</LabelContainer>
            <ValueContainer>{price}€</ValueContainer>
          </InfoItem>
        </InfoRow>
        <Form onSubmit={onSubmit}>
          <SubmitButton type="submit">Confirmar Reserva</SubmitButton>
        </Form>
      </ModalContainer>
    </Overlay>
  );
}
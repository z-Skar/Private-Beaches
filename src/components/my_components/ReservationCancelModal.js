import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Button as MuiButton } from "@mui/material";
import dayjs from "dayjs";

const Overlay = tw.div`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`;
const ModalContainer = styled(motion.div)`
  ${tw`bg-white rounded-lg shadow-2xl p-10 max-w-2xl w-full flex flex-col items-center relative`}
`;
const ModalHeader = tw.div`w-full flex items-center justify-between mb-4`;
const Heading = tw.h2`text-3xl font-bold text-orange-500`;
const CloseButton = tw.button`text-gray-500 hover:text-gray-800 text-2xl font-bold bg-transparent border-none cursor-pointer`;
const InfoRow = tw.div`flex flex-col gap-2 w-full mb-6`;
const InfoItem = tw.div`flex flex-row gap-2 items-center`;
const LabelContainer = tw.div`bg-white rounded px-3 py-2 shadow text-gray-700 font-semibold min-w-[140px] text-left flex-shrink-0`;
const ValueContainer = tw.div`bg-gray-100 rounded px-3 py-2 shadow text-gray-900 flex-1 ml-2`;
const Form = tw.form`w-full flex flex-col gap-4`;
const SubmitButton = tw(MuiButton)`mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-semibold`;

export default function ReservationCancelModal({
  open,
  onClose,
  onSubmit,
  reservation
}) {
  const [show, setShow] = useState(open);

  useEffect(() => {
    if (open) setShow(true);
  }, [open]);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 250); // tempo igual ao transition
  };

  if (!reservation) return null;

  return (
    <AnimatePresence>
      {open && show && (
        <Overlay
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <ModalContainer
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.25 }}
          >
            <ModalHeader>
              <Heading>Cancelar Reserva</Heading>
              <CloseButton
                onClick={handleClose}
                as={motion.button}
                whileTap={{ scale: 0.9 }}
              >
                &times;
              </CloseButton>
            </ModalHeader>
            <InfoRow>
              <InfoItem>
                <LabelContainer>Praia</LabelContainer>
                <ValueContainer>{reservation.BEACH_NAME}</ValueContainer>
              </InfoItem>
              <InfoItem>
                <LabelContainer>Data de Início</LabelContainer>
                <ValueContainer>
                  {dayjs(reservation.RESERVATION_START).format("YYYY-MM-DD")}
                </ValueContainer>
              </InfoItem>
              <InfoItem>
                <LabelContainer>Data de Fim</LabelContainer>
                <ValueContainer>
                  {dayjs(reservation.RESERVATION_END).format("YYYY-MM-DD")}
                </ValueContainer>
              </InfoItem>
              <InfoItem>
                <LabelContainer>Preço</LabelContainer>
                <ValueContainer>{reservation.BILL_COST}€</ValueContainer>
              </InfoItem>
            </InfoRow>
            <Form onSubmit={onSubmit}>
              <SubmitButton type="submit" variant="contained" color="error">
                Confirmar Cancelamento
              </SubmitButton>
            </Form>
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
}

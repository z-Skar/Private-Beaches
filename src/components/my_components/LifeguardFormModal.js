import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { motion } from "framer-motion";
import { TextField } from "@mui/material";

const Overlay = tw.div`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`;
const ModalContainer = styled(motion.div)`
  ${tw`bg-white rounded-lg shadow-2xl p-8 max-w-md w-full flex flex-col items-center`}
`;


const Description = tw.p`text-gray-700 text-center mb-6`;
const ModalHeader = tw.div`w-full flex items-center justify-between mb-4`;
const Heading = tw.h2`text-2xl font-bold`;
const CloseButton = tw.button`text-gray-500 hover:text-gray-800 text-2xl font-bold bg-transparent border-none cursor-pointer`;

const Form = tw.form`w-full flex flex-col gap-4`;
const SubmitButton = tw.button`mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-700 transition w-full font-semibold`;
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
  '& .MuiInputLabel-root.Mui-focused': {
    color: tw`text-primary-500`,
  },
};

export default function LifeguardFormModal({ open, onClose, onSubmit, nifValue, onNifChange, nifError }) {
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
            <Heading style={{ marginLeft: 30 }}>Candidatura a Salva-vidas</Heading>
            <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <Description>
          Para se candidatar a salva-vidas, insira o seu NIF e confirme o seu interesse, lembre-se que não poderá alterar o NIF futuramente.<br />
          Entraremos em contacto consigo após análise da candidatura.
        </Description>
        <Form onSubmit={onSubmit}>
          <TextField
            name="NIF"
            label="Número de Identificação Fiscal"
            value={nifValue}
            onChange={onNifChange}
            variant="outlined"
            size="normal"
            fullWidth
            error={!!nifError}
            helperText={nifError}
            sx={commonStyles}
          />
          <SubmitButton type="submit">Submeter Candidatura</SubmitButton>
        </Form>
      </ModalContainer>
    </Overlay>
  );
}
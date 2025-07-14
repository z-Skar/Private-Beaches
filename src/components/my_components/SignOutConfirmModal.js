import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Button as MuiButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout"; // ícone do Material UI

const Overlay = tw.div`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`;
const ModalContainer = styled(motion.div)`
  ${tw`bg-white rounded-lg shadow-2xl p-10 max-w-2xl w-full flex flex-col items-center relative`}
`;

const ModalHeader = tw.div`w-full flex items-center justify-between mb-6`;
const Heading = tw.h2`text-3xl font-bold text-orange-500`;
const CloseButton = tw.button`text-gray-500 hover:text-gray-800 text-2xl font-bold bg-transparent border-none cursor-pointer`;

const IconWrapper = tw.div`mb-4 text-orange-400`;
const Message = tw.p`text-lg text-gray-700 text-center mb-6 max-w-md`;

const ButtonRow = tw.div`flex justify-center gap-4 w-full mt-4`;
const Button = tw.button`w-full max-w-[180px] px-4 py-2 rounded font-semibold text-white transition`;

const CancelButton = tw(Button)`bg-gray-500 hover:bg-gray-600`;
const ConfirmButton = tw(Button)`bg-red-700 hover:bg-red-800`;

export default function SignOutConfirmModal({
	open,
	handleClose,
	onSubmit,
	clientID
}) {
	if (!clientID) return null;

	return (
		<AnimatePresence>
			{open && (
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
							<Heading>Terminar Sessão</Heading>
							<CloseButton
								onClick={handleClose}
								as={motion.button}
								whileTap={{ scale: 0.9 }}
							>
								&times;
							</CloseButton>
						</ModalHeader>

						<Message>
							Tem a certeza de que deseja <strong>terminar a sua sessão</strong>?
							<br /> Será necessário voltar a iniciar sessão para aceder novamente à sua conta.
						</Message>

						<ButtonRow>
							<CancelButton onClick={handleClose}>Cancelar</CancelButton>
							<ConfirmButton onClick={onSubmit}>Terminar Sessão</ConfirmButton>
						</ButtonRow>
					</ModalContainer>
				</Overlay>
			)}
		</AnimatePresence>
	);
}
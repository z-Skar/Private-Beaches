import tw from "twin.macro";
import CloseIcon from "./CloseIcon";
import ImageCropper from "./ImageCropper";

const ModalContainer = tw.div`relative z-10`;
const Overlay = tw.div`fixed inset-0 bg-gray-200 bg-opacity-75 transition-all backdrop-blur-sm`;
const ModalContent = tw.div`fixed inset-0 z-10 w-screen overflow-y-auto`;
const ModalWrapper = tw.div`flex min-h-full justify-center px-2 py-12 text-center`;
const ModalBox = tw.div`relative w-[95%] sm:w-[80%] min-h-[60vh] rounded-2xl bg-gray-400 text-left shadow-xl transition-all`;
const ModalHeader = tw.div`px-5 py-4`;
const CloseButton = tw.button`rounded-md p-1 inline-flex items-center justify-center text-gray-600 hover:bg-gray-500 focus:outline-none absolute top-[0.5rem] right-[0.5rem]`;


const Modal = ({ updateAvatar, closeModal }) => {
  return (
    <ModalContainer aria-labelledby="crop-image-dialog" role="dialog" aria-modal="true">
      <Overlay />
      <ModalContent>
        <ModalWrapper>
          <ModalBox>
            <ModalHeader>
              <CloseButton type="button" onClick={closeModal}>
                <span tw="sr-only">Fechar menu</span>
                <CloseIcon />
              </CloseButton>
              <ImageCropper updateAvatar={updateAvatar} closeModal={closeModal} />
            </ModalHeader>
          </ModalBox>
        </ModalWrapper>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
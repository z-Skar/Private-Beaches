import { useRef, useState } from "react";
import PencilIcon from "./PencilIcon";
import Modal from "./Modal";
import tw from "twin.macro";
import ProfilePicture from '../../images/default-profile-picture.webp'

const ProfilePictureContainer = tw.div`flex flex-col items-center pb-2`
const RelativeContainer = tw.div`relative`
const Image = tw.img`w-[150px] h-[150px] rounded-full border-4 border-gray-400`
const Button = tw.button`absolute left-0 right-0 m-auto p-[.35rem] rounded-full bg-gray-400 hover:bg-gray-200 border border-gray-600 -bottom-[0.75rem] w-[1.75rem]`

const Profile = () => {
  const avatarUrl = useRef(
    ProfilePicture
  );
  const [modalOpen, setModalOpen] = useState(false);

  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
  };

  return (
    <ProfilePictureContainer>
      <RelativeContainer>
        <Image
          src={avatarUrl.current}
          alt="Avatar"
        />
        <Button
          css={{ width: 'fit-content' }}
          title="Change photo"
          onClick={() => setModalOpen(true)}
        >
          <PencilIcon />
        </Button>
      </RelativeContainer>
      {modalOpen && (
        <Modal
          updateAvatar={updateAvatar}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </ProfilePictureContainer>
  );
};

export default Profile;
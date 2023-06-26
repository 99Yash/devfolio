import { useAppDispatch } from '@/hooks/redux';
import {
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { FC } from 'react';
import { ModalsProps } from '../AboutModal';
import { axiosClient } from '@/lib/utils/axiosInstance';
import { deleteExperience } from '@/store/experiences.slice';

const DeleteExperienceModal: FC<ModalsProps & { experienceId: string }> = ({
  isOpen,
  onClose,
  experienceId,
}) => {
  const dispatch = useAppDispatch();

  const deleteExperienceHandler = async () => {
    try {
      await axiosClient.delete(`/experience/${experienceId}`);
    } catch (err: any) {
      console.log(err);
    }
    onClose();
    dispatch(deleteExperience({ experienceId }));
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={'black'}>
        <ModalHeader>Delete Project</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gap={4} flexDir={'column'}>
            Are you sure you want to delete this experience?
            <HStack display={'flex'} justifyContent={'flex-end'}>
              <Button variant={'ghost'} onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={deleteExperienceHandler}
                variant={'outline'}
                color={'red'}
              >
                Delete
              </Button>
            </HStack>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DeleteExperienceModal;

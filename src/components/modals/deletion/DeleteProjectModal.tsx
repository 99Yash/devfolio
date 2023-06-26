import { useAppDispatch } from '@/hooks/redux';
import { axiosClient } from '@/lib/utils/axiosInstance';
import { deleteProject } from '@/store/projects.slice';
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

const DeleteProjectModal: FC<ModalsProps & { projectId: string }> = ({
  isOpen,
  onClose,
  projectId,
}) => {
  const dispatch = useAppDispatch();

  const deleteProjectHandler = async () => {
    try {
      await axiosClient.delete(`/project/${projectId}`);
    } catch (err: any) {
      console.error(err);
    }
    dispatch(deleteProject({ projectId }));
    onClose();
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={'black'}>
        <ModalHeader>Delete Project</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gap={4} flexDir={'column'}>
            Are you sure you want to delete this project?
            <HStack display={'flex'} justifyContent={'flex-end'}>
              <Button variant={'ghost'} onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant={'outline'}
                onClick={deleteProjectHandler}
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

export default DeleteProjectModal;

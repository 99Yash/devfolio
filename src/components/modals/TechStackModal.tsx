import {
  useFetchUserTechStackQuery,
  useUpdateTechStackMutation,
} from '@/store/userApi';
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import { BsFillTrash3Fill } from 'react-icons/bs';
import InputField from '../utils/InputField';
import { ModalsProps } from './AboutModal';
import axios from 'axios';
import { useAppDispatch } from '@/hooks/redux';
import { setTechStack } from '@/store/user.slice';
import { TechDoc } from '@/models/tech.model';

const TechStackModal: FC<ModalsProps & { techStack?: TechDoc[] }> = ({
  isOpen,
  onClose,
  techStack,
}) => {
  const dispatch = useAppDispatch();
  return (
    <Modal size={'xl'} isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tech Stack</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir={'column'} gap={1}>
            {techStack?.map((tech) => (
              <Flex key={Math.random()} justifyContent={'space-between'}>
                <Text>{tech.name}</Text>
                <Button>
                  <BsFillTrash3Fill />
                </Button>
              </Flex>
            ))}
          </Flex>
          <Formik
            initialValues={{ techStack: '' }}
            onSubmit={async (values) => {
              if (values.techStack === '') {
                onClose();
                return;
              }
              try {
                const { data } = await axios.post<TechDoc[]>('/api/user/tech', {
                  techStack: values.techStack,
                });
                dispatch(setTechStack(data));
              } catch (err: any) {
                console.error(err);
              }
              onClose();
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField
                  variant="unstyled"
                  autoComplete="off"
                  showLabel={'false'}
                  type="text"
                  name="techStack"
                  placeholder="Add Tech"
                />
                <Button
                  w={'full'}
                  mt={8}
                  colorScheme="teal"
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Add Tech
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TechStackModal;

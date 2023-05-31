import { useAppDispatch } from '@/hooks/redux';
import { TechDoc } from '@/models/tech.model';
import { updateTechStack } from '@/store/user.slice';
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
import axios from 'axios';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import { BsFillTrash3Fill } from 'react-icons/bs';
import InputField from '../utils/InputField';
import { ModalsProps } from './AboutModal';

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
          {techStack ? (
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
          ) : null}
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
                dispatch(
                  updateTechStack({
                    techStack: data,
                  })
                );
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

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

const TechStackModal: FC<ModalsProps> = ({ isOpen, onClose }) => {
  const [updateTech, results] = useUpdateTechStackMutation();
  const { data, isFetching, isLoading } = useFetchUserTechStackQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  return (
    <Modal size={'xl'} isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tech Stack</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir={'column'} gap={1}>
            {data?.techStack?.map((tech) => (
              <Flex key={Math.random()} justifyContent={'space-between'}>
                <Text>{tech}</Text>
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
                updateTech({
                  techStack: values.techStack,
                });
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
                  label="Tech"
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

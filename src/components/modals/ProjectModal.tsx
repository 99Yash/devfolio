import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import { ModalsProps } from './AboutModal';

const ProjectModal: FC<ModalsProps> = ({ isOpen, onClose }) => {
  return (
    <Modal size={'2xl'} isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Project</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              title: '',
              description: '',
              githubLink: '',
              demoLink: '',
            }}
            onSubmit={(values, actions) => {
              console.log(values);
              actions.setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <VStack display={'flex'} gap={2}>
                  <Input placeholder="Title" />
                  <Textarea placeholder="Description" />
                  <Input placeholder="Github Link" />
                  <Input placeholder="Demo Link" />
                  <Button
                    mt={4}
                    colorScheme="teal"
                    w={'full'}
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    Add Project
                  </Button>
                </VStack>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProjectModal;

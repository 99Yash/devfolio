import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import { ModalsProps } from './AboutModal';

const TechStackModal: FC<ModalsProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tech Stack</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{ techStack: [] }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Input type="text" name="techStack" placeholder="Add Tech" />
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

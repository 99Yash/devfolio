import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalProps,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { FC } from 'react';

export type ModalsProps = Omit<ModalProps, 'children'>;

const AboutModal: FC<ModalsProps> = (props) => {
  return (
    <Modal size={'xl'} isCentered isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>About</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{ about: '' }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Textarea placeholder="Add bio" />
                <Button
                  variant={'ghost'}
                  w={'full'}
                  mt={8}
                  type="submit"
                  isLoading={isSubmitting}
                  onClick={props.onClose}
                >
                  Save Changes
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AboutModal;

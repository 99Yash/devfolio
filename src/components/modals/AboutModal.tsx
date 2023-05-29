import { useUpdateAboutMutation } from '@/store/userApi';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import InputField from '../utils/InputField';

export type ModalsProps = Omit<ModalProps, 'children'>;

const AboutModal: FC<ModalsProps & { userAbout?: string }> = (props) => {
  const [updateAbout, { isLoading, isError, isSuccess }] =
    useUpdateAboutMutation();

  return (
    <Modal size={'xl'} isCentered isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent bg={'black'}>
        <ModalHeader>Edit Bio</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{ about: props.userAbout || `` }}
            onSubmit={async (values) => {
              const { about } = values;
              if (about === props.userAbout) {
                props.onClose();
                return;
              }
              try {
                await updateAbout(about ? about : '');
              } catch (err: any) {
                console.log(err);
              }
              props.onClose();
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField
                  variant="unstyled"
                  istextarea={'true'}
                  autoComplete="off"
                  placeholder={props.userAbout ? props.userAbout : 'Add Bio'}
                  name={'about'}
                  showLabel={'false'}
                />
                <Button
                  variant={'ghost'}
                  w={'full'}
                  mt={8}
                  type="submit"
                  isLoading={isSubmitting}
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

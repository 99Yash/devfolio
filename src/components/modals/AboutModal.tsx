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
import axios from 'axios';
import { useAppDispatch } from '@/hooks/redux';
import { updateAbout } from '@/store/user.slice';

export type ModalsProps = Omit<ModalProps, 'children'>;

const AboutModal: FC<ModalsProps & { userAbout?: string }> = (props) => {
  const dispatch = useAppDispatch();

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
                const { data } = await axios.put('/api/user/about', {
                  about,
                });
                dispatch(updateAbout({ about: data }));
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

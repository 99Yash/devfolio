import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { axiosClient } from '@/lib/utils/axiosInstance';
import { UserDoc } from '@/models/user.model';
import { updateUserProfile } from '@/store/user.slice';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useUser } from '@clerk/nextjs';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import InputField from '../utils/InputField';
import { ModalsProps } from './AboutModal';

const EditProfileModal: FC<ModalsProps> = ({ isOpen, onClose }) => {
  const userState = useAppSelector((state) => state.currentUser.user);
  const { user } = useUser();
  const displayName =
    userState?.fullName && userState?.fullName !== ''
      ? userState?.fullName
      : user?.fullName || '';
  const dispatch = useAppDispatch();

  return (
    <Modal isCentered motionPreset="scale" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={'gray.800'}>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              fullName: displayName,
              oneLiner: userState?.oneLiner ? userState?.oneLiner : '',
            }}
            onSubmit={async (values) => {
              if (values.fullName === '') return;
              try {
                const { data } = await axiosClient.put<UserDoc>('/user/user', {
                  fullName: values.fullName,
                  oneLiner: values.oneLiner,
                });
                dispatch(
                  updateUserProfile({
                    fullName: data.fullName as string,
                    oneLiner: data.oneLiner as string,
                  })
                );
              } catch (err: any) {
                console.log(err);
              }
              onClose();
            }}
          >
            {({ isSubmitting }) => (
              <Form
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                <InputField
                  type="text"
                  showLabel="true"
                  label="Display Name"
                  autoComplete="off"
                  name="fullName"
                  placeholder={displayName}
                />
                <InputField
                  istextarea="true"
                  showLabel="true"
                  label="One-Liner"
                  autoComplete="off"
                  type="text"
                  name="oneLiner"
                />
                <Button
                  _hover={{
                    bg: 'black',
                  }}
                  bg={'gray.800'}
                  color={'gray.300'}
                  variant={'outline'}
                  borderColor={'gray.500'}
                  borderWidth={'1px'}
                  isLoading={isSubmitting}
                  type="submit"
                  w={'full'}
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

export default EditProfileModal;

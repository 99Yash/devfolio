import {
  Button,
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
import InputField from '../utils/InputField';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { updateUserProfile } from '@/store/user.slice';
import * as yup from 'yup';
import { axiosClient } from '@/lib/utils/axiosInstance';
import { UserDoc } from '@/models/user.model';
import { useUser } from '@clerk/nextjs';

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
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            validationSchema={yup.object().shape({
              fullName: yup.string().required('Name is required'),
              oneLiner: yup.string(),
            })}
            initialValues={{
              fullName: displayName,
              oneLiner: userState?.oneLiner ? userState?.oneLiner : '',
            }}
            onSubmit={async (values, { setErrors }) => {
              console.log(values);
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
                console.log(userState);
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
                  showLabel="true"
                  label="One-Liner"
                  autoComplete="off"
                  type="text"
                  name="oneLiner"
                />
                <Button isLoading={isSubmitting} type="submit" w={'full'}>
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

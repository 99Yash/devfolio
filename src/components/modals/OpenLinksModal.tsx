import { SocialDoc } from '@/models/social.model';
import { addSocialLink, deleteSocialLink } from '@/store/user.slice';
import {
  Button,
  Flex,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import { IoMdTrash } from 'react-icons/io';
import InputField from '../utils/InputField';
import { ModalsProps } from './AboutModal';
import { useAppDispatch } from '@/hooks/redux';
import { axiosClient } from '@/lib/utils/axiosInstance';

const OpenLinksModal: FC<
  ModalsProps & {
    socialState: SocialDoc[];
  }
> = ({ isOpen, onClose, socialState }) => {
  const linkOptions = [
    {
      id: 1,
      type: 'Github',
    },
    {
      id: 2,
      type: 'Twitter',
    },
    {
      id: 3,
      type: 'LinkedIn',
    },
    {
      id: 4,
      type: 'Website',
    },
  ];

  const dispatch = useAppDispatch();
  return (
    <Modal isCentered motionPreset="scale" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={'gray.800'}>
        <ModalHeader>Add Links</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {socialState.map((social) => {
            return (
              <Flex
                justifyContent={'space-between'}
                alignItems={'center'}
                key={social.name}
              >
                <Text>{social.name}</Text>
                <IconButton
                  aria-label="delete"
                  icon={<IoMdTrash />}
                  onClick={async () => {
                    try {
                      await axiosClient.delete(`/socials/${social._id}`);
                      dispatch(
                        deleteSocialLink({
                          socialId: social._id.toString(),
                        })
                      );
                    } catch (err: any) {
                      console.log(err);
                    }
                  }}
                />
              </Flex>
            );
          })}
          <Formik
            initialValues={{
              name: '',
              url: '',
            }}
            onSubmit={async (values) => {
              console.log(values);
              try {
                const { data } = await axiosClient.post<SocialDoc>(
                  '/user/socials',
                  {
                    name: values.name,
                    url: values.url,
                  }
                );
                console.log(data);
                dispatch(addSocialLink({ socialLink: data }));
                onClose();
              } catch (err: any) {
                console.error(err);
              }
            }}
          >
            {({ isSubmitting, values, handleChange }) => (
              <Form>
                <Flex flexDir={'column'} display={'flex'} gap={2}>
                  <Flex gap={2}>
                    <Select
                      maxW={'fit-content'}
                      value={values.name}
                      onChange={handleChange}
                      name="name"
                      placeholder="Select Link"
                    >
                      {linkOptions.map((option) => (
                        <option key={option.id} value={option.type}>
                          {option.type}
                        </option>
                      ))}
                    </Select>
                    <InputField
                      showLabel="false"
                      autoComplete="off"
                      type="text"
                      name={'url'}
                      placeholder="Enter URL"
                    />
                  </Flex>
                  <Button
                    w={'full'}
                    type="submit"
                    colorScheme="teal"
                    disabled={isSubmitting}
                  >
                    Add Link
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default OpenLinksModal;

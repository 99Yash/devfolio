import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { useUser } from '@clerk/nextjs';
import { Form, Formik } from 'formik';
import React, { FC, useState } from 'react';
import * as yup from 'yup';
import { UserDoc } from '../../models/user.model';
import InputField from '../utils/InputField';
import { axiosClient } from '@/lib/utils/axiosInstance';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { updateUserProfile } from '@/store/user.slice';

const TopUserProfile: FC = () => {
  const userState = useAppSelector((state) => state.currentUser.user);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenEditProfileModal,
    onOpen: onOpenEditProfileModal,
    onClose: onCloseEditProfileModal,
  } = useDisclosure();
  const [selectedLink, setSelectedLink] = useState<string>();

  const user = useUser();

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

  const linkValidaitonSchema = yup.object().shape({
    github: yup
      .string()
      .url()
      .matches(
        /^https?:\/\/(www\.)?github\.com\/[\w-]+(\/.*)?$/i,
        'Invalid Github Link'
      ),
    twitter: yup
      .string()
      .url()
      .matches(
        /^https?:\/\/(www\.)?twitter\.com\/[\w-]+(\/.*)?$/i,
        'Invalid Twitter Link'
      ),
    linkedIn: yup
      .string()
      .url()
      .matches(
        /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+(\/.*)?$/i,
        'Invalid LinkedIn Link'
      ),
  });

  const selectLinkHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLink(e.target.value);
  };

  const displayName =
    userState?.fullName && userState?.fullName !== ''
      ? userState?.fullName
      : user.user?.fullName || '';
  const dispatch = useAppDispatch();
  return (
    <Flex flexDir={'column'}>
      <Flex
        mb={8}
        gap={12}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Avatar
          variant="circular"
          size="xl"
          bg={'gray.300'}
          name={userState!.fullName}
        />
        <Heading size={'md'} fontWeight={'semibold'}>
          {displayName}
        </Heading>
        <Button
          _focus={{}}
          onClick={onOpenEditProfileModal}
          variant={'outline'}
        >
          Edit Profile
        </Button>
        {isOpenEditProfileModal && (
          <Modal
            isCentered
            motionPreset="scale"
            isOpen={isOpenEditProfileModal}
            onClose={onCloseEditProfileModal}
          >
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
                      const { data } = await axiosClient.patch<UserDoc>(
                        '/user/user',
                        {
                          fullName: values.fullName,
                          oneLiner: values.oneLiner,
                        }
                      );
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
                    onCloseEditProfileModal();
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className="flex flex-col gap-2 ">
                      {/* //todo pic upload */}
                      {/* <InputField
                        name="picture"
                        showLabel="true"
                        label="Display Pic"
                        type="file"
                        placeholder="Upload Pic"
                      /> */}
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
                        placeholder="Enter One-Liner"
                      />
                      <Button type="submit" w={'full'}>
                        Save Changes
                      </Button>
                    </Form>
                  )}
                </Formik>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </Flex>
      {userState?.oneLiner ? (
        <Text className="mb-4">{userState?.oneLiner}</Text>
      ) : null}
      {userState?.socials?.length ? (
        <VStack
          display={'flex'}
          alignItems={'flex-start'}
          justifyContent={'flex-start'}
          gap={2}
        >
          {userState?.socials?.map((social) => (
            <HStack
              key={social.name}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'flex-start'}
              gap={2}
            >
              <Text>{social.url}</Text>
            </HStack>
          ))}
        </VStack>
      ) : null}
      <Box>
        {userState?.socials?.length === 0 || !userState?.socials ? (
          <Button
            _focus={{}}
            onClick={onOpen}
            className="self-start"
            variant="outline"
          >
            + Add Links
          </Button>
        ) : null}
        <Modal
          isCentered
          motionPreset="scale"
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Links</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Formik
                validationSchema={linkValidaitonSchema}
                initialValues={{
                  social: {
                    name: '',
                    url: '',
                  },
                }}
                onSubmit={
                  async (values) => {
                    console.log(values);
                    const {
                      social: { name, url },
                    } = values;
                    //try{
                    // await addLink({
                    //   variables: {
                    //     userId: userId,
                    //     name: name,
                    //     url: url,
                    //   },
                    // });
                    // }
                    onClose();
                  } // TODO: Add submit handler
                }
              >
                {({ isSubmitting }) => (
                  <Form>
                    <VStack display={'flex'} gap={2}>
                      <HStack display={'flex'} gap={2}>
                        <Select
                          className="max-w-fit"
                          value={selectedLink}
                          onChange={selectLinkHandler}
                        >
                          {linkOptions.map((link) => (
                            <option key={link.id} value={link.type}>
                              {link.type}
                            </option>
                          ))}
                        </Select>
                        <Input type="text" placeholder="Enter URL" />
                      </HStack>
                      <Button
                        w={'full'}
                        colorScheme="teal"
                        disabled={isSubmitting}
                      >
                        Add Link
                      </Button>
                    </VStack>
                  </Form>
                )}
              </Formik>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
};

export default TopUserProfile;

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { axiosClient } from '@/lib/utils/axiosInstance';
import {
  addSocialLink,
  setSocialLinks,
  updateUserProfile,
} from '@/store/user.slice';
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { useUser } from '@clerk/nextjs';
import { Form, Formik } from 'formik';
import { FC, useEffect } from 'react';
import { BsGlobe2 } from 'react-icons/bs';
import { RiTwitterFill } from 'react-icons/ri';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import * as yup from 'yup';
import { UserDoc } from '../../models/user.model';
import InputField from '../utils/InputField';
import { SocialDoc } from '@/models/social.model';

const TopUserProfile: FC = () => {
  const userState = useAppSelector((state) => state.currentUser.user);
  const socialState = useAppSelector((state) => state.currentUser.socials);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenEditProfileModal,
    onOpen: onOpenEditProfileModal,
    onClose: onCloseEditProfileModal,
  } = useDisclosure();
  const dispatch = useAppDispatch();

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

  const linkValidationSchema = yup.object().shape({
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

  useEffect(() => {
    const getSocialsForUser = async () => {
      const { data } = await axiosClient.get<SocialDoc[] | null>(
        '/user/socials'
      );
      if (data) {
        dispatch(setSocialLinks(data));
      } else {
        dispatch(setSocialLinks([]));
      }
    };
    getSocialsForUser();
  }, [dispatch]);

  const getIconsByLink = (linkName: string) => {
    switch (linkName) {
      case 'Github':
        return <SiGithub />;
      case 'Twitter':
        return <RiTwitterFill />;
      case 'LinkedIn':
        return <SiLinkedin />;
      case 'Website':
        return <BsGlobe2 />;
    }
  };
  const displayName =
    userState?.fullName && userState?.fullName !== ''
      ? userState?.fullName
      : user.user?.fullName || '';
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
          _focus={{
            boxShadow: 'none',
          }}
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
              {socialState
                ? socialState.map((social) => {
                    return (
                      <Link href={social.url} key={social.name} isExternal>
                        {getIconsByLink(social.name)}
                      </Link>
                    );
                  })
                : null}
            </HStack>
          ))}
        </VStack>
      ) : null}
      <Box>
        {userState?.socials?.length === 0 || !userState?.socials ? (
          <Button
            _focus={{
              outline: 'none',
            }}
            onClick={onOpen}
            className="self-start"
            variant="outline"
          >
            + Add Links
          </Button>
        ) : (
          <Flex>{}</Flex>
        )}
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
                initialValues={{
                  name: '',
                  url: '',
                }}
                onSubmit={async (values) => {
                  console.log(values);
                  try {
                    const { data } = await axiosClient.post('/user/socials', {
                      name: values.name,
                      url: values.url,
                    });
                    dispatch(addSocialLink(data));
                    onClose();
                  } catch (err: any) {
                    console.error(err);
                  }
                }}
              >
                {({ isSubmitting, values, handleChange }) => (
                  <Form>
                    <VStack display={'flex'} gap={2}>
                      <HStack display={'flex'} gap={2}>
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
                      </HStack>
                      <Button
                        w={'full'}
                        type="submit"
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

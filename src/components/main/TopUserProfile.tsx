import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { axiosClient } from '@/lib/utils/axiosInstance';
import { SocialDoc } from '@/models/social.model';
import { addSocialLink, setSocialLinks } from '@/store/user.slice';
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  IconButton,
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
import { BsGithub, BsGlobe2 } from 'react-icons/bs';
import { MdEdit } from 'react-icons/md';
import { RiTwitterFill } from 'react-icons/ri';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import EditProfileModal from '../modals/EditProfileModal';
import InputField from '../utils/InputField';

const TopUserProfile: FC = () => {
  const userState = useAppSelector((state) => state.currentUser.user);
  const socialState = useAppSelector((state) => state.currentUser.socials);

  const {
    isOpen: isOpenLinksModal,
    onOpen: onOpenLinksModal,
    onClose: onCloseLinksModal,
  } = useDisclosure();
  const {
    isOpen: isOpenEditProfileModal,
    onOpen: onOpenEditProfileModal,
    onClose: onCloseEditProfileModal,
  } = useDisclosure();
  const dispatch = useAppDispatch();

  const user = useUser();

  useEffect(() => {
    const getSocialsForUser = async () => {
      try {
        const { data } = await axiosClient.get<SocialDoc[] | null>(
          '/user/socials'
        );
        console.log(data);
        if (data) {
          dispatch(setSocialLinks(data));
        } else {
          dispatch(setSocialLinks([]));
        }
      } catch (err: any) {
        console.log(err);
      }
    };
    getSocialsForUser();
  }, [dispatch]);

  const linkOptions = [
    {
      id: 1,
      type: 'Github',
      icon: <SiGithub />,
    },
    {
      id: 2,
      type: 'Twitter',
      icon: <RiTwitterFill />,
    },
    {
      id: 3,
      type: 'LinkedIn',
      icon: <SiLinkedin />,
    },
    {
      id: 4,
      type: 'Website',
      icon: <BsGlobe2 />,
    },
  ];
  const getIconsByLink = (linkName: string) => {
    switch (linkName) {
      case 'Github':
        return <BsGithub />;
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
          <EditProfileModal
            isOpen={isOpenLinksModal}
            onClose={onCloseLinksModal}
          />
        )}
      </Flex>

      <Box>
        {userState?.socials?.length ? (
          <HStack
            display={'flex'}
            alignItems={'center'}
            justifyContent={'flex-start'}
            gap={2}
          >
            {socialState
              ? socialState.map((social) => {
                  return (
                    <Flex
                      justifyContent={'flex-start'}
                      alignItems={'center'}
                      key={social.name}
                    >
                      <Link fontSize={'xl'} href={social.url} isExternal>
                        {getIconsByLink(social.name)}
                      </Link>
                    </Flex>
                  );
                })
              : null}
            <IconButton
              fontSize={'sm'}
              borderRadius={'50%'}
              aria-label="Add/Edit links"
              icon={<MdEdit />}
              onClick={onOpenLinksModal}
            />
          </HStack>
        ) : null}
        {userState?.oneLiner ? (
          <Text my={2} color={'gray.300'}>
            {userState?.oneLiner}
          </Text>
        ) : null}
        {userState?.socials?.length === 0 || !userState?.socials ? (
          <Button
            _focus={{
              outline: 'none',
            }}
            onClick={onOpenLinksModal}
            className="self-start"
            variant="outline"
          >
            + Add Links
          </Button>
        ) : null}

        {isOpenLinksModal && (
          <Modal
            isCentered
            motionPreset="scale"
            isOpen={isOpenLinksModal}
            onClose={onCloseLinksModal}
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
                      console.log(data);
                      dispatch(addSocialLink(data));
                      onCloseLinksModal();
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
        )}
      </Box>
    </Flex>
  );
};
export default TopUserProfile;

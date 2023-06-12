import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { axiosClient } from '@/lib/utils/axiosInstance';
import { SocialDoc } from '@/models/social.model';
import {
  addSocialLink,
  deleteSocialLink,
  setSocialLinks,
} from '@/store/user.slice';
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
import { IoMdTrash } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import EditProfileModal from '../modals/EditProfileModal';
import InputField from '../utils/InputField';
import { getIconByLinkName } from '../utils/getIconsByLink';

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

  const displayName =
    userState?.fullName && userState?.fullName !== ''
      ? userState?.fullName
      : user.user?.fullName || '';

  return (
    <Flex flexDir={'column'}>
      {/* //?top head */}
      <Flex
        mb={8}
        gap={12}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Avatar
          variant="circular"
          src={user.user?.profileImageUrl}
          size="2xl"
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
            isOpen={isOpenEditProfileModal}
            onClose={onCloseEditProfileModal}
          />
        )}
      </Flex>

      <Box>
        {/* //?social link icons */}
        {userState?.socials?.length ? (
          <HStack
            display={'flex'}
            alignItems={'center'}
            justifyContent={'flex-start'}
            gap={2}
          >
            {socialState.length > 0
              ? socialState.map((social) => {
                  return (
                    <Flex
                      justifyContent={'flex-start'}
                      alignItems={'center'}
                      key={social.name}
                    >
                      <Link
                        color={'skyblue'}
                        fontSize={'xl'}
                        href={social.url}
                        isExternal
                      >
                        {getIconByLinkName(social.name)}
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
              variant={'outline'}
              onClick={onOpenLinksModal}
            />
          </HStack>
        ) : null}
        <Flex justifyContent={'space-between'}>
          <Flex flexDir={'column'}>
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
                Add Links
              </Button>
            ) : null}
          </Flex>
          <Link
            target="_blank"
            display="inline-block"
            px={4}
            py={2}
            borderWidth={1}
            borderRadius="md"
            _hover={{
              textDecoration: 'none',
            }}
            href={`/${user?.user?.id}`}
          >
            View Profile
          </Link>
        </Flex>

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

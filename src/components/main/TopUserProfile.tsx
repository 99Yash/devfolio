import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { axiosClient } from '@/lib/utils/axiosInstance';
import { SocialDoc } from '@/models/social.model';
import { setSocialLinks } from '@/store/user.slice';
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  IconButton,
  Link,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { useUser } from '@clerk/nextjs';
import { FC, useEffect } from 'react';
import { MdEdit } from 'react-icons/md';
import EditProfileModal from '../modals/EditProfileModal';
import OpenLinksModal from '../modals/OpenLinksModal';
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
        <Tooltip
          label={'Use the User Button to change picture'}
          aria-label="A tooltip"
          bg={'transparent'}
          color={'purple.200'}
          border={'gray.200'}
        >
          <Avatar
            loading="lazy"
            variant="circular"
            src={user.user?.profileImageUrl}
            size="2xl"
            bg={'gray.300'}
            name={userState!.fullName}
          />
        </Tooltip>
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
          <OpenLinksModal
            socialState={socialState}
            isOpen={isOpenLinksModal}
            onClose={onCloseLinksModal}
          />
        )}
      </Box>
    </Flex>
  );
};
export default TopUserProfile;

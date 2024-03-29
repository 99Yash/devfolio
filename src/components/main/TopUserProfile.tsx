import { useAppSelector } from '@/hooks/redux';
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
import { BsBoxArrowUpRight } from 'react-icons/bs';
import { MdEdit } from 'react-icons/md';
import EditProfileModal from '../modals/EditProfileModal';
import OpenLinksModal from '../modals/OpenLinksModal';
import { getIconByLinkName } from '../utils/getIconsByLink';
import { useUser } from '@clerk/nextjs';

const TopUserProfile = ({ profilePic }: { profilePic: string }) => {
  const userState = useAppSelector((state) => state.currentUser.user);
  const socialState = useAppSelector((state) => state.socials.socials);

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

  const { user } = useUser();

  const displayName =
    userState?.fullName && userState?.fullName !== ''
      ? userState?.fullName
      : user?.fullName || '';

  return (
    <Flex flexDir={'column'}>
      {/* //?top head */}

      <Flex
        mb={8}
        gap={[6, 12]}
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
            src={profilePic}
            size="2xl"
            name={userState!.fullName}
          />
        </Tooltip>
        <Heading color={'gray.200'} size={'md'} mr={8} fontWeight={'semibold'}>
          {displayName}
        </Heading>
        <button
          // _hover={{
          //   bg: 'gray.900',
          // }}
          // bg={'black'}
          // color={'gray.300'}
          // variant={'outline'}
          // borderColor={'gray.500'}
          // borderWidth={'1px'}
          className={`
            bg-black hover:bg-black text-gray-300 border border-1 border-gray-500 hidden md:flex px-4 py-2 rounded-md
          `}
          onClick={onOpenEditProfileModal}
        >
          Edit Profile
        </button>
        {isOpenEditProfileModal && (
          <EditProfileModal
            isOpen={isOpenEditProfileModal}
            onClose={onCloseEditProfileModal}
          />
        )}
      </Flex>

      <Box>
        {/* //?social link icons */}
        {socialState?.length ? (
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
                      key={social._id}
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
              fontSize={'md'}
              _hover={{
                bg: 'black',
                border: '1px solid #ccc',
              }}
              bg={'black'}
              borderColor={'black'}
              borderRadius={'50%'}
              aria-label="Add/Edit links"
              icon={<MdEdit />}
              variant={'outline'}
              onClick={onOpenLinksModal}
            />{' '}
            <Tooltip
              label={'Visit generated portfolio'}
              aria-label="A tooltip"
              bg={'transparent'}
              color={'purple.200'}
              border={'gray.200'}
              display={'flex'}
              placement="top"
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Link
                target="_blank"
                display="inline-block"
                borderRadius="none"
                textAlign={'center'}
                _hover={{
                  textDecoration: 'none',
                }}
                href={`/portfolio/${user?.id}`}
              >
                <BsBoxArrowUpRight />
              </Link>
            </Tooltip>
          </HStack>
        ) : null}
        <Flex justifyContent={'space-between'}>
          <Flex wrap={'wrap'} flexDir={'column'}>
            {userState?.oneLiner ? (
              <Flex my={2} color={'gray.400'}>
                {userState?.oneLiner}
                <button
                  onClick={onOpenEditProfileModal}
                  className={` block md:hidden`}
                >
                  <MdEdit />
                </button>
              </Flex>
            ) : null}
            {socialState?.length === 0 || !socialState ? (
              <Button
                _focus={{
                  outline: 'none',
                }}
                _hover={{
                  bg: 'black',
                }}
                onClick={onOpenLinksModal}
                alignItems={'center'}
                variant="outline"
              >
                Add Links
              </Button>
            ) : null}
          </Flex>
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

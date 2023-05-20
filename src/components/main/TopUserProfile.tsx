import {
  Avatar,
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

const TopUserProfile: FC<{
  clerkUserId: string;
  userProfileData: Pick<UserDoc, 'oneLiner' | 'socials' | 'fullName'>;
}> = ({ clerkUserId, userProfileData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedLink, setSelectedLink] = useState<string>();
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);

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
          name={userProfileData!.fullName}
        />
        <Heading size={'md'} fontWeight={'semibold'}>
          {user.user?.fullName}
        </Heading>
        <Button
          onClick={() => setOpenEditProfileModal(true)}
          variant={'outline'}
        >
          Edit Profile
        </Button>
        {openEditProfileModal && (
          <Modal
            isCentered
            motionPreset="scale"
            isOpen={openEditProfileModal}
            onClose={() => setOpenEditProfileModal(false)}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Profile</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Formik
                  validationSchema={yup.object().shape({
                    name: yup.string().required('Name is required'),
                    oneLiner: yup.string(),
                  })}
                  initialValues={{
                    name: user.user?.fullName,
                    oneLiner: '',
                  }}
                  onSubmit={(values) => {
                    console.log(values);
                    onClose();
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className="flex flex-col gap-2 ">
                      {/* //todo pic upload */}
                      <Input type="file" placeholder="Upload Pic" />
                      <Input
                        type="text"
                        autoComplete="off"
                        name="name"
                        placeholder={
                          user.user?.fullName
                            ? user.user?.fullName
                            : 'Enter Name'
                        }
                      />
                      <Input
                        autoComplete="off"
                        type="text"
                        name="oneLiner"
                        placeholder="Enter One-Liner"
                      />
                    </Form>
                  )}
                </Formik>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" className="w-full">
                  Save Changes
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </Flex>
      {userProfileData.oneLiner ? (
        <Text className="mb-4">{userProfileData.oneLiner}</Text>
      ) : null}
      {userProfileData?.socials?.length ? (
        <VStack
          display={'flex'}
          alignItems={'flex-start'}
          justifyContent={'flex-start'}
          gap={2}
        >
          {userProfileData?.socials?.map((social) => (
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
      <div>
        {userProfileData.socials?.length === 0 ? (
          <Button onClick={onOpen} className="self-start" variant="outline">
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
      </div>
    </Flex>
  );
};

export default TopUserProfile;

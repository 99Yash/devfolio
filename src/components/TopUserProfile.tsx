import React from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
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
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';

const TopUserProfile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useUser();
  const [selectedLink, setSelectedLink] = useState<string>();
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);

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
        <Avatar variant="circular" size="xl" />
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
                  initialValues={{
                    name: user.user?.fullName,
                    oneLiner: '',
                  }}
                  onSubmit={(values) => {
                    console.log(values);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className="flex flex-col gap-2 ">
                      {/* //todo pic upload */}
                      <Input type="file" placeholder="Upload Pic" />
                      <Input
                        type="text"
                        value={user.user?.fullName ? user.user?.fullName : ''}
                        autoComplete="off"
                        name="name"
                        placeholder="Enter Name"
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
                <Button className="w-full">Save Changes</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </Flex>
      <p className="mb-4">User Bio</p>
      <div>
        <Button onClick={onOpen} className="self-start" variant="outline">
          + Add Links
        </Button>

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
                  link: {
                    type: '',
                    url: '',
                  },
                }}
                onSubmit={
                  (values) => console.log(values) // TODO: Add submit handler
                }
              >
                {({ isSubmitting }) => (
                  <Form>
                    <VStack display={'flex'} gap={2}>
                      <HStack display={'flex'} gap={2}>
                        <Select
                          colorScheme="blackAlpha"
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
                      <Button w={'full'} colorScheme="teal">
                        Add Link
                      </Button>
                    </VStack>
                  </Form>
                )}
              </Formik>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </Flex>
  );
};

export default TopUserProfile;

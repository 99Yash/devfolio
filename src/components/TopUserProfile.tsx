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
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
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
    <div className="flex flex-col ">
      <div className="flex mb-8 gap-12 justify-between items-center ">
        <Avatar variant="circular" size="xl" />
        <h1 className=" text-lg font-semibold">{user.user?.fullName}</h1>
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
                  onSubmit={(
                    values,
                    { setSubmitting }: { setSubmitting: any }
                  ) => {
                    console.log(values);
                    setSubmitting(false);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className="flex flex-col gap-2 ">
                      {/* //todo */}
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
      </div>
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
                  <Form className="flex justify-center gap-2 ">
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
                  </Form>
                )}
              </Formik>
            </ModalBody>
            <ModalFooter>
              <Button className="w-full">Add Link</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default TopUserProfile;

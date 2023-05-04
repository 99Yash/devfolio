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
    <div className="flex flex-col">
      <div className="flex mb-8 justify-between items-start ">
        <Avatar variant="circular" size="xl" />
        <Button className="self-end">Edit Profile</Button>
      </div>
      <div>
        <div className="flex flex-col ">
          <h3 className="font-semibold">
            {user.user?.firstName} {user.user?.lastName}
          </h3>
        </div>
        <Button onClick={onOpen} className="self-start" variant="outline">
          Add Links
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
                    <Input type="text" placeholder="Enter URL"></Input>
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

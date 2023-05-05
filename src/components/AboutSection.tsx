import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { MdModeEdit } from 'react-icons/md';

const AboutSection = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex flexDirection={'column'}>
      <HStack display={'flex'} justifyContent={'space-between'}>
        <Heading size={'md'}>About</Heading>
        <IconButton
          onClick={onOpen}
          variant={'ghost'}
          aria-label="Edit"
          icon={<MdModeEdit />}
        />
      </HStack>
      <Flex flexDirection="column" gap={8} alignItems={'center'} py={4}>
        <Flex flexDirection={'column'} gap={4} textAlign={'center'}>
          {/* about should be here */}
          <Heading size={'sm'}>About</Heading>
          <p className="text-md text-gray-500 ">Share more about who you are</p>
        </Flex>
        <Button onClick={onOpen} color="teal" variant="outline">
          Add About
        </Button>
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>About</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Formik
                initialValues={{ about: '' }}
                onSubmit={(values) => {
                  console.log(values);
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Textarea placeholder="Add bio" />
                    <Button
                      variant={'ghost'}
                      w={'full'}
                      mt={8}
                      type="submit"
                      isLoading={isSubmitting}
                      onClick={onClose}
                    >
                      Save Changes
                    </Button>
                  </Form>
                )}
              </Formik>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    </Flex>
  );
};

export default AboutSection;

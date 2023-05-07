import {
  Button,
  Flex,
  HStack,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { IoMdAdd } from 'react-icons/io';

const Projects = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex flexDir={'column'}>
      <HStack display={'flex'} justifyContent={'space-between'}>
        <Heading size={'md'}>Projects</Heading>
        <IconButton
          aria-label="Add Project"
          variant={'ghost'}
          icon={<IoMdAdd />}
        />
      </HStack>
      <Flex
        flexDirection={'column'}
        gap={2}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Heading size={'sm'}>Share your projects</Heading>
        <p className="text-md text-gray-500">
          Add projects or open source contributions so that others know about
          your skills.
        </p>
        <Button onClick={onOpen} color="teal" variant={'outline'}>
          Add Projects
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                title: '',
                description: '',
                githubLink: '',
                demoLink: '',
              }}
              onSubmit={(values, actions) => {
                console.log(values);
                actions.setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <VStack display={'flex'} gap={2}>
                    <Input placeholder="Title" />
                    <Textarea placeholder="Description" />
                    <Input placeholder="Github Link" />
                    <Input placeholder="Demo Link" />
                    <Button
                      mt={4}
                      colorScheme="teal"
                      w={'full'}
                      isLoading={isSubmitting}
                      type="submit"
                    >
                      Add Project
                    </Button>
                  </VStack>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Projects;

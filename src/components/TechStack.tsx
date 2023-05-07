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
  useDisclosure,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { MdModeEdit } from 'react-icons/md';
const TechStack = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex flexDirection={'column'}>
      <HStack display={'flex'} justifyContent={'space-between'}>
        <Heading size={'md'}>Tech Stack</Heading>
        <IconButton
          onClick={onOpen}
          variant={'ghost'}
          aria-label="Edit"
          icon={<MdModeEdit />}
        />
      </HStack>
      <Flex flexDirection="column" gap={8} alignItems={'center'} py={4}>
        <Flex flexDirection={'column'} gap={2} textAlign={'center'}>
          {/* about should be here */}
          <Heading size={'sm'}>Add your familiar Skills</Heading>
          <p className="text-md text-gray-500 ">
            Showcase your skills and technologies and label them by years of
            experience so others know what you like working with.
          </p>
        </Flex>
        <Button onClick={onOpen} color="teal" variant="outline">
          Add Tech Stack
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tech Stack</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{ techStack: [] }}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Input type="text" name="techStack" placeholder="Add Tech" />
                  <Button
                    w={'full'}
                    mt={8}
                    colorScheme="teal"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Add Tech
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default TechStack;

import {
  Button,
  Flex,
  HStack,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  VStack,
  useDisclosure,
  Select,
  ModalFooter,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { IoMdAdd } from 'react-icons/io';

const Experiences = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex flexDir={'column'}>
      <HStack display={'flex'} justifyContent={'space-between'}>
        <Heading size={'md'}>Experiences</Heading>
        <IconButton
          aria-label="Add Experience"
          variant={'ghost'}
          icon={<IoMdAdd />}
        />
      </HStack>
      <VStack
        display={'flex'}
        gap={2}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Heading size={'sm'}>Share a timeline of your Positions</Heading>
        <p className="text-md text-gray-500">
          Add a professional history so that others know you have put your
          skills to good use.
        </p>
        <Button onClick={onOpen} variant={'outline'} color={'teal'}>
          Add Positions
        </Button>
      </VStack>
      <Modal size={'xl'} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Positions</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                position: '',
                companyName: '',
                startDate: {
                  month: '',
                  year: '',
                },
                endDate: {
                  month: '',
                  year: '',
                },
                description: '',
              }}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({ values, isSubmitting }) => (
                <Form>
                  <VStack>
                    <Text mt={2} alignSelf={'flex-start'}>
                      Position
                    </Text>
                    <Input
                      placeholder="Sr. Software Engineer"
                      autoComplete="off"
                      name="position"
                      type="text"
                    />
                    <Text alignSelf={'flex-start'}>Company</Text>
                    <Input
                      placeholder="Company Name"
                      autoComplete="off"
                      name="company"
                      type="text"
                    />

                    <HStack w={'full'}>
                      <VStack>
                        <Text>Start</Text>
                        <HStack>
                          <Select>
                            {[
                              'January',
                              'February',
                              'March',
                              'April',
                              'May',
                              'June',
                              'July',
                              'August',
                              'September',
                              'October',
                              'November',
                              'December',
                            ].map((month) => {
                              return (
                                <option key={month} value={month}>
                                  {month}
                                </option>
                              );
                            })}
                          </Select>
                          <Select minWidth={'fit-content'}>
                            {[
                              '2021',
                              '2020',
                              '2019',
                              '2018',
                              '2017',
                              '2016',
                              '2015',
                              '2014',
                              '2013',
                              '2012',
                              '2011',
                            ].map((year) => {
                              return (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              );
                            })}
                          </Select>
                        </HStack>
                      </VStack>
                      <VStack>
                        <Text>End</Text>
                        <HStack>
                          <Select minWidth={'fit-content'}>
                            {[
                              'January',
                              'February',
                              'March',
                              'April',
                              'May',
                              'June',
                              'July',
                              'August',
                              'September',
                              'October',
                              'November',
                              'December',
                            ].map((month) => {
                              return (
                                <option key={month} value={month}>
                                  {month}
                                </option>
                              );
                            })}
                          </Select>
                          <Select minWidth={'fit-content'}>
                            {[
                              '2023',
                              '2022',
                              '2021',
                              '2020',
                              '2019',
                              '2018',
                              '2017',
                              '2016',
                              '2015',
                              '2014',
                              '2013',
                              '2012',
                              '2011',
                            ].map((year) => {
                              return (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              );
                            })}
                          </Select>
                        </HStack>
                      </VStack>
                    </HStack>
                    <Flex flexDir={'column'} w={'full'}>
                      <Text mb={2}>Description</Text>
                      <Textarea placeholder="Add some Description"></Textarea>
                    </Flex>
                  </VStack>
                </Form>
              )}
            </Formik>
          </ModalBody>
          <ModalFooter>
            <Button
              variant={'outline'}
              colorScheme="red"
              mr={3}
              onClick={onClose}
            >
              Delete
            </Button>
            <Button colorScheme={'teal'}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Experiences;

import {
  Button,
  Flex,
  HStack,
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
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import { ModalsProps } from './AboutModal';

const ExpModal: FC<ModalsProps> = (props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size={'xl'} isCentered>
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
          <Button variant={'outline'} colorScheme="red" mr={3}>
            Delete
          </Button>
          <Button colorScheme={'teal'}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ExpModal;
